import { NextResponse } from 'next/server';
import { getWhatsAppStatus } from '@/lib/whatsapp/client';
import { createClient } from '@/lib/supabase/server';

export async function GET(request: Request) {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const state = getWhatsAppStatus(user.id);
    return NextResponse.json({
      status: state.status,
      qrDataUrl: state.qrDataUrl,
    });
  } catch (error) {
    console.error('[WhatsApp Status API Error]', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
