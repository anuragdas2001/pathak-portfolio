import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "s3.amazonaws.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "anuragdas-portfolio.vercel.app",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
