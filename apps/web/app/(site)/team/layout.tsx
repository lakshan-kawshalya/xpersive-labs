import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Our Team",
  description:
    "Meet the team behind Xpersive Labs. Founded by Lakshan Kawshalya, building Alibaba supplier intelligence tools and custom web applications for Amazon FBA sellers, importers, and digital agencies in AU, UK, and US.",
  alternates: { canonical: "https://www.xpersivelabs.com/team" },
  openGraph: { type: "website", url: "https://www.xpersivelabs.com/team" },
};

export default function TeamLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
