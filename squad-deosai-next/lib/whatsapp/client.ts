import { Client, LocalAuth } from 'whatsapp-web.js';
// @ts-ignore
import qrcodeTerminal from 'qrcode-terminal';
import qrcode from 'qrcode';
import { handleIncomingMessage } from './handlers';

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

export async function initializeWhatsAppClient(sellerId: string): Promise<WhatsAppClientState> {
  const existing = whatsappClients.get(sellerId);
  if (existing && existing.status !== 'disconnected') {
    return existing;
  }

  const state: WhatsAppClientState = { status: 'initializing' };
  whatsappClients.set(sellerId, state);

  console.log(`[WhatsApp] Initializing client for seller ${sellerId}...`);

  const client = new Client({
    authStrategy: new LocalAuth({ clientId: sellerId }),
    puppeteer: {
      executablePath: process.env.PUPPETEER_EXECUTABLE_PATH || 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
      args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage'],
    },
  });

  state.client = client;

  client.on('qr', async (qr: string) => {
    console.log(`[WhatsApp] QR generated for seller ${sellerId}`);
    qrcodeTerminal.generate(qr, { small: true });

    try {
      const qrDataUrl = await qrcode.toDataURL(qr);
      state.status = 'qr_ready';
      state.qrDataUrl = qrDataUrl;
    } catch (err) {
      console.error('[WhatsApp] Failed to generate QR data URL:', err);
    }
  });

  client.on('ready', () => {
    console.log(`[WhatsApp] Client ready for seller ${sellerId}`);
    state.status = 'connected';
    state.qrDataUrl = undefined;
  });

  client.on('authenticated', () => {
    console.log(`[WhatsApp] Authenticated for seller ${sellerId}`);
  });

  client.on('auth_failure', (msg: any) => {
    console.error(`[WhatsApp] Authentication failure for seller ${sellerId}:`, msg);
    state.status = 'disconnected';
    state.qrDataUrl = undefined;
  });

  client.on('disconnected', (reason: any) => {
    console.log(`[WhatsApp] Client disconnected for seller ${sellerId}:`, reason);
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
    console.error(`[WhatsApp] Failed to initialize for seller ${sellerId}:`, err);
    state.status = 'disconnected';
    whatsappClients.delete(sellerId);
  }

  return state;
}

export function getWhatsAppStatus(sellerId: string): WhatsAppClientState {
  return whatsappClients.get(sellerId) || { status: 'disconnected' };
}
