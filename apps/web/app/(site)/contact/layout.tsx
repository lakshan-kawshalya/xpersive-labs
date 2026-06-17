import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Xpersive Labs — Start Your Project",
  description:
    "Work with Xpersive Labs on white-label scraping pipelines, custom data tools, or agency web applications. Based in Colombo, Sri Lanka. Serving AU, UK, and US.",
  alternates: { canonical: "https://www.xpersivelabs.com/contact" },
  openGraph: {
    type: "website",
    url: "https://www.xpersivelabs.com/contact",
    title: "Contact Xpersive Labs — Start Your Project",
    description:
      "Work with Xpersive Labs on white-label scraping pipelines, custom data tools, or agency web applications.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact Xpersive Labs — Start Your Project",
    description:
      "White-label scraping pipelines and custom data tools for SEO and digital marketing agencies in AU, UK, and US.",
  },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
