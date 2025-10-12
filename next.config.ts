import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'i.postimg.cc'
      },
      {
        protocol: 'https',
        hostname: 'wolfey.s-ul.eu'
      }
    ],
    minimumCacheTTL: 2678400,
  }
};

export default nextConfig;
