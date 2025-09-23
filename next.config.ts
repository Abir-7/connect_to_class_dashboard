import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  allowedDevOrigins: [
    "http://192.168.50.161:3000",
    "https://01t71ck4-3000.inc1.devtunnels.ms",
  ],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "static.vecteezy.com",
      },
      {
        protocol: "https",
        hostname: "01t71ck4-4012.inc1.devtunnels.ms",
      },
    ],
    // Or if you prefer domains (simpler):
    // domains: ["static.vecteezy.com"],
  },
};

export default nextConfig;
