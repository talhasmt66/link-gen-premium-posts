
import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import prisma from "./prisma";

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async session({ session, token }) {
      if (token.sub && session.user) {
        session.user.id = token.sub;
        
        // Get user data from database to include role and postCount
        const user = await prisma.user.findUnique({
          where: { id: token.sub },
          select: { role: true, postCount: true },
        });
        
        if (user) {
          session.user.role = user.role;
          session.user.postCount = user.postCount;
        }
      }
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
};
