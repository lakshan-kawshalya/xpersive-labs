import { afterEach, describe, expect, test, vi } from "vitest";
import { verifyTurnstileToken } from "./turnstile";

describe("verifyTurnstileToken", () => {
  afterEach(() => {
    vi.unstubAllEnvs();
    vi.unstubAllGlobals();
  });

  test("returns false when TURNSTILE_SECRET is not configured", async () => {
    const fetchSpy = vi.fn();
    vi.stubGlobal("fetch", fetchSpy);

    expect(await verifyTurnstileToken("token")).toBe(false);
    expect(fetchSpy).not.toHaveBeenCalled();
  });

  test("returns false for an empty token", async () => {
    vi.stubEnv("TURNSTILE_SECRET", "secret");
    const fetchSpy = vi.fn();
    vi.stubGlobal("fetch", fetchSpy);

    expect(await verifyTurnstileToken("")).toBe(false);
    expect(fetchSpy).not.toHaveBeenCalled();
  });

  test("returns true when Cloudflare reports success", async () => {
    vi.stubEnv("TURNSTILE_SECRET", "secret");
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue(new Response(JSON.stringify({ success: true }), { status: 200 })),
    );

    expect(await verifyTurnstileToken("valid-token", "203.0.113.5")).toBe(true);
  });

  test("returns false when Cloudflare reports failure", async () => {
    vi.stubEnv("TURNSTILE_SECRET", "secret");
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue(new Response(JSON.stringify({ success: false }), { status: 200 })),
    );

    expect(await verifyTurnstileToken("bad-token")).toBe(false);
  });

  test("returns false when the siteverify request itself fails", async () => {
    vi.stubEnv("TURNSTILE_SECRET", "secret");
    vi.stubGlobal("fetch", vi.fn().mockRejectedValue(new Error("network error")));

    expect(await verifyTurnstileToken("token")).toBe(false);
  });

  test("returns false on a non-OK response", async () => {
    vi.stubEnv("TURNSTILE_SECRET", "secret");
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue(new Response("", { status: 500 })));

    expect(await verifyTurnstileToken("token")).toBe(false);
  });
});
