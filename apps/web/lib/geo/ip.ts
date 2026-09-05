/** Extracts the originating client IP from standard proxy headers. */
export function getClientIp(headers: Headers): string | null {
  const forwardedFor = headers.get("x-forwarded-for");
  if (forwardedFor) {
    const first = forwardedFor.split(",")[0]?.trim();
    if (first) return first;
  }

  const realIp = headers.get("x-real-ip");
  if (realIp) return realIp.trim();

  return null;
}

const PRIVATE_IPV4_PREFIXES = ["10.", "192.168.", "127."];

function isPrivateIpv4(ip: string): boolean {
  if (PRIVATE_IPV4_PREFIXES.some((prefix) => ip.startsWith(prefix))) return true;

  // 172.16.0.0 – 172.31.255.255
  const match = ip.match(/^172\.(\d{1,3})\./);
  if (match) {
    const secondOctet = Number(match[1]);
    return secondOctet >= 16 && secondOctet <= 31;
  }

  return false;
}

/**
 * True for loopback, private, and unspecified IPs (localhost, LAN, Docker),
 * where a geo-IP lookup would be meaningless or fail.
 */
export function isPrivateOrLoopbackIp(ip: string): boolean {
  const normalized = ip.toLowerCase();

  if (
    normalized === "::1" ||
    normalized === "localhost" ||
    normalized.startsWith("fc00:") ||
    normalized.startsWith("fd00:") ||
    normalized.startsWith("fe80:")
  ) {
    return true;
  }

  const ipv4 = normalized.startsWith("::ffff:") ? normalized.slice(7) : normalized;
  return isPrivateIpv4(ipv4);
}
