import NextAuth, { DefaultSession } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { z } from "zod";
import { fetchUserByEmail, fetchUserById } from "./app/server/queries";
import { postgresDB } from "./app/server/db/postgresDB";

import { DrizzleAdapter } from "@auth/drizzle-adapter";

declare module "next-auth" {
  /**
   * Returned by `auth`, `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: {
      /** The user's postal address. */
      role: string;
      /**
       * By default, TypeScript merges new interface properties and overwrites existing ones.
       * In this case, the default session user properties will be overwritten,
       * with the new ones defined above. To keep the default session user properties,
       * you need to add them back into the newly declared interface.
       */
    } & DefaultSession["user"];
  }
}

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: DrizzleAdapter(postgresDB),
  session: {
    strategy: "jwt",
  },
  providers: [
    Credentials({
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      credentials: {
        email: {},
        password: {},
      },
      async authorize(credentials) {
        const parsedCredentials = z
          .object({ email: z.string().email(), password: z.string() })
          .safeParse(credentials);
        if (parsedCredentials.success) {
          let user = null;
          const { email, password } = parsedCredentials.data;
          user = await fetchUserByEmail(email);
          if (!user) return null;
          const passwordsMatch = await bcrypt.compare(password, user.password);
          if (passwordsMatch) return user;
        }
        return null;
      },
    }),
  ],
  callbacks: {
    async session({ session, token }) {
      if (session.user && token.sub) {
        session.user.id = token.sub;
      }
      if (token.role && session.user) {
        session.user.role = token.role as "admin" | "user";
      }
      return session;
    },
    async jwt({ token, user }) {
      if (!token.sub) return token;

      const currentUser = await fetchUserById(token.sub);
      if (!currentUser) return token;

      token.role = currentUser.role;

      return token;
    },
  },
  pages: {
    signIn: "/login",
  },
});
