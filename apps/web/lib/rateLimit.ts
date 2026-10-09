const MAX_TRACKED_KEYS = 5000;

export interface RateLimiter {
  /** Returns true if the request is allowed, false once the key is over its limit. */
  isAllowed(key: string, now?: number): boolean;
}

/**
 * Fixed-window, in-memory limiter. On serverless each warm instance keeps its own
 * counts, so this is a best-effort brake on bursts, not a hard global limit.
 */
export function createRateLimiter(limit: number, windowMs: number): RateLimiter {
  const windows = new Map<string, { count: number; resetAt: number }>();

  return {
    isAllowed(key, now = Date.now()) {
      const current = windows.get(key);

      if (!current || current.resetAt <= now) {
        if (windows.size >= MAX_TRACKED_KEYS) {
          for (const [trackedKey, entry] of windows) {
            if (entry.resetAt <= now) windows.delete(trackedKey);
          }
          if (windows.size >= MAX_TRACKED_KEYS) windows.clear();
        }
        windows.set(key, { count: 1, resetAt: now + windowMs });
        return true;
      }

      if (current.count >= limit) return false;
      windows.set(key, { count: current.count + 1, resetAt: current.resetAt });
      return true;
    },
  };
}
