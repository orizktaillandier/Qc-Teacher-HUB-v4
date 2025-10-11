import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    // Workaround for Turbopack "high bits position" error
    // See: https://github.com/vercel/next.js/issues/82584
    turbopackScopeHoisting: false
  }
};

export default nextConfig;
