import { NextResponse, type NextRequest } from "next/server";
import { contactSchema } from "@/lib/contactSchema";
import { getClientIp } from "@/lib/geo/ip";
import { stripHtml } from "@/lib/stripHtml";
import { verifyTurnstileToken } from "@/lib/turnstile";

const EMAILJS_SEND_URL = "https://api.emailjs.com/api/v1.0/email/send";
const EMAILJS_TIMEOUT_MS = 10000;

// API routes get no built-in CSRF protection (unlike Server Actions), so this is
// verified manually: a cross-site request won't have a matching Origin/Host pair.
function isTrustedOrigin(request: NextRequest): boolean {
  const origin = request.headers.get("origin");
  const host = request.headers.get("host");
  if (!origin || !host) return false;

  try {
    return new URL(origin).host === host;
  } catch {
    return false;
  }
}

export async function POST(request: NextRequest) {
  if (!isTrustedOrigin(request)) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  const parsed = contactSchema.safeParse(payload);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid input" }, { status: 400 });
  }

  const { turnstileToken, ...fields } = parsed.data;
  const clientIp = getClientIp(request.headers) ?? undefined;

  const isHuman = await verifyTurnstileToken(turnstileToken, clientIp);
  if (!isHuman) {
    return NextResponse.json({ error: "Verification failed" }, { status: 403 });
  }

  const serviceId = process.env.EMAILJS_SERVICE_ID;
  const templateId = process.env.EMAILJS_TEMPLATE_ID;
  const publicKey = process.env.EMAILJS_PUBLIC_KEY;

  if (!serviceId || !templateId || !publicKey) {
    return NextResponse.json({ error: "Contact form is not configured" }, { status: 503 });
  }

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
          company: stripHtml(fields.company) || "-",
          service: fields.service,
          budget: fields.budget || "Not specified",
          message: stripHtml(fields.message),
        },
      }),
      signal: AbortSignal.timeout(EMAILJS_TIMEOUT_MS),
    });

    if (!emailResponse.ok) {
      return NextResponse.json({ error: "Failed to send message" }, { status: 502 });
    }
  } catch {
    return NextResponse.json({ error: "Failed to send message" }, { status: 502 });
  }

  return NextResponse.json({ success: true });
}
