import { NextResponse } from "next/server";
import { z } from "zod";
import { db, GlobalRole } from "@xpersive/db";
import { auth } from "@xpersive/auth";
import { Resend } from "resend";
import crypto from "crypto";

const resend = new Resend(process.env.RESEND_API_KEY);

const bodySchema = z.object({
  email: z.string().email(),
  role: z.nativeEnum(GlobalRole).default(GlobalRole.CLIENT),
  clientId: z.string().optional(),
});

export async function POST(request: Request) {
  const session = await auth();

  if (!session || !["ADMIN", "SUPER_ADMIN"].includes(session.user.role)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const parsed = bodySchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }

  const { email, role, clientId } = parsed.data;

  const token = crypto.randomBytes(32).toString("hex");
  const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000);

  const invite = await db.inviteToken.create({
    data: {
      email,
      token,
      role,
      clientId: clientId ?? null,
      expiresAt,
    },
  });

  const clientUrl = process.env.NEXT_PUBLIC_CLIENT_URL ?? "http://localhost:3001";
  const magicLink = `${clientUrl}/api/auth/verify?token=${invite.token}`;

  const { error } = await resend.emails.send({
    from: "Xpersive Labs <noreply@xpersivelabs.com>",
    to: email,
    subject: "You've been invited to Xpersive Labs Client Portal",
    html: `
      <div style="font-family: 'DM Sans', Arial, sans-serif; max-width: 520px; margin: 0 auto; background: #272848; color: #fff; border-radius: 16px; overflow: hidden;">
        <div style="padding: 40px 40px 32px; border-bottom: 1px solid rgba(255,255,255,0.08);">
          <div style="display: inline-block; width: 48px; height: 48px; border-radius: 12px; background: linear-gradient(135deg, #6D71F9, #54C1FB); text-align: center; line-height: 48px; font-size: 20px; font-weight: 700; color: #fff; margin-bottom: 24px;">X</div>
          <h1 style="margin: 0 0 8px; font-size: 22px; font-weight: 700; color: #fff;">You&apos;re invited!</h1>
          <p style="margin: 0; color: rgba(255,255,255,0.5); font-size: 15px;">You&apos;ve been invited to access the <strong style="color: #fff;">Xpersive Labs Client Portal</strong> — your dedicated space to track project progress, milestones, and deliverables.</p>
        </div>
        <div style="padding: 32px 40px 40px;">
          <a href="${magicLink}" style="display: inline-block; padding: 14px 28px; background: linear-gradient(135deg, #6D71F9, #54C1FB); color: #fff; text-decoration: none; border-radius: 12px; font-weight: 600; font-size: 15px;">Accept Invitation</a>
          <p style="margin: 24px 0 0; color: rgba(255,255,255,0.35); font-size: 13px;">This invitation expires in 24 hours. If you didn&apos;t expect this email, you can safely ignore it.</p>
        </div>
      </div>
    `,
  });

  if (error) {
    console.error("Resend error:", error);
    await db.inviteToken.delete({ where: { id: invite.id } });
    return NextResponse.json({ error: "Failed to send invitation email." }, { status: 500 });
  }

  return NextResponse.json({ ok: true, inviteId: invite.id });
}
