import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ["@keystatic/core", "@keystatic/next"],
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "xpersivelabs.com" }],
        destination: "https://www.xpersivelabs.com/:path*",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
