export type SendTextInput = {
  to: string;
  text: string;
  phoneNumberId?: string;
  replyToMessageId?: string;
};

export type SendTextResult = {
  messageId: string;
  status: "simulated" | "accepted";
};

export interface WhatsAppProvider {
  sendText(input: SendTextInput): Promise<SendTextResult>;
}

export type IncomingWhatsAppMessage = {
  messageId: string;
  phoneNumberId: string;
  from: string;
  customerName: string | null;
  text: string;
};
