import { NextResponse } from "next/server";

const REALM = "Keystatic Admin";

function timingSafeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let mismatch = 0;
  for (let i = 0; i < a.length; i++) {
    mismatch |= a.charCodeAt(i) ^ b.charCodeAt(i);
  }
  return mismatch === 0;
}

/**
 * Basic Auth gate for the Keystatic CMS admin UI and API. Fails closed:
 * if KEYSTATIC_BASIC_AUTH_USER/PASSWORD aren't configured, access is denied
 * rather than left open — Keystatic's local-storage mode has no auth of its own.
 */
export function isKeystaticAuthorized(headers: Headers): boolean {
  const expectedUser = process.env.KEYSTATIC_BASIC_AUTH_USER;
  const expectedPassword = process.env.KEYSTATIC_BASIC_AUTH_PASSWORD;
  if (!expectedUser || !expectedPassword) return false;

  const authHeader = headers.get("authorization");
  if (!authHeader?.startsWith("Basic ")) return false;

  let decoded: string;
  try {
    decoded = atob(authHeader.slice(6));
  } catch {
    return false;
  }

  const separatorIndex = decoded.indexOf(":");
  if (separatorIndex === -1) return false;

  const providedUser = decoded.slice(0, separatorIndex);
  const providedPassword = decoded.slice(separatorIndex + 1);

  return (
    timingSafeEqual(providedUser, expectedUser) &&
    timingSafeEqual(providedPassword, expectedPassword)
  );
}

export function keystaticAuthChallenge(): NextResponse {
  return new NextResponse("Authentication required", {
    status: 401,
    headers: { "WWW-Authenticate": `Basic realm="${REALM}"` },
  });
}
