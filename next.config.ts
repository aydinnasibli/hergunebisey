// next.config.ts
import type { NextConfig } from 'next';
import { withSecurityHeaders } from './security-headers';

const nextConfig: NextConfig = {
  reactStrictMode: true,
};

// Apply security headers to the Next.js configuration
export default withSecurityHeaders(nextConfig);