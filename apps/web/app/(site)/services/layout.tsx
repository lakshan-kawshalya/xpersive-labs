import type { Metadata } from "next";
import { JsonLd } from "@/components/seo/JsonLd";

export const metadata: Metadata = {
  title: "E-Commerce Tools, Web Development and UI Design",
  description:
    "Custom Alibaba supplier intelligence tools, FBA product research automation, white-label web development, and UI/UX design for e-commerce businesses and digital agencies.",
  alternates: { canonical: "https://www.xpersivelabs.com/services" },
  openGraph: { type: "website", url: "https://www.xpersivelabs.com/services" },
};

const servicesSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Xpersive Labs Services",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      item: {
        "@type": "Service",
        name: "Web Development",
        description:
          "Custom web applications and dashboards for e-commerce sellers, importers, and digital agencies using Next.js and TypeScript.",
        provider: { "@type": "Organization", name: "Xpersive Labs" },
        areaServed: "Worldwide",
      },
    },
    {
      "@type": "ListItem",
      position: 2,
      item: {
        "@type": "Service",
        name: "UI/UX Design",
        description:
          "User interface and experience design for e-commerce dashboards, supplier tools, and white-label platforms using Figma and design systems.",
        provider: { "@type": "Organization", name: "Xpersive Labs" },
        areaServed: "Worldwide",
      },
    },
    {
      "@type": "ListItem",
      position: 3,
      item: {
        "@type": "Service",
        name: "Automation and Web Scraping",
        description:
          "Custom Alibaba supplier intelligence tools, FBA product research automation, and data extraction solutions using Python and Playwright.",
        provider: { "@type": "Organization", name: "Xpersive Labs" },
        areaServed: "Worldwide",
      },
    },
  ],
};

export default function ServicesLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <JsonLd data={servicesSchema} />
      {children}
    </>
  );
}
