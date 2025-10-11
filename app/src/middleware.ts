import NextAuth from 'next-auth';
import { authConfig } from '../auth.config';

// Initialize NextAuth with auth config for middleware
export default NextAuth(authConfig).auth;

// Protect specific routes
export const config = {
  // Matcher ignores paths like _next, api (except auth), static files
  matcher: ['/((?!api/auth|_next/static|_next/image|favicon.ico|.*\\..*).*)'],
};
