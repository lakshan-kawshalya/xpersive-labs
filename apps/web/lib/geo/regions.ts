export const REGIONS = ["AU", "UK", "US", "EU", "LK"] as const;

export type Region = (typeof REGIONS)[number];

export const DEFAULT_REGION: Region = "US";

/** ISO 3166-1 alpha-2 codes of the 27 formal EU member states. */
const EU_COUNTRY_CODES = [
  "AT", "BE", "BG", "HR", "CY", "CZ", "DK", "EE", "FI", "FR",
  "DE", "GR", "HU", "IE", "IT", "LV", "LT", "LU", "MT", "NL",
  "PL", "PT", "RO", "SK", "SI", "ES", "SE",
] as const;

/** ISO 3166-1 alpha-2 country code -> target region. */
const COUNTRY_TO_REGION: Record<string, Region> = {
  AU: "AU",
  GB: "UK", // United Kingdom's ISO code is GB, not UK
  US: "US",
  LK: "LK",
  ...Object.fromEntries(EU_COUNTRY_CODES.map((code) => [code, "EU" as const])),
};

/**
 * Maps an ISO 3166-1 alpha-2 country code to one of the five target regions.
 * Unknown, undetectable, or unmapped countries fall back to DEFAULT_REGION.
 */
export function mapCountryToRegion(countryCode: string | null | undefined): Region {
  if (!countryCode) return DEFAULT_REGION;
  return COUNTRY_TO_REGION[countryCode.toUpperCase()] ?? DEFAULT_REGION;
}

export function isRegion(value: string | undefined | null): value is Region {
  return !!value && (REGIONS as readonly string[]).includes(value);
}
