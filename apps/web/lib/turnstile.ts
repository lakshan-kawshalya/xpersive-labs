const SITEVERIFY_URL = "https://challenges.cloudflare.com/turnstile/v0/siteverify";
const SITEVERIFY_TIMEOUT_MS = 5000;

interface SiteverifyResponse {
  success: boolean;
}

/**
 * Verifies a Turnstile token server-side. Returns false on any failure (missing
 * secret, timeout, network error, or a token Cloudflare rejects) — callers should
 * treat that as "not human" rather than surface the specific cause to the client.
 */
export async function verifyTurnstileToken(token: string, remoteIp?: string): Promise<boolean> {
  const secret = process.env.TURNSTILE_SECRET;
  if (!secret || !token) return false;

  const body = new URLSearchParams({ secret, response: token });
  if (remoteIp) body.set("remoteip", remoteIp);

  try {
    const response = await fetch(SITEVERIFY_URL, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body,
      signal: AbortSignal.timeout(SITEVERIFY_TIMEOUT_MS),
    });

    if (!response.ok) return false;

    const data = (await response.json()) as SiteverifyResponse;
    return data.success === true;
  } catch {
    return false;
  }
}
