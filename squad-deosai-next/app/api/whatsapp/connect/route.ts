import { NextResponse } from 'next/server';
import { initializeWhatsAppClient, getWhatsAppStatus } from '@/lib/whatsapp/client';
import { createClient } from '@/lib/supabase/server';

export async function POST(request: Request) {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const currentState = getWhatsAppStatus(user.id);
    if (currentState.status === 'disconnected') {
      // Start initialization in background, don't await because it blocks until ready/qr
      initializeWhatsAppClient(user.id).catch(console.error);
    }

    return NextResponse.json({ success: true, status: getWhatsAppStatus(user.id).status });
  } catch (error) {
    console.error('[WhatsApp Connect API Error]', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
