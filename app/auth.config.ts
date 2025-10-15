import type { NextAuthConfig } from 'next-auth';
import Google from 'next-auth/providers/google';

// Edge-compatible auth configuration
// This file is separate from auth.ts to support middleware (Edge runtime)
export const authConfig = {
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code"
        }
      },
      // Disable PKCE completely for Vercel
      checks: ['none']
    }),
  ],
  pages: {
    signIn: '/',  // Redirect to homepage for sign-in
  },
  // Experimental: Skip PKCE verification
  skipCSRFCheck: false,
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnLanding = nextUrl.pathname === '/';

      // List of public paths (only landing page and auth routes)
      const publicPaths = ['/'];
      const isPublicPath = publicPaths.includes(nextUrl.pathname);

      // If user is logged in and tries to access landing page, redirect to /home
      if (isLoggedIn && isOnLanding) {
        return Response.redirect(new URL('/home', nextUrl));
      }

      // If user is not logged in and tries to access protected pages, redirect to landing
      if (!isLoggedIn && !isPublicPath) {
        return false; // This triggers redirect to signIn page (/)
      }

      // Allow access
      return true;
    },
  },
} satisfies NextAuthConfig;
