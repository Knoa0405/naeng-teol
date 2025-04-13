import NextAuth from "next-auth";
import authConfig from "./auth.config";

import { PrismaAdapter } from "@auth/prisma-adapter";

import prisma from "@/db";

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: "jwt",
  },
  callbacks: {
    session({ session, token }) {
      const id = token.sub;

      if (id) {
        session.user.id = id;
      }

      return session;
    },
  },
  ...authConfig,
});
