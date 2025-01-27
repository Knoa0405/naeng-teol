import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import { PrismaAdapter } from "@auth/prisma-adapter";
import prisma from "@/db";

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [Google],
  callbacks: {
    jwt({ token, user }) {
      console.log(token, user);
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    session({ session }) {
      return session;
    },
  },
});
