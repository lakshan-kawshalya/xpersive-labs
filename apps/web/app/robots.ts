import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/keystatic/",
          "/api/",
          "/_next/",
        ],
      },
    ],
    sitemap: "https://www.xpersivelabs.com/sitemap.xml",
    host: "https://www.xpersivelabs.com",
  };
}
