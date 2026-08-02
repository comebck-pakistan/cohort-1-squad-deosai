import type {
  SendTextInput,
  SendTextResult,
  WhatsAppProvider,
} from "@/lib/whatsapp/types";

type MetaSendResponse = {
  messages?: Array<{ id?: string }>;
  error?: { message?: string };
};

export class MetaWhatsAppProvider implements WhatsAppProvider {
  async sendText(input: SendTextInput): Promise<SendTextResult> {
    const accessToken = process.env.WHATSAPP_ACCESS_TOKEN;
    const apiVersion = process.env.WHATSAPP_API_VERSION;
    const phoneNumberId = input.phoneNumberId || process.env.WHATSAPP_PHONE_NUMBER_ID;

    if (!accessToken || !apiVersion || !phoneNumberId) {
      throw new Error("Meta WhatsApp credentials are not configured.");
    }

    const response = await fetch(
      `https://graph.facebook.com/${apiVersion}/${phoneNumberId}/messages`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messaging_product: "whatsapp",
          recipient_type: "individual",
          to: input.to,
          context: input.replyToMessageId
            ? { message_id: input.replyToMessageId }
            : undefined,
          type: "text",
          text: {
            preview_url: false,
            body: input.text,
          },
        }),
      },
    );

    const payload = (await response.json()) as MetaSendResponse;
    const messageId = payload.messages?.[0]?.id;

    if (!response.ok || !messageId) {
      throw new Error(payload.error?.message || "Meta rejected the WhatsApp message.");
    }

    return { messageId, status: "accepted" };
  }
}
