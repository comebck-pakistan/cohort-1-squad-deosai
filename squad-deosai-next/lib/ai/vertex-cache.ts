import * as crypto from "crypto";


export type CachedContentRef = {
  name: string;
  expireAt: number; // Unix timestamp in ms
  promptHash: string;
};

/**
 * Manages Vertex AI / Gemini explicit CachedContent resources.
 * Stores cache references per seller and handles creation, reuse,
 * expiry checks (24h TTL), and explicit cache invalidation.
 */
class VertexCacheManager {
  private cacheStore = new Map<string, CachedContentRef>();

  private computeHash(text: string): string {
    return crypto.createHash("sha256").update(text).digest("hex");
  }

  /**
   * Returns an active CachedContent resource name for a given seller,
   * or creates a new one if missing, expired, or if static content changed.
   */
  async getOrCreateCache({
    sellerId,
    staticPrompt,
    modelName = "models/gemini-1.5-flash",
  }: {
    sellerId: string;
    staticPrompt: string;
    modelName?: string;
  }): Promise<string | null> {
    const promptHash = this.computeHash(staticPrompt);
    const existing = this.cacheStore.get(sellerId);
    const now = Date.now();

    // Re-use active cache if unexpired and prompt byte-content is identical
    if (existing && existing.expireAt > now + 300000 && existing.promptHash === promptHash) {
      console.log(`[Vertex Cache HIT] Reusing cachedContent for seller: ${sellerId} (${existing.name})`);
      return existing.name;
    }

    const apiKey = process.env.VERTEX_API_KEY || process.env.GEMINI_API_KEY;
    if (!apiKey) {
      console.warn("[Vertex Cache] No GEMINI_API_KEY or VERTEX_API_KEY found; proceeding without explicit context cache.");
      return null;
    }

    try {
      console.log(`[Vertex Cache MISS] Creating new CachedContent resource for seller: ${sellerId}...`);

      const endpoint = `https://generativelanguage.googleapis.com/v1beta/cachedContents?key=${apiKey}`;
      const payload = {
        model: modelName,
        displayName: `seller_cache_${sellerId}`,
        contents: [
          {
            role: "user",
            parts: [{ text: staticPrompt }],
          },
        ],
        ttl: "86400s", // 24 hours TTL for low-to-medium seller traffic
      };

      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const errorText = await res.text();
        console.error(`[Vertex Cache] Failed to create CachedContent (${res.status}): ${errorText}`);
        return null;
      }

      const data = (await res.json()) as { name: string; expireTime: string };
      const expireAt = new Date(data.expireTime).getTime();

      const ref: CachedContentRef = {
        name: data.name,
        expireAt: isNaN(expireAt) ? now + 86400 * 1000 : expireAt,
        promptHash,
      };

      this.cacheStore.set(sellerId, ref);
      console.log(`[Vertex Cache CREATED] CachedContent resource ${data.name} active until ${new Date(ref.expireAt).toISOString()}`);
      return ref.name;
    } catch (err) {
      console.error("[Vertex Cache Error] Failed to create CachedContent:", err);
      return null;
    }
  }

  /**
   * Invalidates a seller's cached content (e.g. when seller updates products/policies).
   */
  invalidateCache(sellerId: string): void {
    console.log(`[Vertex Cache INVALIDATED] Cache cleared for seller: ${sellerId}`);
    this.cacheStore.delete(sellerId);
  }
}

export const vertexCacheManager = new VertexCacheManager();
