import { NextResponse } from "next/server";
import { getFastPathGreeting } from "@/lib/ai/grounding";
import { getVerifiedDataReply } from "@/lib/ai/verified-reply";
import type { AgentConfigRow, SellerRow } from "@/lib/ai/types";

export const runtime = "nodejs";

type DemoRequest = {
  message?: unknown;
  spreadsheet?: {
    headers?: unknown;
    rows?: unknown;
    fileName?: unknown;
  };
};

function safeSpreadsheet(value: DemoRequest["spreadsheet"]) {
  if (!value || !Array.isArray(value.headers) || !Array.isArray(value.rows)) {
    return null;
  }

  const headers = value.headers
    .filter((header): header is string => typeof header === "string")
    .map((header) => header.trim().slice(0, 80))
    .filter(Boolean)
    .slice(0, 20);

  if (headers.length === 0 || value.rows.length === 0 || value.rows.length > 200) {
    return null;
  }

  const rows = value.rows
    .filter(
      (row): row is Record<string, unknown> =>
        Boolean(row) && typeof row === "object" && !Array.isArray(row),
    )
    .slice(0, 200)
    .map((row) =>
      Object.fromEntries(
        headers.map((header) => [
          header,
          String(row[header] ?? "").trim().slice(0, 500),
        ]),
      ),
    );

  if (rows.length === 0) return null;

  return {
    headers,
    rows,
    fileName:
      typeof value.fileName === "string"
        ? value.fileName.trim().slice(0, 120)
        : "uploaded-catalogue.csv",
  };
}

function handoff(message: string) {
  const intent = /\b(return|refund|exchange)\b/i.test(message)
    ? "returns"
    : /\b(deliver|delivery|shipping|courier)\b/i.test(message)
      ? "delivery"
      : /\b(price|cost|available|availability|stock)\b/i.test(message)
        ? "product"
        : "other";

  return {
    reply:
      intent === "product"
        ? "I couldn't verify that product detail in the uploaded catalogue. Please ask the seller."
        : "I don't have enough verified information in the uploaded catalogue to answer that accurately. Please ask the seller.",
    action: "handoff" as const,
    evidenceIds: [],
    evidence: [],
    confidence: "low" as const,
    intent,
    decisionReason: "No exact uploaded field safely supported the answer.",
  };
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as DemoRequest;
    const message = typeof body.message === "string" ? body.message.trim() : "";
    const spreadsheet = safeSpreadsheet(body.spreadsheet);

    if (!message || message.length > 500) {
      return NextResponse.json(
        { error: "Enter a question between 1 and 500 characters." },
        { status: 400 },
      );
    }

    if (!spreadsheet) {
      return NextResponse.json(
        { error: "Upload a valid CSV with 1-200 data rows first." },
        { status: 400 },
      );
    }

    const seller: SellerRow = {
      id: "local-demo",
      business_name: "Deosai Jewellery",
      industry: "Jewellery",
      website: null,
    };
    const config: AgentConfigRow = {
      seller_id: seller.id,
      agent_prompt: "Answer only from exact uploaded catalogue fields.",
      agent_never_do: "Never guess or invent store facts.",
      agent_memory: "",
      knowledge_items: [
        {
          id: "local-demo-csv",
          type: "document",
          name: `CSV: ${spreadsheet.fileName} (${spreadsheet.rows.length} rows)`,
          content: JSON.stringify(spreadsheet),
        },
      ],
      tone_guidelines: ["State the verified answer directly."],
      conciseness: "concise",
      hinglish_support: true,
      handoff_message: "",
    };

    const greeting = getFastPathGreeting({
      message,
      sellerId: seller.id,
      businessName: seller.business_name,
    });
    if (greeting) return NextResponse.json(greeting);

    const verified = getVerifiedDataReply({
      message,
      seller,
      config,
      products: [],
    });

    return NextResponse.json(verified || handoff(message));
  } catch {
    return NextResponse.json(
      { error: "The local demo could not process this request." },
      { status: 500 },
    );
  }
}
