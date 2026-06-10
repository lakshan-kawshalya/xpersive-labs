import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Portfolio - Our Work",
  description:
    "View Xpersive Labs' portfolio. See the Alibaba Supplier Intelligence Tool: production-ready with 4 core modes, 20+ data fields per product, and a full anti-detection layer.",
  alternates: { canonical: "https://www.xpersivelabs.com/portfolio" },
  openGraph: { url: "https://www.xpersivelabs.com/portfolio" },
};

export default function PortfolioLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
