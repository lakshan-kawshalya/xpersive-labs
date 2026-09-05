import { describe, expect, test } from "vitest";
import { getClientIp, isPrivateOrLoopbackIp } from "./ip";

describe("getClientIp", () => {
  test("returns the first IP from a single-value x-forwarded-for header", () => {
    const headers = new Headers({ "x-forwarded-for": "203.0.113.5" });
    expect(getClientIp(headers)).toBe("203.0.113.5");
  });

  test("returns the client IP (first entry) from a multi-hop x-forwarded-for header", () => {
    const headers = new Headers({
      "x-forwarded-for": "203.0.113.5, 70.41.3.18, 150.172.238.178",
    });
    expect(getClientIp(headers)).toBe("203.0.113.5");
  });

  test("trims whitespace around the first x-forwarded-for entry", () => {
    const headers = new Headers({ "x-forwarded-for": "  203.0.113.5 , 70.41.3.18" });
    expect(getClientIp(headers)).toBe("203.0.113.5");
  });

  test("falls back to x-real-ip when x-forwarded-for is absent", () => {
    const headers = new Headers({ "x-real-ip": "203.0.113.9" });
    expect(getClientIp(headers)).toBe("203.0.113.9");
  });

  test("falls back to x-real-ip when x-forwarded-for's first entry is empty", () => {
    const headers = new Headers({
      "x-forwarded-for": ", 70.41.3.18",
      "x-real-ip": "203.0.113.9",
    });
    expect(getClientIp(headers)).toBe("203.0.113.9");
  });

  test("returns null when neither header is present", () => {
    expect(getClientIp(new Headers())).toBeNull();
  });
});

describe("isPrivateOrLoopbackIp", () => {
  test.each(["127.0.0.1", "10.0.0.1", "10.255.255.255", "192.168.1.1", "172.16.0.1", "172.31.255.255"])(
    "returns true for private/loopback IPv4 address %s",
    (ip) => {
      expect(isPrivateOrLoopbackIp(ip)).toBe(true);
    },
  );

  test("returns false for a 172.x address outside the 172.16-31 private range", () => {
    expect(isPrivateOrLoopbackIp("172.32.0.1")).toBe(false);
    expect(isPrivateOrLoopbackIp("172.15.0.1")).toBe(false);
  });

  test.each(["::1", "localhost", "fe80::1", "fd00::1", "fc00::1"])(
    "returns true for loopback/link-local/unique-local address %s",
    (ip) => {
      expect(isPrivateOrLoopbackIp(ip)).toBe(true);
    },
  );

  test("returns true for an IPv4-mapped IPv6 loopback address", () => {
    expect(isPrivateOrLoopbackIp("::ffff:127.0.0.1")).toBe(true);
  });

  test("returns false for a public IPv4 address", () => {
    expect(isPrivateOrLoopbackIp("8.8.8.8")).toBe(false);
    expect(isPrivateOrLoopbackIp("203.0.113.5")).toBe(false);
  });
});
