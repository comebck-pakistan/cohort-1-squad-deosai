import { logger } from "@/lib/logger";
import { Client, LocalAuth } from 'whatsapp-web.js';
// @ts-ignore
import qrcodeTerminal from 'qrcode-terminal';
import qrcode from 'qrcode';
import { handleIncomingMessage } from './handlers';
import fs from 'fs';
import path from 'path';
import { exec } from 'child_process';
import util from 'util';

const execPromise = util.promisify(exec);

export type WhatsAppStatus = 'disconnected' | 'initializing' | 'qr_ready' | 'connected';

export interface WhatsAppClientState {
  status: WhatsAppStatus;
  qrDataUrl?: string;
  client?: Client;
}

// In-memory store for clients. 
// Note: In serverless (Vercel), this memory is ephemeral. 
// For production, a dedicated worker process is recommended.
export const whatsappClients = new Map<string, WhatsAppClientState>();

async function cleanupWhatsAppSession(sellerId: string) {
  // Delete session folder
  const sessionPath = path.join(process.cwd(), '.wwebjs_auth', `session-${sellerId}`);
  if (fs.existsSync(sessionPath)) {
    try {
      fs.rmSync(sessionPath, { recursive: true, force: true });
      logger.info(`[WhatsApp] Deleted session folder for ${sellerId}`);
    } catch (err) {
      logger.error(`[WhatsApp] Error deleting session folder for ${sellerId}:`, err);
    }
  }

  // Kill stray headless chrome processes on Windows
  try {
    await execPromise('wmic process where "name=\'chrome.exe\' and commandline like \'%headless%\'" call terminate');
    logger.info(`[WhatsApp] Cleaned up stray headless Chrome processes.`);
  } catch (err) {
    // Ignore errors if no processes found
  }
}

export async function initializeWhatsAppClient(sellerId: string): Promise<WhatsAppClientState> {
  const existing = whatsappClients.get(sellerId);
  if (existing && existing.status !== 'disconnected') {
    return existing;
  }

  const state: WhatsAppClientState = { status: 'initializing' };
  whatsappClients.set(sellerId, state);

  logger.info(`[WhatsApp] Initializing client for seller ${sellerId}...`);

  await cleanupWhatsAppSession(sellerId);

  const client = new Client({
    authStrategy: new LocalAuth({ clientId: sellerId }),
    puppeteer: {
      executablePath: process.env.PUPPETEER_EXECUTABLE_PATH || 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
      args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage'],
    },
  });

  state.client = client;

  client.on('qr', async (qr: string) => {
    logger.info(`[WhatsApp] QR generated for seller ${sellerId}`);
    qrcodeTerminal.generate(qr, { small: true });

    try {
      const qrDataUrl = await qrcode.toDataURL(qr);
      state.status = 'qr_ready';
      state.qrDataUrl = qrDataUrl;
    } catch (err) {
      logger.error('[WhatsApp] Failed to generate QR data URL:', err);
    }
  });

  client.on('ready', () => {
    logger.info(`[WhatsApp] Client ready for seller ${sellerId}`);
    state.status = 'connected';
    state.qrDataUrl = undefined;
  });

  client.on('authenticated', () => {
    logger.info(`[WhatsApp] Authenticated for seller ${sellerId}`);
  });

  client.on('auth_failure', (msg: any) => {
    logger.error(`[WhatsApp] Authentication failure for seller ${sellerId}:`, msg);
    state.status = 'disconnected';
    state.qrDataUrl = undefined;
  });

  client.on('disconnected', (reason: any) => {
    logger.info(`[WhatsApp] Client disconnected for seller ${sellerId}:`, reason);
    state.status = 'disconnected';
    state.qrDataUrl = undefined;
    whatsappClients.delete(sellerId);
  });

  client.on('message', async (msg) => {
    await handleIncomingMessage(msg, sellerId);
  });

  try {
    await client.initialize();
  } catch (err) {
    logger.error(`[WhatsApp] Failed to initialize for seller ${sellerId}:`, err);
    state.status = 'disconnected';
    whatsappClients.delete(sellerId);
  }

  return state;
}

export function getWhatsAppStatus(sellerId: string): WhatsAppClientState {
  return whatsappClients.get(sellerId) || { status: 'disconnected' };
}

export async function logoutWhatsAppClient(sellerId: string): Promise<void> {
  const existing = whatsappClients.get(sellerId);
  if (existing?.client) {
    try {
      await existing.client.destroy();
      logger.info(`[WhatsApp] Destroyed client for ${sellerId}`);
    } catch (err) {
      logger.error(`[WhatsApp] Error destroying client for ${sellerId}:`, err);
    }
  }
  whatsappClients.delete(sellerId);

  await cleanupWhatsAppSession(sellerId);
}
