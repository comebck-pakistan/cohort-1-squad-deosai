// lib/rate-limit.ts
export const rateLimitMap = new Map<string, { count: number; resetTime: number }>();

export async function checkRateLimit(
  identifier: string,
  limit: number,
  windowMs: number
): Promise<{ success: boolean; limit: number; remaining: number; reset: number }> {
  const now = Date.now();
  const info = rateLimitMap.get(identifier);

  // Randomly clean up old entries to prevent memory leaks in long-running processes
  if (Math.random() < 0.05) {
    for (const [key, value] of rateLimitMap.entries()) {
      if (now > value.resetTime) {
        rateLimitMap.delete(key);
      }
    }
  }

  if (!info || now > info.resetTime) {
    rateLimitMap.set(identifier, {
      count: 1,
      resetTime: now + windowMs,
    });
    return { success: true, limit, remaining: limit - 1, reset: now + windowMs };
  }

  if (info.count >= limit) {
    return { success: false, limit, remaining: 0, reset: info.resetTime };
  }

  info.count += 1;
  return { success: true, limit, remaining: limit - info.count, reset: info.resetTime };
}
