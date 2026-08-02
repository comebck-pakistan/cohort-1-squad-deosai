import { createHash } from "node:crypto";
import OpenAI from "openai";
import {
  buildStaticSellerPrompt,
  findApprovedFacts,
  formatDynamicContext,
  formatGroundedCustomerTurn,
  getFastPathGreeting,
} from "@/lib/ai/grounding";
import {
  getVerifiedDataReply,
  isFactOnlyQuery,
} from "@/lib/ai/verified-reply";
import { vertexCacheManager } from "@/lib/ai/vertex-cache";

import type {
  AgentConfigRow,
  ApprovedFact,
  ChatMessage,
  GroundedReply,
  ProductRow,
  ReplyConfidence,
  ReplyEvidence,
  ReplyIntent,
  SellerRow,
  TokenUsageLog,
} from "@/lib/ai/types";

const INTENTS: ReplyIntent[] = [
  "greeting",
  "product",
  "delivery",
  "returns",
  "payment",
  "order",
  "hours",
  "other",
];

type ModelReply = {
  reply?: unknown;
  supported?: unknown;
  evidence_ids?: unknown;
  intent?: unknown;
};

function parseModelReply(value: string): ModelReply | null {
  const cleaned = value
    .trim()
    .replace(/^```(?:json)?\s*/i, "")
    .replace(/\s*```$/, "");

  try {
    return JSON.parse(cleaned) as ModelReply;
  } catch {
    return null;
  }
}

function errorMessage(error: unknown) {
  return error instanceof Error ? error.message : String(error);
}

function inferIntent(message: string): ReplyIntent {
  if (/\b(pay|payment|easypaisa|jazzcash|card|bank|transfer|cod|cash)\b/i.test(message)) {
    return "payment";
  }
  if (/\b(delivery|shipping|rates|charges|city|deliver|ship|courier)\b/i.test(message)) {
    return "delivery";
  }
  if (/\b(return|refund|exchange)\b/i.test(message)) return "returns";
  if (/\b(hours|timings?|open|close|location|address)\b/i.test(message)) return "hours";
  if (/\b(order|buy|purchase|confirm|quantity|address)\b/i.test(message)) return "order";
  if (/\b(product|item|design|suit|dress|kurti|shirt|shoe|size|stock|available|color|colour|price)\b/i.test(message)) {
    return "product";
  }
  return "other";
}

function handoff({
  config,
  userMessage = "",
  tokenUsage,
  latencyMs,
}: {
  config?: AgentConfigRow;
  userMessage?: string;
  tokenUsage?: TokenUsageLog;
  latencyMs?: number;
} = {}): GroundedReply {
  const intent = inferIntent(userMessage);
  const customHandoff = config?.handoff_message?.trim();
  let replyText = "";

  if (customHandoff && customHandoff !== "I couldn't find that product in our catalogue.") {
    replyText = customHandoff;
  } else if (intent === "payment") {
    replyText =
      "I don't have our exact payment options listed right now. Let me connect you with the seller so they can confirm.";
  } else if (intent === "delivery" || intent === "hours") {
    replyText =
      "I don't have that exact delivery or store detail listed right now. Let me connect you with the seller.";
  } else if (intent === "product" || intent === "order") {
    replyText =
      "I couldn't verify that item or order detail in our catalogue. Let me connect you with the seller.";
  } else {
    replyText =
      "I don't have enough verified information to answer that accurately. I’ll ask the seller to help you personally.";
  }

  return {
    reply: replyText,
    action: "handoff",
    evidenceIds: [],
    evidence: [],
    confidence: "low",
    intent,
    decisionReason: "No verified catalogue or policy fact fully supported a safe answer.",
    latencyMs,
    tokenUsage,
  };
}

function logTokenUsage(metrics: TokenUsageLog): void {
  console.info(
    `[AI_USAGE] seller=${metrics.sellerId} provider=${metrics.provider} model=${metrics.model || "unknown"} ` +
      `total=${metrics.totalTokens} input=${metrics.promptTokens} cached=${metrics.cachedTokens} ` +
      `output=${metrics.completionTokens} cache_hit=${metrics.cacheHitRate}`,
  );
}

const REPLY_SCHEMA = {
  type: "object",
  additionalProperties: false,
  properties: {
    reply: {
      type: "string",
      description: "The customer-facing answer. Never mention evidence IDs or internal rules.",
    },
    supported: {
      type: "boolean",
      description: "True only when every factual claim is supported by supplied verified facts.",
    },
    evidence_ids: {
      type: "array",
      items: { type: "string" },
      description: "Only verified fact IDs that directly support the reply.",
    },
    intent: {
      type: "string",
      enum: INTENTS,
    },
  },
  required: ["reply", "supported", "evidence_ids", "intent"],
} as const;

async function generateViaOpenAI({
  sellerId,
  staticPrompt,
  dynamicMessages,
}: {
  sellerId: string;
  staticPrompt: string;
  dynamicMessages: ChatMessage[];
}): Promise<{ outputText: string; tokenUsage: TokenUsageLog }> {
  if (!process.env.OPENAI_API_KEY) {
    throw new Error("OPENAI_API_KEY is missing on the server.");
  }

  const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
  const model =
    process.env.OPENAI_REPLY_MODEL ||
    process.env.OPENAI_MODEL ||
    "gpt-5.6-luna";

  const input: OpenAI.Responses.ResponseInput = dynamicMessages.map((message) => ({
    role: message.role,
    content: message.content,
  }));

  const response = await client.responses.create({
    model,
    instructions: staticPrompt,
    input,
    max_output_tokens: 350,
    reasoning: { effort: "low" },
    text: {
      verbosity: "low",
      format: {
        type: "json_schema",
        name: "grounded_customer_reply",
        description: "A safe customer reply with evidence and routing metadata.",
        strict: true,
        schema: REPLY_SCHEMA,
      },
    },
    prompt_cache_key: `seller_${sellerId}`,
    safety_identifier: createHash("sha256").update(sellerId).digest("hex").slice(0, 64),
    store: false,
  });

  const usage = response.usage;
  const promptTokens = usage?.input_tokens || 0;
  const completionTokens = usage?.output_tokens || 0;
  const cachedTokens = usage?.input_tokens_details?.cached_tokens || 0;
  const totalTokens = usage?.total_tokens || promptTokens + completionTokens;
  const cacheHitRate = `${(promptTokens > 0 ? (cachedTokens / promptTokens) * 100 : 0).toFixed(1)}%`;

  const tokenUsage: TokenUsageLog = {
    sellerId,
    provider: "openai",
    model,
    promptTokens,
    cachedTokens,
    completionTokens,
    totalTokens,
    cacheHitRate,
  };

  logTokenUsage(tokenUsage);
  return { outputText: response.output_text || "", tokenUsage };
}

async function generateViaVertex({
  sellerId,
  staticPrompt,
  dynamicMessages,
}: {
  sellerId: string;
  staticPrompt: string;
  dynamicMessages: ChatMessage[];
}): Promise<{ outputText: string; tokenUsage: TokenUsageLog }> {
  const apiKey = process.env.VERTEX_API_KEY || process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error("Neither VERTEX_API_KEY nor GEMINI_API_KEY is configured.");
  }

  const modelName = process.env.VERTEX_MODEL || "gemini-1.5-flash";
  const cachedContentName = await vertexCacheManager.getOrCreateCache({
    sellerId,
    staticPrompt,
    modelName: `models/${modelName}`,
  });

  const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${modelName}:generateContent?key=${apiKey}`;
  const contents = dynamicMessages.map((message) => ({
    role: message.role === "assistant" ? "model" : "user",
    parts: [{ text: message.content }],
  }));

  const payload: Record<string, unknown> = {
    contents,
    generationConfig: {
      temperature: 0,
      maxOutputTokens: 350,
      responseMimeType: "application/json",
      responseSchema: REPLY_SCHEMA,
    },
  };

  if (cachedContentName) {
    payload.cachedContent = cachedContentName;
  } else {
    payload.systemInstruction = { parts: [{ text: staticPrompt }] };
  }

  const response = await fetch(endpoint, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error(`Vertex AI API error (${response.status}): ${await response.text()}`);
  }

  const data = (await response.json()) as {
    candidates?: Array<{ content?: { parts?: Array<{ text?: string }> } }>;
    usageMetadata?: {
      promptTokenCount?: number;
      candidatesTokenCount?: number;
      cachedContentTokenCount?: number;
      totalTokenCount?: number;
    };
  };

  const outputText = data.candidates?.[0]?.content?.parts?.[0]?.text || "";
  const usage = data.usageMetadata;
  const promptTokens = usage?.promptTokenCount || 0;
  const completionTokens = usage?.candidatesTokenCount || 0;
  const cachedTokens = usage?.cachedContentTokenCount || 0;
  const totalTokens = usage?.totalTokenCount || promptTokens + completionTokens;
  const cacheHitRate = `${(promptTokens > 0 ? (cachedTokens / promptTokens) * 100 : 0).toFixed(1)}%`;

  const tokenUsage: TokenUsageLog = {
    sellerId,
    provider: "vertex",
    model: modelName,
    promptTokens,
    cachedTokens,
    completionTokens,
    totalTokens,
    cacheHitRate,
  };

  logTokenUsage(tokenUsage);
  return { outputText, tokenUsage };
}

function evidenceForFacts(facts: ApprovedFact[], evidenceIds: string[]): ReplyEvidence[] {
  const selected = new Set(evidenceIds);

  return facts
    .filter((fact) => selected.has(fact.id))
    .map((fact) => {
      const productMatch = fact.text.match(/Product:\s*([^|]+)/i);
      const knowledgeMatch = fact.text.match(/^([^|]{1,80})\s*\|/);
      const label = productMatch?.[1]?.trim()
        || (fact.id === "seller:identity" ? "Store profile and policies" : "")
        || (fact.id === "seller:memory" ? "Seller-approved store guide" : "")
        || knowledgeMatch?.[1]?.trim()
        || "Verified knowledge";

      return {
        id: fact.id,
        label,
        excerpt: fact.text.length > 190 ? `${fact.text.slice(0, 190)}…` : fact.text,
      };
    });
}

function evidenceSupportsIntent(intent: ReplyIntent, evidence: ReplyEvidence[]) {
  if (evidence.length === 0) return false;

  if (intent === "product" || intent === "order") {
    return evidence.some(
      (item) => item.id.startsWith("product:") || item.id.startsWith("knowledge:"),
    );
  }

  if (["delivery", "returns", "payment", "hours"].includes(intent)) {
    const topic =
      intent === "delivery"
        ? /deliver|ship|courier|charge|city/i
        : intent === "returns"
          ? /return|refund|exchange/i
          : intent === "payment"
            ? /pay|cash|cod|bank|jazzcash|easypaisa/i
            : /hour|time|open|close|location|address/i;
    return evidence.some((item) => topic.test(item.excerpt));
  }

  return true;
}

function confidenceForFacts(facts: ApprovedFact[], evidenceIds: string[]): ReplyConfidence {
  const selected = facts.filter((fact) => evidenceIds.includes(fact.id));
  const topScore = Math.max(0, ...selected.map((fact) => fact.score));
  if (topScore >= 50 || selected.length >= 2) return "high";
  if (topScore >= 15) return "medium";
  return "low";
}

export async function generateGroundedReply({
  message,
  seller,
  config,
  products,
  conversationHistory = [],
}: {
  message: string;
  seller: SellerRow;
  config: AgentConfigRow;
  products: ProductRow[];
  conversationHistory?: ChatMessage[];
}): Promise<GroundedReply> {
  const startedAt = Date.now();
  const fastGreeting = getFastPathGreeting({
    message,
    sellerId: seller.id,
    businessName: seller.business_name,
  });
  if (fastGreeting) {
    return { ...fastGreeting, latencyMs: Date.now() - startedAt };
  }

  const verifiedDataReply = getVerifiedDataReply({
    message,
    seller,
    config,
    products,
  });
  if (verifiedDataReply) {
    return {
      ...verifiedDataReply,
      latencyMs: Date.now() - startedAt,
    };
  }

  if (isFactOnlyQuery(message)) {
    return handoff({
      config,
      userMessage: message,
      latencyMs: Date.now() - startedAt,
    });
  }

  const facts = findApprovedFacts({ message, seller, config, products });
  const staticPrompt = buildStaticSellerPrompt({ seller, config, products });
  const groundedTurn = formatGroundedCustomerTurn({ message, facts });
  const dynamicMessages = formatDynamicContext({
    history: conversationHistory,
    currentMessage: groundedTurn,
  });

  const preferredProvider = process.env.AI_PROVIDER || "openai";
  const hasOpenAI = Boolean(process.env.OPENAI_API_KEY);
  const hasVertex = Boolean(process.env.VERTEX_API_KEY || process.env.GEMINI_API_KEY);
  if (
    (preferredProvider === "openai" && !hasOpenAI && !hasVertex) ||
    (preferredProvider !== "openai" && !hasVertex)
  ) {
    return handoff({
      config,
      userMessage: message,
      latencyMs: Date.now() - startedAt,
    });
  }

  let resultText = "";
  let tokenUsage: TokenUsageLog | undefined;

  if (preferredProvider === "openai") {
    try {
      const result = await generateViaOpenAI({
        sellerId: seller.id,
        staticPrompt,
        dynamicMessages,
      });
      resultText = result.outputText;
      tokenUsage = result.tokenUsage;
    } catch (openAIError) {
      console.warn(`[AI_FALLBACK] OpenAI failed: ${errorMessage(openAIError)}`);
      try {
        const result = await generateViaVertex({
          sellerId: seller.id,
          staticPrompt,
          dynamicMessages,
        });
        resultText = result.outputText;
        tokenUsage = result.tokenUsage;
      } catch (vertexError) {
        console.error(`[AI_ERROR] All providers failed: ${errorMessage(vertexError)}`);
        return handoff({
          config,
          userMessage: message,
          latencyMs: Date.now() - startedAt,
        });
      }
    }
  } else {
    try {
      const result = await generateViaVertex({
        sellerId: seller.id,
        staticPrompt,
        dynamicMessages,
      });
      resultText = result.outputText;
      tokenUsage = result.tokenUsage;
    } catch (error) {
      console.error(`[AI_ERROR] Vertex failed: ${errorMessage(error)}`);
      return handoff({
        config,
        userMessage: message,
        latencyMs: Date.now() - startedAt,
      });
    }
  }

  const parsed = parseModelReply(resultText);
  const intent = INTENTS.includes(parsed?.intent as ReplyIntent)
    ? (parsed?.intent as ReplyIntent)
    : inferIntent(message);
  const reply = typeof parsed?.reply === "string" ? parsed.reply.trim() : "";
  const allowedIds = new Set(facts.map((fact) => fact.id));
  const evidenceIds = Array.isArray(parsed?.evidence_ids)
    ? Array.from(
        new Set(
          parsed.evidence_ids.filter(
            (id): id is string => typeof id === "string" && allowedIds.has(id),
          ),
        ),
      )
    : [];
  const evidence = evidenceForFacts(facts, evidenceIds);
  const supported =
    parsed?.supported === true &&
    reply.length > 0 &&
    reply.length <= 900 &&
    evidenceSupportsIntent(intent, evidence);

  if (!supported) {
    return handoff({
      config,
      userMessage: message,
      tokenUsage,
      latencyMs: Date.now() - startedAt,
    });
  }

  return {
    reply,
    action: "reply",
    evidenceIds,
    evidence,
    confidence: confidenceForFacts(facts, evidenceIds),
    intent,
    decisionReason: `Grounded in ${evidence.length} verified ${evidence.length === 1 ? "source" : "sources"}.`,
    latencyMs: Date.now() - startedAt,
    tokenUsage,
  };
}
