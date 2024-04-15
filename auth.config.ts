import type { NextAuthConfig } from "next-auth";

export const authConfig = {
  pages: {
    signIn: "/login",
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnCourse = nextUrl.pathname.startsWith("/course");
      const isOnProfile = nextUrl.pathname.startsWith("/profile");
      const isOnLoginPage = nextUrl.pathname.startsWith("/login");

      if (isOnCourse || isOnProfile) {
        if (isLoggedIn) return true;
        return false; // Redirect unauthenticated users to login page
      } else if (isOnLoginPage && isLoggedIn) {
        return Response.redirect(new URL("/", nextUrl));
      } else if (isLoggedIn) {
        return Response.redirect(new URL("/", nextUrl));
      }
      return true;
    },
  },
  providers: [], // Add providers with an empty array for now
} satisfies NextAuthConfig;
