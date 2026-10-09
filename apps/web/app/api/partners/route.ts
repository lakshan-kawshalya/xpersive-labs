import { NextResponse, type NextRequest } from "next/server";
import { getClientIp } from "@/lib/geo/ip";
import { isTrustedOrigin } from "@/lib/isTrustedOrigin";
import { PARTNER_FORM_OPTIONS } from "@/lib/partnerContent";
import { partnerSchema } from "@/lib/partnerSchema";
import { createRateLimiter } from "@/lib/rateLimit";
import { stripHtml } from "@/lib/stripHtml";
import { verifyTurnstileToken } from "@/lib/turnstile";

const EMAILJS_SEND_URL = "https://api.emailjs.com/api/v1.0/email/send";
const EMAILJS_TIMEOUT_MS = 10000;
const MAX_REQUESTS_PER_WINDOW = 5;
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const UNKNOWN_IP_KEY = "unknown";

const rateLimiter = createRateLimiter(MAX_REQUESTS_PER_WINDOW, RATE_LIMIT_WINDOW_MS);

const OPTION_LABELS: Record<string, string> = Object.fromEntries(
  PARTNER_FORM_OPTIONS.map(({ value, label }) => [value, label]),
);

export async function POST(request: NextRequest) {
  if (!isTrustedOrigin(request.headers)) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const clientIp = getClientIp(request.headers) ?? undefined;
  if (!rateLimiter.isAllowed(clientIp ?? UNKNOWN_IP_KEY)) {
    return NextResponse.json({ error: "Too many requests" }, { status: 429 });
  }

  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  const parsed = partnerSchema.safeParse(payload);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid input" }, { status: 400 });
  }

  const { turnstileToken, website, ...fields } = parsed.data;

  // A filled honeypot means a bot. Answer exactly like a success so it learns nothing.
  if (website) {
    return NextResponse.json({ success: true });
  }

  const isHuman = await verifyTurnstileToken(turnstileToken, clientIp);
  if (!isHuman) {
    return NextResponse.json({ error: "Verification failed" }, { status: 403 });
  }

  const serviceId = process.env.EMAILJS_SERVICE_ID;
  const templateId = process.env.EMAILJS_TEMPLATE_ID;
  const publicKey = process.env.EMAILJS_PUBLIC_KEY;

  if (!serviceId || !templateId || !publicKey) {
    return NextResponse.json({ error: "Form is not configured" }, { status: 503 });
  }

  // The shared EmailJS template only has name, email, company, service, budget and
  // message slots, so the partner-specific fields travel inside the message body.
  const message = [
    "Partner program interest",
    `Option: ${OPTION_LABELS[fields.option]}`,
    `Phone/WhatsApp: ${stripHtml(fields.phone)}`,
    "Consent to be contacted about the partner program: yes",
    "",
    stripHtml(fields.message) || "(no message)",
  ].join("\n");

  try {
    const emailResponse = await fetch(EMAILJS_SEND_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        service_id: serviceId,
        template_id: templateId,
        user_id: publicKey,
        template_params: {
          from_name: stripHtml(fields.name),
          from_email: fields.email,
          company: stripHtml(fields.business),
          service: "Partner program",
          budget: "-",
          message,
        },
      }),
      signal: AbortSignal.timeout(EMAILJS_TIMEOUT_MS),
    });

    if (!emailResponse.ok) {
      return NextResponse.json({ error: "Failed to send" }, { status: 502 });
    }
  } catch {
    return NextResponse.json({ error: "Failed to send" }, { status: 502 });
  }

  return NextResponse.json({ success: true });
}
