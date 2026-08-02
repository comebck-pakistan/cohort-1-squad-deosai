import type {
  AgentConfigRow,
  GroundedReply,
  KnowledgeItem,
  ProductRow,
  ReplyEvidence,
  ReplyIntent,
  SellerRow,
} from "@/lib/ai/types";

type VerifiedRecord = {
  sourceId: string;
  sourceLabel: string;
  name: string;
  price?: string;
  availability?: string;
  category?: string;
};

type VerifiedValue = {
  value: string;
  evidence: ReplyEvidence;
};

const PRODUCT_NAME_KEYS = new Set([
  "item",
  "itemname",
  "name",
  "product",
  "productname",
  "title",
]);
const PRICE_KEYS = new Set(["price", "retailprice", "sellingprice"]);
const AVAILABILITY_KEYS = new Set([
  "availability",
  "availabilitystatus",
  "instock",
  "stock",
  "stockstatus",
  "status",
]);
const CATEGORY_KEYS = new Set(["category", "productcategory", "type"]);
const DELIVERY_CHARGE_KEYS = new Set([
  "deliverycharge",
  "deliverycharges",
  "deliveryfee",
  "shippingcharge",
  "shippingcharges",
  "shippingfee",
]);
const DELIVERY_TIME_KEYS = new Set([
  "deliveryestimate",
  "deliverytime",
  "shippingtime",
]);
const RETURN_POLICY_KEYS = new Set([
  "exchangepolicy",
  "refundpolicy",
  "returnpolicy",
  "returns",
]);

const QUESTION_WORDS = new Set([
  "available",
  "availability",
  "cost",
  "does",
  "have",
  "how",
  "in",
  "is",
  "item",
  "much",
  "of",
  "please",
  "price",
  "stock",
  "the",
  "this",
  "what",
]);

function normalizeKey(value: string) {
  return value.toLowerCase().replace(/[^\p{L}\p{N}]/gu, "");
}

function normalizeText(value: string) {
  return value
    .toLowerCase()
    .replace(/[^\p{L}\p{N}\s]/gu, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function queryTokens(value: string) {
  return Array.from(
    new Set(
      normalizeText(value)
        .split(" ")
        .filter((token) => token.length > 2 && !QUESTION_WORDS.has(token)),
    ),
  );
}

function firstField(row: Record<string, unknown>, allowedKeys: Set<string>) {
  for (const [key, value] of Object.entries(row)) {
    if (!allowedKeys.has(normalizeKey(key))) continue;
    const text = String(value ?? "").trim();
    if (text) return text;
  }
  return undefined;
}

function parseKnowledgeItem(item: KnowledgeItem) {
  try {
    return JSON.parse(item.content) as Record<string, unknown>;
  } catch {
    return null;
  }
}

function spreadsheetRows(config: AgentConfigRow) {
  const rows: Array<{
    item: KnowledgeItem;
    row: Record<string, unknown>;
    index: number;
  }> = [];

  for (const item of config.knowledge_items || []) {
    const parsed = parseKnowledgeItem(item);
    if (!parsed || !Array.isArray(parsed.rows)) continue;

    parsed.rows.forEach((row, index) => {
      if (row && typeof row === "object" && !Array.isArray(row)) {
        rows.push({
          item,
          row: row as Record<string, unknown>,
          index,
        });
      }
    });
  }

  return rows;
}

function productRecords(config: AgentConfigRow, products: ProductRow[]) {
  const records: VerifiedRecord[] = [];
  const seenNames = new Set<string>();

  for (const { item, row, index } of spreadsheetRows(config)) {
    const name = firstField(row, PRODUCT_NAME_KEYS);
    if (!name) continue;
    const normalizedName = normalizeText(name);
    if (seenNames.has(normalizedName)) continue;

    records.push({
      sourceId: `knowledge:${item.id}:row:${index + 1}`,
      sourceLabel: `${item.name}, row ${index + 1}`,
      name,
      price: firstField(row, PRICE_KEYS),
      availability: firstField(row, AVAILABILITY_KEYS),
      category: firstField(row, CATEGORY_KEYS),
    });
    seenNames.add(normalizedName);
  }

  for (const product of products) {
    const normalizedName = normalizeText(product.name);
    if (!normalizedName || seenNames.has(normalizedName)) continue;

    records.push({
      sourceId: `product:${product.id}`,
      sourceLabel: product.name,
      name: product.name,
      price:
        product.price === null || product.price === undefined || product.price === ""
          ? undefined
          : String(product.price),
      availability: product.availability_status || undefined,
      category: product.category || undefined,
    });
    seenNames.add(normalizedName);
  }

  return records;
}

function findProduct(
  message: string,
  config: AgentConfigRow,
  products: ProductRow[],
) {
  const normalizedMessage = normalizeText(message);
  const tokens = queryTokens(message);
  const scored = productRecords(config, products)
    .map((record) => {
      const normalizedName = normalizeText(record.name);
      const nameTokens = normalizedName.split(" ");
      const categoryTokens = normalizeText(record.category || "").split(" ");
      let score =
        normalizedName.length > 2 && normalizedMessage.includes(normalizedName)
          ? 100
          : 0;

      for (const token of tokens) {
        if (nameTokens.includes(token)) score += 25;
        else if (categoryTokens.includes(token)) score += 10;
      }

      return { record, score };
    })
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score);

  if (scored.length === 0) return null;
  if (scored.length > 1 && scored[0].score === scored[1].score) return null;
  return scored[0].record;
}

function formatPrice(value: string) {
  const trimmed = value.trim();
  const numeric = Number(
    trimmed
      .replace(/(?:pkr|rs\.?|rupees?)/gi, "")
      .replace(/,/g, "")
      .trim(),
  );

  if (Number.isFinite(numeric)) {
    return `PKR ${new Intl.NumberFormat("en-PK", {
      maximumFractionDigits: 2,
    }).format(numeric)}`;
  }

  return trimmed;
}

function availabilitySentence(productName: string, value: string) {
  const normalized = normalizeText(value.replace(/_/g, " "));
  if (["in stock", "available", "yes", "true"].includes(normalized)) {
    return `${productName} is in stock.`;
  }
  if (["low stock", "limited stock"].includes(normalized)) {
    return `${productName} is available, but stock is low.`;
  }
  if (["out of stock", "unavailable", "no", "false"].includes(normalized)) {
    return `${productName} is currently out of stock.`;
  }
  return `${productName}'s availability is listed as "${value.trim()}".`;
}

function evidenceReply({
  sellerId,
  reply,
  intent,
  evidence,
}: {
  sellerId: string;
  reply: string;
  intent: ReplyIntent;
  evidence: ReplyEvidence[];
}): GroundedReply {
  return {
    reply,
    action: "reply",
    evidenceIds: evidence.map((item) => item.id),
    evidence,
    confidence: "high",
    intent,
    decisionReason:
      "Answered directly from exact fields in the seller's uploaded data.",
    tokenUsage: {
      sellerId,
      provider: "openai",
      model: "verified-data-fast-path",
      promptTokens: 0,
      cachedTokens: 0,
      completionTokens: 0,
      totalTokens: 0,
      cacheHitRate: "100% (verified-data fast path)",
    },
  };
}

function exactValues(
  seller: SellerRow,
  config: AgentConfigRow,
  allowedKeys: Set<string>,
) {
  const matches: VerifiedValue[] = [];

  for (const { item, row, index } of spreadsheetRows(config)) {
    for (const [key, rawValue] of Object.entries(row)) {
      if (!allowedKeys.has(normalizeKey(key))) continue;
      const value = String(rawValue ?? "").trim();
      if (!value) continue;
      matches.push({
        value,
        evidence: {
          id: `knowledge:${item.id}:row:${index + 1}`,
          label: `${item.name}, row ${index + 1}`,
          excerpt: `${key}: ${value}`.slice(0, 190),
        },
      });
    }
  }

  for (const item of config.knowledge_items || []) {
    const parsed = parseKnowledgeItem(item);
    if (!parsed || Array.isArray(parsed.rows)) continue;
    for (const [key, rawValue] of Object.entries(parsed)) {
      if (!allowedKeys.has(normalizeKey(key))) continue;
      const value = String(rawValue ?? "").trim();
      if (!value) continue;
      matches.push({
        value,
        evidence: {
          id: `knowledge:${item.id}`,
          label: item.name,
          excerpt: `${key}: ${value}`.slice(0, 190),
        },
      });
    }
  }

  for (const segment of (seller.policies || "").split("|")) {
    const separator = segment.indexOf(":");
    if (separator < 0) continue;
    const key = segment.slice(0, separator);
    const value = segment.slice(separator + 1).trim();
    if (!value || !allowedKeys.has(normalizeKey(key))) continue;
    matches.push({
      value,
      evidence: {
        id: "seller:identity",
        label: "Store profile and policies",
        excerpt: segment.trim().slice(0, 190),
      },
    });
  }

  const unique = new Map<string, VerifiedValue>();
  for (const match of matches) {
    unique.set(normalizeText(match.value), match);
  }
  return Array.from(unique.values());
}

function oneExactValue(
  seller: SellerRow,
  config: AgentConfigRow,
  allowedKeys: Set<string>,
) {
  const values = exactValues(seller, config, allowedKeys);
  return values.length === 1 ? values[0] : null;
}

export function isFactOnlyQuery(message: string) {
  return (
    /\b(price|cost|how much|available|availability|in stock|out of stock|stock)\b/i.test(
      message,
    ) ||
    /\b(deliver|delivery|shipping|courier|return|refund|exchange)\b/i.test(
      message,
    )
  );
}

export function getVerifiedDataReply({
  message,
  seller,
  config,
  products,
}: {
  message: string;
  seller: SellerRow;
  config: AgentConfigRow;
  products: ProductRow[];
}): GroundedReply | null {
  const asksPrice = /\b(price|cost|how much)\b/i.test(message);
  const asksAvailability =
    /\b(available|availability|in stock|out of stock|stock)\b/i.test(message);
  const asksReturns = /\b(return|refund|exchange)\b/i.test(message);
  const asksDelivery = /\b(deliver|delivery|shipping|courier)\b/i.test(message);

  if (asksPrice || asksAvailability) {
    const product = findProduct(message, config, products);
    if (!product) return null;

    const sentences: string[] = [];
    const facts: string[] = [];
    if (asksPrice) {
      if (!product.price) return null;
      const price = formatPrice(product.price);
      sentences.push(`${product.name} costs ${price}.`);
      facts.push(`Price: ${price}`);
    }
    if (asksAvailability) {
      if (!product.availability) return null;
      sentences.push(availabilitySentence(product.name, product.availability));
      facts.push(`Availability: ${product.availability}`);
    }

    return evidenceReply({
      sellerId: seller.id,
      reply: sentences.join(" "),
      intent: "product",
      evidence: [
        {
          id: product.sourceId,
          label: product.sourceLabel,
          excerpt: `Product: ${product.name} | ${facts.join(" | ")}`.slice(0, 190),
        },
      ],
    });
  }

  if (asksReturns) {
    const policy = oneExactValue(seller, config, RETURN_POLICY_KEYS);
    if (!policy) return null;
    return evidenceReply({
      sellerId: seller.id,
      reply: `Our return policy is: ${policy.value}`,
      intent: "returns",
      evidence: [policy.evidence],
    });
  }

  if (asksDelivery) {
    const asksCharges = /\b(charge|charges|cost|fee|fees|rate|rates)\b/i.test(
      message,
    );
    const asksTime = /\b(days?|how long|time|when|arrive|eta)\b/i.test(message);
    const charges = oneExactValue(seller, config, DELIVERY_CHARGE_KEYS);
    const deliveryTime = oneExactValue(seller, config, DELIVERY_TIME_KEYS);

    if (asksCharges) {
      if (!charges) return null;
      return evidenceReply({
        sellerId: seller.id,
        reply: `Delivery charges are: ${charges.value}`,
        intent: "delivery",
        evidence: [charges.evidence],
      });
    }

    if (asksTime) {
      if (!deliveryTime) return null;
      return evidenceReply({
        sellerId: seller.id,
        reply: `Delivery time is: ${deliveryTime.value}`,
        intent: "delivery",
        evidence: [deliveryTime.evidence],
      });
    }

    if (!charges || !deliveryTime) return null;
    return evidenceReply({
      sellerId: seller.id,
      reply: `Delivery charges are ${charges.value}. Delivery time is ${deliveryTime.value}.`,
      intent: "delivery",
      evidence: [charges.evidence, deliveryTime.evidence],
    });
  }

  return null;
}
