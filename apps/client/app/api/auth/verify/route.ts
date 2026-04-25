import { NextResponse } from "next/server";
import { signIn } from "@xpersive/auth";
import { db } from "@xpersive/db";
import { AuthError } from "next-auth";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const token = searchParams.get("token");

  if (!token) {
    return NextResponse.redirect(new URL("/login?error=missing_token", request.url));
  }

  const invite = await db.inviteToken.findUnique({ where: { token } });
  if (!invite || invite.usedAt || invite.expiresAt < new Date()) {
    return NextResponse.redirect(new URL("/login?error=invalid_token", request.url));
  }

  try {
    await signIn("magic-token", { token, redirectTo: "/dashboard" });
  } catch (error) {
    if (error instanceof AuthError) {
      return NextResponse.redirect(new URL("/login?error=auth_failed", request.url));
    }
    throw error;
  }
}
