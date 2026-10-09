// API routes get no built-in CSRF protection (unlike Server Actions), so this is
// verified manually: a cross-site request won't have a matching Origin/Host pair.
export function isTrustedOrigin(headers: Headers): boolean {
  const origin = headers.get("origin");
  const host = headers.get("host");
  if (!origin || !host) return false;

  try {
    return new URL(origin).host === host;
  } catch {
    return false;
  }
}
