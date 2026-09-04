import { afterEach, beforeEach, describe, expect, test, vi } from "vitest";
import { lookupCountryByIp } from "./ipinfo";

describe("lookupCountryByIp", () => {
  beforeEach(() => {
    vi.stubEnv("IPINFO_TOKEN", "test-token");
  });

  afterEach(() => {
    vi.unstubAllEnvs();
    vi.unstubAllGlobals();
  });

  test("returns the country code from a successful response", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue(
        new Response(JSON.stringify({ country: "LK" }), { status: 200 }),
      ),
    );

    await expect(lookupCountryByIp("203.0.113.5")).resolves.toBe("LK");
  });

  test("includes the IP and token in the request URL", async () => {
    const fetchMock = vi
      .fn()
      .mockResolvedValue(new Response(JSON.stringify({ country: "US" }), { status: 200 }));
    vi.stubGlobal("fetch", fetchMock);

    await lookupCountryByIp("203.0.113.5");

    expect(fetchMock).toHaveBeenCalledWith(
      "https://ipinfo.io/203.0.113.5/json?token=test-token",
      expect.anything(),
    );
  });

  test("returns null without calling fetch when no token is configured", async () => {
    vi.stubEnv("IPINFO_TOKEN", "");
    const fetchMock = vi.fn();
    vi.stubGlobal("fetch", fetchMock);

    await expect(lookupCountryByIp("203.0.113.5")).resolves.toBeNull();
    expect(fetchMock).not.toHaveBeenCalled();
  });

  test("returns null when the response is not ok", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue(new Response(null, { status: 429 })));

    await expect(lookupCountryByIp("203.0.113.5")).resolves.toBeNull();
  });

  test("returns null when the response body has no country field", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue(new Response(JSON.stringify({}), { status: 200 })),
    );

    await expect(lookupCountryByIp("203.0.113.5")).resolves.toBeNull();
  });

  test("returns null when fetch rejects (network error, timeout, etc.)", async () => {
    vi.stubGlobal("fetch", vi.fn().mockRejectedValue(new Error("network error")));

    await expect(lookupCountryByIp("203.0.113.5")).resolves.toBeNull();
  });

  test("returns null when the response body is not valid JSON", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue(new Response("not json", { status: 200 })));

    await expect(lookupCountryByIp("203.0.113.5")).resolves.toBeNull();
  });
});
