import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Enable Turbopack for development (new format)
  turbopack: {
    resolveAlias: {
      "@": "./src",
    },
  },
  // Quebec Teacher Hub v4 specific config
  reactStrictMode: true,
  typescript: {
    // Type checking during builds
    ignoreBuildErrors: false,
  },
  eslint: {
    // Lint checking during builds
    ignoreDuringBuilds: false,
  },
};

export default nextConfig;
