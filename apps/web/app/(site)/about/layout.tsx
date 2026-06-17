import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us — Xpersive Labs",
  description:
    "Xpersive Labs is a software studio in Colombo, Sri Lanka. We build white-label scraping pipelines and custom web applications for SEO and digital marketing agencies in AU, UK, and US.",
  alternates: { canonical: "https://www.xpersivelabs.com/about" },
  openGraph: {
    type: "website",
    url: "https://www.xpersivelabs.com/about",
    title: "About Us — Xpersive Labs",
    description:
      "Software studio in Colombo, Sri Lanka. White-label scraping pipelines and web applications for agencies.",
  },
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
