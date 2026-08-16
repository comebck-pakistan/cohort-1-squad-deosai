import { z } from "zod";

export const aiReplySchema = z.object({
  message: z.string().min(1, "Message is required").max(1200, "Message is too long"),
  history: z.array(z.any()).optional(),
  configOverride: z.any().optional(),
  onboardingOverride: z.any().optional(),
});

export const whatsappSendSchema = z.object({
  sellerId: z.string().min(1, "Seller ID is required"),
  conversationId: z.string().min(1, "Conversation ID is required"),
  customerPhone: z.string().min(1, "Customer phone is required"),
  message: z.string().min(1, "Message is required"),
});

export const whatsappConnectSchema = z.object({
  sellerId: z.string().optional(),
});
