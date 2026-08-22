import type { Metadata } from "next";
import { JsonLd } from "@/components/seo/JsonLd";

export const metadata: Metadata = {
  title: "Services — Web Development, Automation & AI Workflows",
  description:
    "Four focused services: custom web applications, ecommerce development, automation pipelines, and AI workflow integration. Built end-to-end for businesses in AU, UK, and US.",
  alternates: { canonical: "https://www.xpersivelabs.com/services" },
  openGraph: {
    type: "website",
    url: "https://www.xpersivelabs.com/services",
    title: "Services — Web Development, Automation & AI Workflows",
    description:
      "Four focused services: custom web applications, ecommerce development, automation pipelines, and AI workflow integration. Built end-to-end for businesses in AU, UK, and US.",
  },
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
          "Custom web applications and dashboards for businesses using Next.js and TypeScript.",
        provider: { "@type": "Organization", name: "Xpersive Labs" },
        areaServed: "Worldwide",
      },
    },
    {
      "@type": "ListItem",
      position: 2,
      item: {
        "@type": "Service",
        name: "Managed Data Pipelines",
        description:
          "Scraping pipeline retainer for businesses that need reliable, structured data. Recurring delivery with a 48-hour fix guarantee.",
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
          "Custom scraping tools and data automation for businesses that need reliable data at scale. Built with Python, Playwright, and residential proxies.",
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
