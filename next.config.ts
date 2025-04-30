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
      },
      {
        protocol: "https",
        hostname: "images.pexels.com", // This will allow all images from pexels.com
      }
    ],
  },
};

export default nextConfig;
