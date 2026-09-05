import { describe, expect, test } from "vitest";
import { DEFAULT_REGION, isRegion, mapCountryToRegion } from "./regions";

describe("mapCountryToRegion", () => {
  test("maps AU to the AU region", () => {
    expect(mapCountryToRegion("AU")).toBe("AU");
  });

  test("maps GB to the UK region (UK's ISO code is GB, not UK)", () => {
    expect(mapCountryToRegion("GB")).toBe("UK");
  });

  test("maps US to the US region", () => {
    expect(mapCountryToRegion("US")).toBe("US");
  });

  test("maps LK to the LK region", () => {
    expect(mapCountryToRegion("LK")).toBe("LK");
  });

  test.each(["DE", "FR", "IT", "ES", "NL", "SE", "PL"])(
    "maps EU member state %s to the EU region",
    (code) => {
      expect(mapCountryToRegion(code)).toBe("EU");
    },
  );

  test("is case-insensitive", () => {
    expect(mapCountryToRegion("gb")).toBe("UK");
    expect(mapCountryToRegion("de")).toBe("EU");
  });

  test("falls back to the default region for a country outside the five target regions", () => {
    expect(mapCountryToRegion("JP")).toBe(DEFAULT_REGION);
    expect(mapCountryToRegion("BR")).toBe(DEFAULT_REGION);
  });

  test("falls back to the default region for a non-EU European country", () => {
    // Norway/Switzerland are Europe but not formal EU members per the
    // confirmed EU scope decision.
    expect(mapCountryToRegion("NO")).toBe(DEFAULT_REGION);
    expect(mapCountryToRegion("CH")).toBe(DEFAULT_REGION);
  });

  test("falls back to the default region when the country code is null, undefined, or empty", () => {
    expect(mapCountryToRegion(null)).toBe(DEFAULT_REGION);
    expect(mapCountryToRegion(undefined)).toBe(DEFAULT_REGION);
    expect(mapCountryToRegion("")).toBe(DEFAULT_REGION);
  });
});

describe("isRegion", () => {
  test("returns true for each of the five target regions", () => {
    expect(isRegion("AU")).toBe(true);
    expect(isRegion("UK")).toBe(true);
    expect(isRegion("US")).toBe(true);
    expect(isRegion("EU")).toBe(true);
    expect(isRegion("LK")).toBe(true);
  });

  test("returns false for a value that is not a target region", () => {
    expect(isRegion("GB")).toBe(false);
    expect(isRegion("global")).toBe(false);
  });

  test("returns false for null or undefined", () => {
    expect(isRegion(null)).toBe(false);
    expect(isRegion(undefined)).toBe(false);
  });
});
