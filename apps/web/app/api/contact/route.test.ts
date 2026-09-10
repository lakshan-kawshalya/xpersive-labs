import { NextRequest } from "next/server";
import { afterEach, describe, expect, test, vi } from "vitest";

const { verifyTurnstileToken } = vi.hoisted(() => ({
  verifyTurnstileToken: vi.fn(),
}));

vi.mock("@/lib/turnstile", () => ({ verifyTurnstileToken }));

import { POST } from "./route";

const VALID_BODY = {
  name: "Alex Morgan",
  email: "alex@example.com",
  company: "Acme Studio",
  service: "Website Development",
  budget: "Under $5,000",
  message: "This message is definitely longer than twenty characters.",
  turnstileToken: "a-valid-looking-token",
};

function makeRequest(body: unknown, headers: Record<string, string> = {}) {
  return new NextRequest("https://xpersivelabs.com/api/contact", {
    method: "POST",
    headers: { "content-type": "application/json", origin: "https://xpersivelabs.com", host: "xpersivelabs.com", ...headers },
    body: JSON.stringify(body),
  });
}

describe("POST /api/contact", () => {
  afterEach(() => {
    vi.clearAllMocks();
    vi.unstubAllEnvs();
    vi.unstubAllGlobals();
  });

  test("rejects a request with no Origin header", async () => {
    const request = makeRequest(VALID_BODY, { origin: "" });
    const response = await POST(request);

    expect(response.status).toBe(403);
  });

  test("rejects a cross-site Origin", async () => {
    const request = makeRequest(VALID_BODY, { origin: "https://evil.attacker.com" });
    const response = await POST(request);

    expect(response.status).toBe(403);
    expect(verifyTurnstileToken).not.toHaveBeenCalled();
  });

  test("rejects an invalid body", async () => {
    const request = makeRequest({ ...VALID_BODY, email: "not-an-email" });
    const response = await POST(request);

    expect(response.status).toBe(400);
  });

  test("rejects a message that's too short", async () => {
    const request = makeRequest({ ...VALID_BODY, message: "too short" });
    const response = await POST(request);

    expect(response.status).toBe(400);
  });

  test("rejects when Turnstile verification fails", async () => {
    verifyTurnstileToken.mockResolvedValue(false);
    const request = makeRequest(VALID_BODY);
    const response = await POST(request);

    expect(response.status).toBe(403);
  });

  test("returns 503 when EmailJS env vars aren't configured", async () => {
    verifyTurnstileToken.mockResolvedValue(true);
    const request = makeRequest(VALID_BODY);
    const response = await POST(request);

    expect(response.status).toBe(503);
  });

  test("sends the email and returns success once verified", async () => {
    verifyTurnstileToken.mockResolvedValue(true);
    vi.stubEnv("EMAILJS_SERVICE_ID", "service_1");
    vi.stubEnv("EMAILJS_TEMPLATE_ID", "template_1");
    vi.stubEnv("EMAILJS_PUBLIC_KEY", "public_1");

    const fetchSpy = vi.fn().mockResolvedValue(new Response("OK", { status: 200 }));
    vi.stubGlobal("fetch", fetchSpy);

    const request = makeRequest(VALID_BODY);
    const response = await POST(request);
    const body = await response.json();

    expect(response.status).toBe(200);
    expect(body).toEqual({ success: true });
    expect(fetchSpy).toHaveBeenCalledWith(
      "https://api.emailjs.com/api/v1.0/email/send",
      expect.objectContaining({ method: "POST" }),
    );
  });

  test("strips HTML from free-text fields before sending", async () => {
    verifyTurnstileToken.mockResolvedValue(true);
    vi.stubEnv("EMAILJS_SERVICE_ID", "service_1");
    vi.stubEnv("EMAILJS_TEMPLATE_ID", "template_1");
    vi.stubEnv("EMAILJS_PUBLIC_KEY", "public_1");

    const fetchSpy = vi.fn().mockResolvedValue(new Response("OK", { status: 200 }));
    vi.stubGlobal("fetch", fetchSpy);

    const request = makeRequest({
      ...VALID_BODY,
      name: "<script>alert(1)</script>Alex",
      message: "Hello <b>world</b> this message is long enough to pass validation.",
    });
    await POST(request);

    const [, init] = fetchSpy.mock.calls[0];
    const sentBody = JSON.parse(init.body);

    expect(sentBody.template_params.from_name).toBe("alert(1)Alex");
    expect(sentBody.template_params.message).not.toContain("<b>");
  });

  test("returns 502 when the EmailJS request fails", async () => {
    verifyTurnstileToken.mockResolvedValue(true);
    vi.stubEnv("EMAILJS_SERVICE_ID", "service_1");
    vi.stubEnv("EMAILJS_TEMPLATE_ID", "template_1");
    vi.stubEnv("EMAILJS_PUBLIC_KEY", "public_1");
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue(new Response("", { status: 500 })));

    const request = makeRequest(VALID_BODY);
    const response = await POST(request);

    expect(response.status).toBe(502);
  });
});
