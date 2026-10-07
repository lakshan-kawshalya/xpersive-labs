import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getClientIp, isPrivateOrLoopbackIp } from "@/lib/geo/ip";
import { lookupCountryByIp } from "@/lib/geo/geoLookup";
import { DEFAULT_REGION, isRegion, mapCountryToRegion } from "@/lib/geo/regions";
import { isKeystaticAuthorized, keystaticAuthChallenge } from "@/lib/auth/keystaticAuth";

export const REGION_COOKIE_NAME = "xl_region";

const REGION_COOKIE_MAX_AGE_SECONDS = 60 * 60 * 24 * 180; // 180 days

async function detectRegion(request: NextRequest): Promise<string> {
  const ip = getClientIp(request.headers);

  // Localhost/dev, LAN, and undetectable IPs skip the lookup entirely —
  // there's nothing to geolocate.
  if (!ip || isPrivateOrLoopbackIp(ip)) {
    return DEFAULT_REGION;
  }

  const country = await lookupCountryByIp(ip);
  return mapCountryToRegion(country);
}

export default async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const isKeystaticPath = pathname === "/keystatic" || pathname.startsWith("/keystatic/");

  // Keystatic's local-storage mode ships with no auth of its own — gate it here since
  // /api/keystatic/* falls outside this middleware's matcher and gates itself separately.
  if (isKeystaticPath) {
    if (!isKeystaticAuthorized(request.headers)) {
      return keystaticAuthChallenge();
    }
    return NextResponse.next({ request });
  }

  const existingRegion = request.cookies.get(REGION_COOKIE_NAME)?.value;

  const region = isRegion(existingRegion) ? existingRegion : await detectRegion(request);

  // The homepage is pre-rendered as two separate static pages (global and LK) so it
  // stays fully static and CDN-cacheable — this rewrite serves the right one without
  // changing the URL, rather than branching at render time on a per-request header.
  const response =
    pathname === "/" && region === "LK"
      ? NextResponse.rewrite(new URL("/home-lk", request.url))
      : NextResponse.next();

  // Only write the cookie on first detection. Once set, it's left alone here
  // so a future manual region selector can override it without middleware
  // stomping the choice back to the IP-detected value on the next request.
  if (!isRegion(existingRegion)) {
    response.cookies.set(REGION_COOKIE_NAME, region, {
      maxAge: REGION_COOKIE_MAX_AGE_SECONDS,
      path: "/",
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
    });
  }

  return response;
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|api|favicon.ico|.*\\.[\\w]+$).*)"],
};
