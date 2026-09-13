import { afterEach, describe, expect, test, vi } from "vitest";
import { isKeystaticAuthorized, keystaticAuthChallenge } from "./keystaticAuth";

function authHeader(user: string, password: string): Headers {
  return new Headers({ authorization: `Basic ${btoa(`${user}:${password}`)}` });
}

describe("isKeystaticAuthorized", () => {
  afterEach(() => {
    vi.unstubAllEnvs();
  });

  test("denies when no credentials are configured", () => {
    expect(isKeystaticAuthorized(authHeader("editor", "correct-horse"))).toBe(false);
  });

  test("denies when the request has no Authorization header", () => {
    vi.stubEnv("KEYSTATIC_BASIC_AUTH_USER", "editor");
    vi.stubEnv("KEYSTATIC_BASIC_AUTH_PASSWORD", "correct-horse");

    expect(isKeystaticAuthorized(new Headers())).toBe(false);
  });

  test("denies a malformed Authorization header", () => {
    vi.stubEnv("KEYSTATIC_BASIC_AUTH_USER", "editor");
    vi.stubEnv("KEYSTATIC_BASIC_AUTH_PASSWORD", "correct-horse");

    expect(isKeystaticAuthorized(new Headers({ authorization: "Bearer not-basic" }))).toBe(false);
  });

  test("denies the wrong username or password", () => {
    vi.stubEnv("KEYSTATIC_BASIC_AUTH_USER", "editor");
    vi.stubEnv("KEYSTATIC_BASIC_AUTH_PASSWORD", "correct-horse");

    expect(isKeystaticAuthorized(authHeader("editor", "wrong"))).toBe(false);
    expect(isKeystaticAuthorized(authHeader("someone-else", "correct-horse"))).toBe(false);
  });

  test("allows the configured username and password", () => {
    vi.stubEnv("KEYSTATIC_BASIC_AUTH_USER", "editor");
    vi.stubEnv("KEYSTATIC_BASIC_AUTH_PASSWORD", "correct-horse");

    expect(isKeystaticAuthorized(authHeader("editor", "correct-horse"))).toBe(true);
  });
});

describe("keystaticAuthChallenge", () => {
  test("returns a 401 with a WWW-Authenticate challenge", () => {
    const response = keystaticAuthChallenge();

    expect(response.status).toBe(401);
    expect(response.headers.get("WWW-Authenticate")).toContain("Basic");
  });
});
