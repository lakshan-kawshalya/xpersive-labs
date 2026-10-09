import { describe, expect, test } from "vitest";
import { createRateLimiter } from "./rateLimit";

describe("createRateLimiter", () => {
  test("allows requests up to the limit and blocks the next one", () => {
    const limiter = createRateLimiter(2, 1000);

    expect(limiter.isAllowed("a", 0)).toBe(true);
    expect(limiter.isAllowed("a", 1)).toBe(true);
    expect(limiter.isAllowed("a", 2)).toBe(false);
  });

  test("tracks keys independently", () => {
    const limiter = createRateLimiter(1, 1000);

    expect(limiter.isAllowed("a", 0)).toBe(true);
    expect(limiter.isAllowed("b", 0)).toBe(true);
    expect(limiter.isAllowed("a", 1)).toBe(false);
  });

  test("allows requests again once the window has passed", () => {
    const limiter = createRateLimiter(1, 1000);

    expect(limiter.isAllowed("a", 0)).toBe(true);
    expect(limiter.isAllowed("a", 999)).toBe(false);
    expect(limiter.isAllowed("a", 1000)).toBe(true);
  });
});
