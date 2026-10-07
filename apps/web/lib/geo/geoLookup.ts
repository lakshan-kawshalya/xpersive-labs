import geoip from "fast-geoip";

/**
 * Looks up the ISO 3166-1 alpha-2 country code for a public IP against a
 * local MaxMind GeoLite2 database — no network call, no API token, and no
 * per-request latency tax. Works identically on any Node.js host, since
 * Next.js Proxy files always run on the Node.js runtime.
 */
export async function lookupCountryByIp(ip: string): Promise<string | null> {
  try {
    const result = await geoip.lookup(ip);
    return result?.country ?? null;
  } catch {
    return null;
  }
}
