// next.config.ts
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  // Add other Next.js configurations here
};

// Apply security headers to the Next.js configuration
export default (nextConfig);