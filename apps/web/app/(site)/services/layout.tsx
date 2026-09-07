import type { Metadata } from "next";
import { JsonLd } from "@/components/seo/JsonLd";

export const metadata: Metadata = {
  title: "Services — Website, Mobile, Software, Automation & UI/UX",
  description:
    "Five focused services: website development, mobile applications, custom software, automation, and UI/UX design. Built end-to-end, no handoffs.",
  alternates: { canonical: "https://www.xpersivelabs.com/services" },
  openGraph: {
    type: "website",
    url: "https://www.xpersivelabs.com/services",
    title: "Services — Website, Mobile, Software, Automation & UI/UX",
    description:
      "Five focused services: website development, mobile applications, custom software, automation, and UI/UX design. Built end-to-end, no handoffs.",
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
        name: "Website Development",
        description:
          "Fast, modern websites built with Next.js and TypeScript, optimized for search and speed.",
        provider: { "@type": "Organization", name: "Xpersive Labs" },
        areaServed: "Worldwide",
      },
    },
    {
      "@type": "ListItem",
      position: 2,
      item: {
        "@type": "Service",
        name: "Mobile Application Development",
        description:
          "iOS and Android apps built with React Native and Expo, from a single codebase.",
        provider: { "@type": "Organization", name: "Xpersive Labs" },
        areaServed: "Worldwide",
      },
    },
    {
      "@type": "ListItem",
      position: 3,
      item: {
        "@type": "Service",
        name: "Software Development",
        description:
          "Custom software, SaaS dashboards, and client portals built with Next.js and TypeScript.",
        provider: { "@type": "Organization", name: "Xpersive Labs" },
        areaServed: "Worldwide",
      },
    },
    {
      "@type": "ListItem",
      position: 4,
      item: {
        "@type": "Service",
        name: "Automation Development",
        description:
          "Custom scraping tools and data automation for businesses that need reliable data at scale. Built with Python, Playwright, and residential proxies.",
        provider: { "@type": "Organization", name: "Xpersive Labs" },
        areaServed: "Worldwide",
      },
    },
    {
      "@type": "ListItem",
      position: 5,
      item: {
        "@type": "Service",
        name: "UI/UX Development",
        description:
          "Interface and design system work, from wireframes to developer-ready, accessible prototypes.",
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
