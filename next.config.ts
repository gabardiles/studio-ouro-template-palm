/**
 * Next.js configuration.
 *
 * Add options here as the project grows, e.g.:
 * - images.domains for external image hostnames
 * - redirects / rewrites for URL changes
 * - env for build-time environment variables
 * See: https://nextjs.org/docs/app/api-reference/config/next-config-js
 */

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
};

export default nextConfig;
