import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { db } from "@xpersive/db";
import { authConfig } from "./auth.config";

export const { handlers, auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      id: "admin-credentials",
      credentials: {
        email: {},
        password: {},
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        const user = await db.user.findUnique({
          where: { email: credentials.email as string },
        });

        if (!user || !user.password) return null;
        if (!["ADMIN", "SUPER_ADMIN"].includes(user.role)) return null;

        const valid = await bcrypt.compare(
          credentials.password as string,
          user.password,
        );
        if (!valid) return null;

        return {
          id: user.id,
          email: user.email,
          name: user.name ?? null,
          role: user.role,
        };
      },
    }),
    Credentials({
      id: "magic-token",
      credentials: {
        token: {},
      },
      async authorize(credentials) {
        if (!credentials?.token) return null;

        const invite = await db.inviteToken.findUnique({
          where: { token: credentials.token as string },
        });

        if (!invite || invite.usedAt || invite.expiresAt < new Date()) {
          return null;
        }

        let user = await db.user.findUnique({
          where: { email: invite.email },
        });

        if (!user) {
          user = await db.user.create({
            data: { email: invite.email, role: invite.role },
          });
        }

        await db.inviteToken.update({
          where: { token: credentials.token as string },
          data: { usedAt: new Date() },
        });

        return {
          id: user.id,
          email: user.email,
          name: user.name ?? null,
          role: user.role,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role;

        if (user.role === "CLIENT") {
          const clientUser = await db.clientUser.findFirst({
            where: { userId: user.id! },
          });
          token.clientId = clientUser?.clientId ?? null;
        }
      }
      return token;
    },
    session({ session, token }) {
      session.user.id = token.sub ?? "";
      session.user.role = (token.role as string) ?? "";
      session.user.clientId = (token.clientId as string | null) ?? null;
      return session;
    },
  },
});

export type { AuthRole } from "./types";
