// next.config.js
const { withSecurityHeaders } = require('./security-headers');

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  // Add CORS headers for beehiiv.com
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Access-Control-Allow-Origin',
            value: 'https://embeds.beehiiv.com',
          },
          {
            key: 'Access-Control-Allow-Methods',
            value: 'GET, POST, OPTIONS',
          },
          {
            key: 'Access-Control-Allow-Headers',
            value: 'X-Requested-With, Content-Type, Accept',
          },
          {
            key: 'Access-Control-Allow-Credentials',
            value: 'true',
          },
        ],
      },
    ];
  },

  // Add your other Next.js config options here
};

// Apply security headers
module.exports = withSecurityHeaders(nextConfig);