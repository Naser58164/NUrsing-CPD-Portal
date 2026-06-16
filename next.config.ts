import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  turbopack: {
    root: "/home/user/NUrsing-CPD-Portal",
  },
};

export default nextConfig;
