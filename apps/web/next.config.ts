import type { NextConfig } from "next";

// script-src keeps 'unsafe-inline' (nonce/hash-based CSP would force every page into
// dynamic rendering — this app is otherwise fully static/SSG — so that's a deliberate
// trade-off) but drops 'unsafe-eval', which isn't needed by any dependency here.
const CSP = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline' https://va.vercel-scripts.com https://vitals.vercel-insights.com https://challenges.cloudflare.com",
  "style-src 'self' 'unsafe-inline'",
  "font-src 'self' data:",
  "img-src 'self' data: blob:",
  "connect-src 'self' https://api.emailjs.com https://vitals.vercel-insights.com https://va.vercel-scripts.com https://*.lottiefiles.com https://challenges.cloudflare.com",
  "frame-src https://challenges.cloudflare.com",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
].join("; ");

const securityHeaders = [
  { key: "X-Frame-Options", value: "DENY" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
  { key: "Content-Security-Policy", value: CSP },
];

const nextConfig: NextConfig = {
  reactStrictMode: true,
  transpilePackages: ["@keystatic/core", "@keystatic/next"],

  async headers() {
    return [
      {
        source: "/(.*)",
        headers: securityHeaders,
      },
    ];
  },

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
