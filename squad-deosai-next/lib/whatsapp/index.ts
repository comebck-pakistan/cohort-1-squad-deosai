import { DummyWhatsAppProvider } from "@/lib/whatsapp/providers/dummy";
import { MetaWhatsAppProvider } from "@/lib/whatsapp/providers/meta";
import type { WhatsAppProvider } from "@/lib/whatsapp/types";

export function getWhatsAppProvider(): WhatsAppProvider {
  const provider = process.env.WHATSAPP_PROVIDER || "dummy";

  if (provider === "dummy") return new DummyWhatsAppProvider();
  if (provider === "meta") return new MetaWhatsAppProvider();

  throw new Error(`Unsupported WhatsApp provider: ${provider}`);
}
