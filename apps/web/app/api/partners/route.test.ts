import { NextRequest } from "next/server";
import { afterEach, beforeEach, describe, expect, test, vi } from "vitest";

const { verifyTurnstileToken } = vi.hoisted(() => ({
  verifyTurnstileToken: vi.fn(),
}));

vi.mock("@/lib/turnstile", () => ({ verifyTurnstileToken }));

import { POST } from "./route";

const VALID_BODY = {
  name: "Alex Morgan",
  business: "Acme Studio",
  email: "alex@example.com",
  phone: "+94 77 123 4567",
  option: "referral",
  message: "Interested in the referral option.",
  consent: true,
  website: "",
  turnstileToken: "a-valid-looking-token",
};

let ipCounter = 0;

function makeRequest(body: unknown, headers: Record<string, string> = {}) {
  return new NextRequest("https://xpersivelabs.com/api/partners", {
    method: "POST",
    headers: {
      "content-type": "application/json",
      origin: "https://xpersivelabs.com",
      host: "xpersivelabs.com",
      "x-forwarded-for": `203.0.113.${ipCounter}`,
      ...headers,
    },
    body: JSON.stringify(body),
  });
}

function stubEmailEnv() {
  vi.stubEnv("EMAILJS_SERVICE_ID", "service");
  vi.stubEnv("EMAILJS_TEMPLATE_ID", "template");
  vi.stubEnv("EMAILJS_PUBLIC_KEY", "key");
}

describe("POST /api/partners", () => {
  beforeEach(() => {
    // A fresh IP per test keeps the in-memory rate limiter from leaking between tests.
    ipCounter += 1;
  });

  afterEach(() => {
    vi.clearAllMocks();
    vi.unstubAllEnvs();
    vi.unstubAllGlobals();
  });

  test("rejects a cross-site Origin", async () => {
    const response = await POST(makeRequest(VALID_BODY, { origin: "https://evil.example.com" }));

    expect(response.status).toBe(403);
    expect(verifyTurnstileToken).not.toHaveBeenCalled();
  });

  test("rejects an invalid email", async () => {
    const response = await POST(makeRequest({ ...VALID_BODY, email: "nope" }));

    expect(response.status).toBe(400);
  });

  test("rejects a missing consent", async () => {
    const response = await POST(makeRequest({ ...VALID_BODY, consent: false }));

    expect(response.status).toBe(400);
  });

  test("rejects an unknown option", async () => {
    const response = await POST(makeRequest({ ...VALID_BODY, option: "something-else" }));

    expect(response.status).toBe(400);
  });

  test("rejects newlines in single-line fields", async () => {
    const response = await POST(makeRequest({ ...VALID_BODY, name: "Alex\nBcc: x@example.com" }));

    expect(response.status).toBe(400);
  });

  test("rejects an over-long message", async () => {
    const response = await POST(makeRequest({ ...VALID_BODY, message: "a".repeat(2001) }));

    expect(response.status).toBe(400);
  });

  test("silently succeeds without sending when the honeypot is filled", async () => {
    const fetchMock = vi.fn();
    vi.stubGlobal("fetch", fetchMock);

    const response = await POST(makeRequest({ ...VALID_BODY, website: "https://spam.example.com" }));

    expect(response.status).toBe(200);
    expect(await response.json()).toEqual({ success: true });
    expect(verifyTurnstileToken).not.toHaveBeenCalled();
    expect(fetchMock).not.toHaveBeenCalled();
  });

  test("rejects when Turnstile verification fails", async () => {
    verifyTurnstileToken.mockResolvedValue(false);

    const response = await POST(makeRequest(VALID_BODY));

    expect(response.status).toBe(403);
  });

  test("returns 503 when email is not configured", async () => {
    verifyTurnstileToken.mockResolvedValue(true);
    vi.stubEnv("EMAILJS_SERVICE_ID", "");

    const response = await POST(makeRequest(VALID_BODY));

    expect(response.status).toBe(503);
  });

  test("sends a notification with the partner details and never echoes input back", async () => {
    verifyTurnstileToken.mockResolvedValue(true);
    stubEmailEnv();
    const fetchMock = vi.fn().mockResolvedValue({ ok: true });
    vi.stubGlobal("fetch", fetchMock);

    const response = await POST(makeRequest({ ...VALID_BODY, message: "<b>Hello</b> there" }));

    expect(response.status).toBe(200);
    expect(await response.json()).toEqual({ success: true });

    const sent = JSON.parse(fetchMock.mock.calls[0][1].body);
    expect(sent.template_params.company).toBe("Acme Studio");
    expect(sent.template_params.message).toContain("Option: Referral");
    expect(sent.template_params.message).toContain("Phone/WhatsApp: +94 77 123 4567");
    expect(sent.template_params.message).toContain("Hello there");
    expect(sent.template_params.message).not.toContain("<b>");
  });

  test("returns a generic error when the email provider fails", async () => {
    verifyTurnstileToken.mockResolvedValue(true);
    stubEmailEnv();
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue({ ok: false }));

    const response = await POST(makeRequest(VALID_BODY));

    expect(response.status).toBe(502);
    expect(await response.json()).toEqual({ error: "Failed to send" });
  });

  test("rate limits repeated requests from the same IP", async () => {
    const sameIp = { "x-forwarded-for": "198.51.100.77" };
    const invalid = { ...VALID_BODY, email: "nope" };

    const statuses: number[] = [];
    for (let attempt = 0; attempt < 6; attempt += 1) {
      statuses.push((await POST(makeRequest(invalid, sameIp))).status);
    }

    expect(statuses.slice(0, 5)).toEqual([400, 400, 400, 400, 400]);
    expect(statuses[5]).toBe(429);
  });
});
