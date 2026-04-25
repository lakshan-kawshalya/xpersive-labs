import { NextResponse } from "next/server";
import { z } from "zod";
import { db } from "@xpersive/db";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

const bodySchema = z.object({
  email: z.string().email(),
});

export async function POST(request: Request) {
  const body = await request.json();
  const parsed = bodySchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid email address" }, { status: 400 });
  }

  const { email } = parsed.data;

  const invite = await db.inviteToken.findFirst({
    where: {
      email,
      usedAt: null,
      expiresAt: { gt: new Date() },
    },
    orderBy: { createdAt: "desc" },
  });

  if (!invite) {
    return NextResponse.json(
      { error: "No active invitation found for this email. Please contact Xpersive Labs." },
      { status: 404 },
    );
  }

  const clientUrl = process.env.NEXT_PUBLIC_CLIENT_URL ?? "http://localhost:3001";
  const magicLink = `${clientUrl}/api/auth/verify?token=${invite.token}`;

  const { error } = await resend.emails.send({
    from: "Xpersive Labs <noreply@xpersivelabs.com>",
    to: email,
    subject: "Your login link for Xpersive Labs Client Portal",
    html: `
      <div style="font-family: 'DM Sans', Arial, sans-serif; max-width: 520px; margin: 0 auto; background: #272848; color: #fff; border-radius: 16px; overflow: hidden;">
        <div style="padding: 40px 40px 32px; border-bottom: 1px solid rgba(255,255,255,0.08);">
          <div style="display: inline-block; width: 48px; height: 48px; border-radius: 12px; background: linear-gradient(135deg, #6D71F9, #54C1FB); text-align: center; line-height: 48px; font-size: 20px; font-weight: 700; color: #fff; margin-bottom: 24px;">X</div>
          <h1 style="margin: 0 0 8px; font-size: 22px; font-weight: 700; color: #fff;">Your login link</h1>
          <p style="margin: 0; color: rgba(255,255,255,0.5); font-size: 15px;">Click the button below to sign in to the Xpersive Labs Client Portal.</p>
        </div>
        <div style="padding: 32px 40px 40px;">
          <a href="${magicLink}" style="display: inline-block; padding: 14px 28px; background: linear-gradient(135deg, #6D71F9, #54C1FB); color: #fff; text-decoration: none; border-radius: 12px; font-weight: 600; font-size: 15px;">Sign In to Portal</a>
          <p style="margin: 24px 0 0; color: rgba(255,255,255,0.35); font-size: 13px;">This link expires in 24 hours and can only be used once. If you didn&apos;t request this, you can safely ignore this email.</p>
        </div>
      </div>
    `,
  });

  if (error) {
    console.error("Resend error:", error);
    return NextResponse.json({ error: "Failed to send email. Please try again." }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
