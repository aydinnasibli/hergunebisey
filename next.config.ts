// next.config.ts
import type { NextConfig } from 'next';
import { withSecurityHeaders } from './security-headers';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    // Use remotePatterns instead of domains (domains is deprecated)
    remotePatterns: [

      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
        port: '',
        pathname: '/images/**',
      },
    ],

  },
};

export default withSecurityHeaders(nextConfig);