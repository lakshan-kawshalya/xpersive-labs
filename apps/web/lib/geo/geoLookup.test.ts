import { afterEach, describe, expect, test, vi } from "vitest";

const { lookup } = vi.hoisted(() => ({
  lookup: vi.fn(),
}));

vi.mock("fast-geoip", () => ({ default: { lookup } }));

import { lookupCountryByIp } from "./geoLookup";

describe("lookupCountryByIp", () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  test("returns the country code from a successful lookup", async () => {
    lookup.mockResolvedValue({ country: "LK" });

    await expect(lookupCountryByIp("203.0.113.5")).resolves.toBe("LK");
    expect(lookup).toHaveBeenCalledWith("203.0.113.5");
  });

  test("returns null when the IP has no match in the database", async () => {
    lookup.mockResolvedValue(null);

    await expect(lookupCountryByIp("203.0.113.5")).resolves.toBeNull();
  });

  test("returns null when the lookup throws", async () => {
    lookup.mockRejectedValue(new Error("corrupt database chunk"));

    await expect(lookupCountryByIp("203.0.113.5")).resolves.toBeNull();
  });
});
