import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "i.imghippo.com",
        pathname: "/files/**", // Allow all images under /files/
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com", // This will allow all images from unsplash.com
      },
      {
        protocol: "https",
        hostname: 'cdn.sanity.io',
      }
    ],
  },
};

export default nextConfig;
