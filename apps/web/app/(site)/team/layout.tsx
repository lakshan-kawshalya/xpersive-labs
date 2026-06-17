import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Our Team — Xpersive Labs",
  description:
    "Meet the team behind Xpersive Labs. Founded by Lakshan Kawshalya, building white-label scraping pipelines and custom data tools for SEO and digital marketing agencies in AU, UK, and US.",
  alternates: { canonical: "https://www.xpersivelabs.com/team" },
  openGraph: {
    type: "website",
    url: "https://www.xpersivelabs.com/team",
    title: "Our Team — Xpersive Labs",
    description:
      "Meet the team behind Xpersive Labs. Building white-label scraping pipelines and data tools for agencies.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Our Team — Xpersive Labs",
    description:
      "Meet the team behind Xpersive Labs. Building white-label scraping pipelines and data tools for SEO and digital marketing agencies.",
  },
};

export default function TeamLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
