import type {
  AgentConfigRow,
  ApprovedFact,
  KnowledgeItem,
  ProductRow,
  SellerRow,
} from "@/lib/ai/types";

const STOP_WORDS = new Set([
  "a",
  "an",
  "and",
  "are",
  "can",
  "do",
  "for",
  "from",
  "have",
  "how",
  "i",
  "in",
  "is",
  "it",
  "ka",
  "ki",
  "kya",
  "me",
  "my",
  "of",
  "on",
  "please",
  "the",
  "to",
  "what",
  "with",
  "you",
  "your",
]);

const GREETING_PATTERN = /^(hi|hello|hey|salam|assalam(?:-o-alaikum)?|aoa|good\s+(morning|afternoon|evening))[!. ]*$/i;
const BROAD_CATALOG_PATTERN = /\b(products?|catalog(?:ue)?|collection|items?|designs?)\b/i;

function tokenize(value: string) {
  return Array.from(
    new Set(
      value
        .toLowerCase()
        .replace(/[^\p{L}\p{N}\s]/gu, " ")
        .split(/\s+/)
        .filter((token) => token.length > 1 && !STOP_WORDS.has(token)),
    ),
  );
}

function normalizeForMatch(str: string) {
  return str.toLowerCase().replace(/[^\p{L}\p{N}]/gu, "");
}

function scoreText(text: string, query: string, tokens: string[], exactMatchTarget?: string) {
  const haystack = text.toLowerCase();
  const normalizedQuery = query.toLowerCase().trim();
  let score = normalizedQuery.length > 2 && haystack.includes(normalizedQuery) ? 20 : 0;

  if (exactMatchTarget) {
    const queryClean = normalizeForMatch(query);
    const targetClean = normalizeForMatch(exactMatchTarget);
    
    if (targetClean.length > 2 && queryClean.includes(targetClean)) {
      score += 100; // Massive boost for exact product name matches
    } else if (queryClean.length > 3 && targetClean.includes(queryClean)) {
      score += 50; // Boost if the query is a substring of the product name
    }
    
    // Check token overlap specifically for the product name
    const targetTokens = tokenize(exactMatchTarget);
    let matchedTokens = 0;
    for (const t of tokens) {
      if (targetTokens.includes(t)) matchedTokens++;
    }
    if (matchedTokens > 0) {
      score += matchedTokens * 20; // Big boost per word matched in the title
    }
  }

  for (const token of tokens) {
    if (haystack.includes(token)) score += token.length >= 5 ? 4 : 2;
  }

  return score;
}

function cleanSnippet(value: string, maxLength = 700) {
  const compact = value.replace(/\s+/g, " ").trim();
  return compact.length > maxLength ? `${compact.slice(0, maxLength)}…` : compact;
}

function productFact(product: ProductRow, score: number): ApprovedFact {
  const fields = [
    `Product: ${product.name}`,
    product.category ? `Category: ${product.category}` : "",
    product.price !== null && product.price !== "" ? `Price: PKR ${product.price}` : "",
    product.availability_status ? `Availability: ${product.availability_status}` : "",
    product.description ? `Description: ${product.description}` : "",
    product.metadata && Object.keys(product.metadata).length
      ? `Additional details: ${JSON.stringify(product.metadata)}`
      : "",
  ].filter(Boolean);

  return {
    id: `product:${product.id}`,
    text: cleanSnippet(fields.join(" | ")),
    score,
  };
}

function spreadsheetFacts(
  item: KnowledgeItem,
  query: string,
  tokens: string[],
): ApprovedFact[] {
  try {
    const parsed = JSON.parse(item.content) as {
      rows?: Array<Record<string, unknown>>;
    };
    if (!Array.isArray(parsed.rows)) return [];

    return parsed.rows
      .map((row, index) => {
        const text = Object.entries(row)
          .map(([key, value]) => `${key}: ${String(value ?? "")}`)
          .join(" | ");
        return {
          id: `knowledge:${item.id}:row:${index + 1}`,
          text: cleanSnippet(`${item.name} | ${text}`),
          score: scoreText(text, query, tokens),
        };
      })
      .filter((fact) => fact.score > 0);
  } catch {
    return [];
  }
}

export function isGreeting(message: string) {
  return GREETING_PATTERN.test(message.trim());
}

export function findApprovedFacts({
  message,
  seller,
  config,
  products,
}: {
  message: string;
  seller: SellerRow;
  config: AgentConfigRow;
  products: ProductRow[];
}) {
  const tokens = tokenize(message);
  const facts: ApprovedFact[] = [];
  const greeting = isGreeting(message);
  const broadCatalogQuestion = BROAD_CATALOG_PATTERN.test(message);

  console.log(`\n[DEBUG Grounding] Message: "${message}"`);
  console.log(`[DEBUG Grounding] Tokens extracted:`, tokens);
  console.log(`[DEBUG Grounding] Pre-filtered Products available: ${products.length}`);

  // Always include seller identity and policies (onboarding data)
  const sellerText = [
    `Business name: ${seller.business_name || "the seller's store"}`,
    seller.industry ? `Industry: ${seller.industry}` : "",
    (seller as any).policies ? `Policies (Delivery/Returns/Hours): ${(seller as any).policies}` : ""
  ].filter(Boolean).join(" | ");

  facts.push({
    id: "seller:identity",
    text: sellerText,
    score: greeting ? 50 : 20, // Baseline score ensures onboarding info is available
  });

  products.forEach((product, index) => {
    const searchable = [
      product.name,
      product.category,
      product.description,
      product.availability_status,
      product.metadata ? JSON.stringify(product.metadata) : "",
    ]
      .filter(Boolean)
      .join(" ");
    
    // Calculate final grounding score
    const score = broadCatalogQuestion && index < 8
      ? 5
      : scoreText(searchable, message, tokens, product.name);
      
    if (score > 0) {
      console.log(`[DEBUG Grounding] Matched: "${product.name}" | Score: ${score}`);
      facts.push(productFact(product, score));
    }
  });

  for (const item of config.knowledge_items || []) {
    const spreadsheetMatches = spreadsheetFacts(item, message, tokens);
    if (spreadsheetMatches.length) {
      facts.push(...spreadsheetMatches);
      continue;
    }

    const score = scoreText(`${item.name} ${item.content}`, message, tokens);
    if (score > 0) {
      facts.push({
        id: `knowledge:${item.id}`,
        text: cleanSnippet(`${item.name} | ${item.content}`),
        score,
      });
    }
  }

  if (config.agent_memory) {
    facts.push({
      id: "seller:memory",
      text: cleanSnippet(config.agent_memory),
      score: greeting ? 50 : 20, // Baseline score ensures AI agent setup data is always available
    });
  }

  return facts
    .sort((a, b) => b.score - a.score)
    .slice(0, 12);
}
