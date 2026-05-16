import type { Metadata } from "next";
import { JsonLd } from "@/components/seo/JsonLd";

export const metadata: Metadata = {
  title: "Services - Web Development, UI/UX Design & Automation",
  description:
    "Xpersive Labs offers professional web development with Next.js, UI/UX design with Figma, and custom automation & web scraping solutions for businesses worldwide.",
  alternates: { canonical: "https://www.xpersivelabs.com/services" },
  openGraph: { url: "https://www.xpersivelabs.com/services" },
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
          "Full-stack web application development with Next.js, TypeScript, and React.",
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
          "User interface and user experience design using Figma and design systems.",
        provider: { "@type": "Organization", name: "Xpersive Labs" },
        areaServed: "Worldwide",
      },
    },
    {
      "@type": "ListItem",
      position: 3,
      item: {
        "@type": "Service",
        name: "Automation & Web Scraping",
        description:
          "Custom automation tools and data extraction solutions using Python.",
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
