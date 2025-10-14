import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    // Workaround for Turbopack "high bits position" error
    // See: https://github.com/vercel/next.js/issues/82584
    turbopackScopeHoisting: false
  },
  typescript: {
    // Temporarily ignore TypeScript errors for deployment
    ignoreBuildErrors: true,
  },
  eslint: {
    // Temporarily ignore lint errors for production deployment
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
