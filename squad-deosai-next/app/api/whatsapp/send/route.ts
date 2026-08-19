import { NextResponse } from 'next/server';
import { getWhatsAppStatus } from '@/lib/whatsapp/client';
import { insertMessage, updateConversationStatus } from '@/lib/supabase-service';
import { logger } from '@/lib/logger';
import { whatsappSendSchema } from '@/lib/validations/api';

export async function POST(req: Request) {
  try {
    let rawBody;
    try {
      rawBody = await req.json();
    } catch {
      return NextResponse.json({ error: "Invalid JSON format" }, { status: 400 });
    }

    const parseResult = whatsappSendSchema.safeParse(rawBody);
    if (!parseResult.success) {
      return NextResponse.json(
        { error: parseResult.error.issues[0].message, details: parseResult.error.issues },
        { status: 400 }
      );
    }

    const { sellerId, conversationId, customerPhone, message } = parseResult.data;

    // 1. Get active WhatsApp client from memory
    const { client, status } = getWhatsAppStatus(sellerId);

    if (status !== 'connected' || !client) {
      return NextResponse.json(
        { error: 'WhatsApp client is not connected. Please scan QR in setup.' },
        { status: 400 }
      );
    }

    // 2. Format phone number to WhatsApp format
    let formattedPhone = customerPhone.replace(/\s+/g, ''); // Remove spaces

    if (!formattedPhone.includes('@')) {
      // If it doesn't include @, it's a raw number. Strip non-digits and append @c.us
      formattedPhone = formattedPhone.replace(/[^0-9]/g, '') + '@c.us';
    }
    // If it already contains @ (e.g., @c.us or @lid), we leave it as is.

    // 3. Send message via WhatsApp Web JS
    await client.sendMessage(formattedPhone, message);

    // 4. Save to Supabase
    await insertMessage(sellerId, conversationId, message, 'seller', true);
    await updateConversationStatus(sellerId, conversationId, 'auto-replied');

    return NextResponse.json({ success: true });
  } catch (error: any) {
    logger.error('[API WhatsApp Send] Error:', { error });
    return NextResponse.json(
      { error: error.message || 'Failed to send message' },
      { status: 500 }
    );
  }
}
