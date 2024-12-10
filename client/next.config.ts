import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: "/sign-in",
        destination: "/auth/sign-in"
      }
    ];
  },
  async redirects() {
    return [
      {
        source: "/auth/sign-in",
        destination: "/sign-in",
        permanent: true
      }
    ];
  },
};

export default nextConfig;
