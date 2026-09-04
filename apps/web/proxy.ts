import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getClientIp, isPrivateOrLoopbackIp } from "@/lib/geo/ip";
import { lookupCountryByIp } from "@/lib/geo/ipinfo";
import { DEFAULT_REGION, isRegion, mapCountryToRegion } from "@/lib/geo/regions";

export const REGION_COOKIE_NAME = "xl_region";
export const REGION_HEADER_NAME = "x-xl-region";

const REGION_COOKIE_MAX_AGE_SECONDS = 60 * 60 * 24 * 180; // 180 days

async function detectRegion(request: NextRequest): Promise<string> {
  const ip = getClientIp(request.headers);

  // Localhost/dev, LAN, and undetectable IPs skip the lookup entirely —
  // ipinfo.io cannot geolocate them, and there's nothing to gain by trying.
  if (!ip || isPrivateOrLoopbackIp(ip)) {
    return DEFAULT_REGION;
  }

  const country = await lookupCountryByIp(ip);
  return mapCountryToRegion(country);
}

export default async function proxy(request: NextRequest) {
  const existingRegion = request.cookies.get(REGION_COOKIE_NAME)?.value;

  const region = isRegion(existingRegion) ? existingRegion : await detectRegion(request);

  const forwardedHeaders = new Headers(request.headers);
  forwardedHeaders.set(REGION_HEADER_NAME, region);

  const response = NextResponse.next({ request: { headers: forwardedHeaders } });

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
