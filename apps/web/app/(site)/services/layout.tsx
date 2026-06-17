import type { Metadata } from "next";
import { JsonLd } from "@/components/seo/JsonLd";

export const metadata: Metadata = {
  title: "Services — White-Label Scraping Pipelines for Agencies",
  description:
    "Xpersive Labs builds white-label scraping pipelines, custom data tools, and web applications for SEO and digital marketing agencies in AU, UK, and US.",
  alternates: { canonical: "https://www.xpersivelabs.com/services" },
  openGraph: {
    type: "website",
    url: "https://www.xpersivelabs.com/services",
    title: "Services — White-Label Scraping Pipelines for Agencies",
    description:
      "White-label scraping pipelines, custom data tools, and web applications for SEO and digital marketing agencies.",
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
          "Custom web applications and dashboards for SEO and digital marketing agencies using Next.js and TypeScript.",
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
          "White-label scraping pipeline retainer for SEO and digital marketing agencies. Recurring data delivery with a 48-hour fix guarantee.",
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
          "Custom scraping tools and data automation for SEO and digital marketing agencies. Built with Python, Playwright, and residential proxies.",
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
