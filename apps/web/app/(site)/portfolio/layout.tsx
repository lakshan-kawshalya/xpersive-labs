import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Portfolio — Xpersive Labs",
  description:
    "Selected work from Xpersive Labs: web applications, automation pipelines, and ecommerce builds for clients in AU, UK, and US.",
  alternates: { canonical: "https://www.xpersivelabs.com/portfolio" },
  openGraph: {
    type: "website",
    url: "https://www.xpersivelabs.com/portfolio",
    title: "Portfolio — Xpersive Labs",
    description:
      "Selected work from Xpersive Labs: web applications, automation pipelines, and ecommerce builds for clients in AU, UK, and US.",
  },
};

export default function PortfolioLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
