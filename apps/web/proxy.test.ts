import { NextRequest } from "next/server";
import { afterEach, describe, expect, test, vi } from "vitest";

const { lookupCountryByIp } = vi.hoisted(() => ({
  lookupCountryByIp: vi.fn(),
}));

vi.mock("./lib/geo/ipinfo", () => ({ lookupCountryByIp }));

import proxy, { REGION_COOKIE_NAME, REGION_HEADER_NAME } from "./proxy";

function makeRequest(init: { headers?: Record<string, string>; cookie?: string } = {}) {
  const headers = new Headers(init.headers);
  if (init.cookie) headers.set("cookie", init.cookie);
  return new NextRequest("https://xpersivelabs.com/about", { headers });
}

describe("proxy", () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  test("falls back to the default region and sets the cookie for a request with no IP info (localhost/dev)", async () => {
    const response = await proxy(makeRequest());

    expect(response.cookies.get(REGION_COOKIE_NAME)?.value).toBe("US");
    expect(lookupCountryByIp).not.toHaveBeenCalled();
  });

  test("skips the geo-IP lookup and falls back to the default region for a private/LAN IP", async () => {
    const response = await proxy(makeRequest({ headers: { "x-forwarded-for": "10.0.0.5" } }));

    expect(response.cookies.get(REGION_COOKIE_NAME)?.value).toBe("US");
    expect(lookupCountryByIp).not.toHaveBeenCalled();
  });

  test("maps a detected country to its region and sets the cookie for a public IP", async () => {
    lookupCountryByIp.mockResolvedValue("GB");

    const response = await proxy(makeRequest({ headers: { "x-forwarded-for": "203.0.113.5" } }));

    expect(lookupCountryByIp).toHaveBeenCalledWith("203.0.113.5");
    expect(response.cookies.get(REGION_COOKIE_NAME)?.value).toBe("UK");
  });

  test("falls back to the default region when the geo-IP lookup fails", async () => {
    lookupCountryByIp.mockResolvedValue(null);

    const response = await proxy(makeRequest({ headers: { "x-forwarded-for": "203.0.113.5" } }));

    expect(response.cookies.get(REGION_COOKIE_NAME)?.value).toBe("US");
  });

  test("does not re-detect or overwrite the cookie when a valid region cookie already exists", async () => {
    const response = await proxy(
      makeRequest({
        headers: { "x-forwarded-for": "203.0.113.5" },
        cookie: `${REGION_COOKIE_NAME}=EU`,
      }),
    );

    expect(lookupCountryByIp).not.toHaveBeenCalled();
    expect(response.cookies.get(REGION_COOKIE_NAME)).toBeUndefined();
  });

  test("re-detects when the existing cookie holds a value outside the five target regions", async () => {
    const response = await proxy(
      makeRequest({ cookie: `${REGION_COOKIE_NAME}=not-a-real-region` }),
    );

    expect(response.cookies.get(REGION_COOKIE_NAME)?.value).toBe("US");
  });

  test("forwards the resolved region to the downstream request via the region header", async () => {
    const response = await proxy(
      makeRequest({
        headers: { "x-forwarded-for": "203.0.113.5" },
        cookie: `${REGION_COOKIE_NAME}=LK`,
      }),
    );

    expect(response.headers.get("x-middleware-override-headers")).toContain(REGION_HEADER_NAME);
    expect(response.headers.get(`x-middleware-request-${REGION_HEADER_NAME}`)).toBe("LK");
  });

  test("sets the region cookie with a 180-day max age and a lax same-site policy", async () => {
    const response = await proxy(makeRequest());
    const cookie = response.cookies.get(REGION_COOKIE_NAME);

    expect(cookie?.maxAge).toBe(60 * 60 * 24 * 180);
    expect(cookie?.path).toBe("/");
    expect(cookie?.sameSite).toBe("lax");
  });

  test("marks the cookie secure in production", async () => {
    vi.stubEnv("NODE_ENV", "production");

    const response = await proxy(makeRequest());

    expect(response.cookies.get(REGION_COOKIE_NAME)?.secure).toBe(true);

    vi.unstubAllEnvs();
  });

  describe("/keystatic", () => {
    function makeKeystaticRequest(path: string, authHeader?: string) {
      const headers = new Headers();
      if (authHeader) headers.set("authorization", authHeader);
      return new NextRequest(`https://xpersivelabs.com${path}`, { headers });
    }

    afterEach(() => {
      vi.unstubAllEnvs();
    });

    test("denies access with no credentials configured", async () => {
      const response = await proxy(makeKeystaticRequest("/keystatic"));

      expect(response.status).toBe(401);
      expect(response.headers.get("www-authenticate")).toContain("Basic");
    });

    test("denies access with no Authorization header even when credentials are configured", async () => {
      vi.stubEnv("KEYSTATIC_BASIC_AUTH_USER", "editor");
      vi.stubEnv("KEYSTATIC_BASIC_AUTH_PASSWORD", "correct-horse");

      const response = await proxy(makeKeystaticRequest("/keystatic"));

      expect(response.status).toBe(401);
    });

    test("denies access with the wrong password", async () => {
      vi.stubEnv("KEYSTATIC_BASIC_AUTH_USER", "editor");
      vi.stubEnv("KEYSTATIC_BASIC_AUTH_PASSWORD", "correct-horse");

      const auth = `Basic ${btoa("editor:wrong-password")}`;
      const response = await proxy(makeKeystaticRequest("/keystatic", auth));

      expect(response.status).toBe(401);
    });

    test("allows access through with the correct credentials", async () => {
      vi.stubEnv("KEYSTATIC_BASIC_AUTH_USER", "editor");
      vi.stubEnv("KEYSTATIC_BASIC_AUTH_PASSWORD", "correct-horse");

      const auth = `Basic ${btoa("editor:correct-horse")}`;
      const response = await proxy(makeKeystaticRequest("/keystatic/posts", auth));

      expect(response.status).not.toBe(401);
    });
  });
});
