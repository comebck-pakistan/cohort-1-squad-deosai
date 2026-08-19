const fs = require('fs');

// 1. Process vertex-cache.ts
let vertex = fs.readFileSync('lib/ai/vertex-cache.ts', 'utf8');
if (!vertex.includes('import { logger }')) {
  vertex = 'import { logger } from "@/lib/logger";\n' + vertex;
}
vertex = vertex.replace(/console\.log\(/g, 'logger.info(');
vertex = vertex.replace(/console\.warn\(/g, 'logger.warn(');
vertex = vertex.replace(/console\.error\(/g, 'logger.error(');

// Add stats tracking
if (!vertex.includes('private stats = {')) {
  vertex = vertex.replace(
    'class VertexCacheManager {\n  private cacheStore = new Map<string, CachedContentRef>();',
    'class VertexCacheManager {\n  private cacheStore = new Map<string, CachedContentRef>();\n  private stats = { hits: 0, misses: 0, total: 0 };'
  );
  
  vertex = vertex.replace(
    'const promptHash = this.computeHash(staticPrompt);',
    'this.stats.total++;\n    const promptHash = this.computeHash(staticPrompt);'
  );
  
  vertex = vertex.replace(
    /logger\.info\(\`\[Vertex Cache HIT\] Reusing cachedContent for seller: \$\{sellerId\} \(\$\{existing\.name\}\)\`\);/,
    'this.stats.hits++;\n      const missRate = (this.stats.misses / this.stats.total) * 100;\n      logger.info(`[Vertex Cache HIT] Reusing cachedContent for seller: ${sellerId} (${existing.name}) | Resource Miss Rate: ${missRate.toFixed(1)}%`);'
  );

  vertex = vertex.replace(
    /logger\.info\(\`\[Vertex Cache MISS\] Creating new CachedContent resource for seller: \$\{sellerId\}\.\.\.\`\);/,
    'this.stats.misses++;\n      const missRate = (this.stats.misses / this.stats.total) * 100;\n      logger.info(`[Vertex Cache MISS] Creating new CachedContent resource for seller: ${sellerId}... | Resource Miss Rate: ${missRate.toFixed(1)}%`);'
  );
}
fs.writeFileSync('lib/ai/vertex-cache.ts', vertex);

// 2. Process generate-reply.ts
let reply = fs.readFileSync('lib/ai/generate-reply.ts', 'utf8');
if (!reply.includes('import { logger }')) {
  reply = 'import { logger } from "@/lib/logger";\n' + reply;
}
reply = reply.replace(/console\.log\(/g, 'logger.info(');
reply = reply.replace(/console\.warn\(/g, 'logger.warn(');
reply = reply.replace(/console\.error\(/g, 'logger.error(');

// Add stats tracking
if (!reply.includes('let globalTotalRequests = 0;')) {
  reply = reply.replace(
    'function logTokenUsage(metrics: TokenUsageLog): void {',
    'let globalTotalRequests = 0;\nlet globalCacheMisses = 0;\n\nfunction logTokenUsage(metrics: TokenUsageLog): void {\n  globalTotalRequests++;\n  if (metrics.cachedTokens === 0) globalCacheMisses++;\n  const requestMissRate = globalTotalRequests > 0 ? (globalCacheMisses / globalTotalRequests) * 100 : 0;'
  );

  reply = reply.replace(
    /\`Cached: \$\{metrics\.cachedTokens\} \| Cache Hit Rate: \$\{metrics\.cacheHitRate\}\`/,
    '`Cached: ${metrics.cachedTokens} | Token Cache Hit Rate: ${metrics.cacheHitRate} | ` +\n      `Request Miss Rate: ${requestMissRate.toFixed(1)}% (${globalCacheMisses}/${globalTotalRequests})`'
  );
}
fs.writeFileSync('lib/ai/generate-reply.ts', reply);
