import { randomUUID } from "node:crypto";
import type {
  SendTextInput,
  SendTextResult,
  WhatsAppProvider,
} from "@/lib/whatsapp/types";

export class DummyWhatsAppProvider implements WhatsAppProvider {
  async sendText(input: SendTextInput): Promise<SendTextResult> {
    void input;
    return {
      messageId: `dummy_${randomUUID()}`,
      status: "simulated",
    };
  }
}
