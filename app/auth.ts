import NextAuth from 'next-auth';
import { authConfig } from './auth.config';
import { prisma } from './src/lib/prisma';

// Main NextAuth configuration
export const { handlers, auth, signIn, signOut } = NextAuth({
  ...authConfig,
  basePath: '/api/auth',
  secret: process.env.NEXTAUTH_SECRET,
  trustHost: true,
  session: {
    strategy: 'jwt', // Using JWT strategy (no database required)
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  callbacks: {
    async signIn({ user, account, profile }) {
      // Create or update user in database on sign-in
      if (user.email) {
        try {
          await prisma.user.upsert({
            where: { email: user.email },
            update: {
              name: user.name,
              image: user.image,
            },
            create: {
              id: user.id,
              email: user.email,
              name: user.name,
              image: user.image,
            },
          });
        } catch (error) {
          console.error('Error creating/updating user in database:', error);
        }
      }
      return true;
    },
    async jwt({ token, user, account }) {
      // Initial sign in
      if (user && user.email) {
        // Query database to get the ACTUAL user ID (not the one from Google)
        // This ensures the ID in the JWT matches the ID in the database
        const dbUser = await prisma.user.findUnique({
          where: { email: user.email },
          select: { id: true }
        });

        token.id = dbUser?.id || user.id;
        token.email = user.email;
        token.name = user.name;
        token.picture = user.image;
      }

      // Add Google access token if available
      if (account?.access_token) {
        token.accessToken = account.access_token;
      }

      return token;
    },
    async session({ session, token }) {
      // Send properties to the client
      if (session.user) {
        session.user.id = token.id as string;
        session.user.email = token.email as string;
        session.user.name = token.name as string;
        session.user.image = token.picture as string;
      }

      return session;
    },
  },
  debug: process.env.NODE_ENV === 'development',
});
