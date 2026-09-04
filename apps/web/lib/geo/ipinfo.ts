const IPINFO_TIMEOUT_MS = 1500;

interface IpinfoResponse {
  country?: string;
}

/**
 * Looks up the ISO 3166-1 alpha-2 country code for a public IP via ipinfo.io.
 * Returns null on any failure (missing token, timeout, rate limit, bad IP) —
 * callers are expected to fall back to the default region rather than fail
 * the request.
 */
export async function lookupCountryByIp(ip: string): Promise<string | null> {
  const token = process.env.IPINFO_TOKEN;
  if (!token) return null;

  try {
    const response = await fetch(
      `https://ipinfo.io/${encodeURIComponent(ip)}/json?token=${token}`,
      { signal: AbortSignal.timeout(IPINFO_TIMEOUT_MS) },
    );

    if (!response.ok) return null;

    const data = (await response.json()) as IpinfoResponse;
    return data.country ?? null;
  } catch {
    return null;
  }
}
