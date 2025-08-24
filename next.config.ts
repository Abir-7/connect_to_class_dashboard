import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  allowedDevOrigins: ["http://192.168.50.161:3000"],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "static.vecteezy.com",
      },
    ],
    // Or if you prefer domains (simpler):
    // domains: ["static.vecteezy.com"],
  },
};

export default nextConfig;
