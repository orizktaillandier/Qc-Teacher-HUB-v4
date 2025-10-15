import { handlers } from '../../../../../auth';

// Force Node.js runtime (not Edge) for better compatibility
export const runtime = 'nodejs';

// Export NextAuth v5 handlers for App Router
export const { GET, POST } = handlers;
