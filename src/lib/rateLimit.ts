/**
 * Best-effort in-memory sliding window, per warm serverless instance.
 * Concurrent lambdas each keep their own map and cold starts reset it —
 * acceptable for a prototype application form (the honeypot field is the
 * other guard). For production limits, swap in Upstash Redis
 * (@upstash/ratelimit) behind this same function signature.
 */
const WINDOW_MS = 10 * 60_000;
const MAX_PER_WINDOW = 5;

const hits = new Map<string, number[]>();

export function rateLimit(ip: string): boolean {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);

  if (recent.length >= MAX_PER_WINDOW) {
    hits.set(ip, recent);
    return false;
  }

  recent.push(now);
  hits.set(ip, recent);

  if (hits.size > 1000) {
    for (const [key, times] of hits) {
      if (times.every((t) => now - t >= WINDOW_MS)) hits.delete(key);
    }
    /* Header-rotating clients can flood the map inside one window —
       evict oldest insertions to bound memory. */
    if (hits.size > 2000) {
      for (const key of hits.keys()) {
        if (hits.size <= 2000) break;
        hits.delete(key);
      }
    }
  }
  return true;
}
