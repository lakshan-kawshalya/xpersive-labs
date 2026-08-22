import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Portfolio — Our Work",
  description:
    "View Xpersive Labs' portfolio: the Raj Ceylon Tours luxury tourism website and the Alibaba Supplier Intelligence Platform, a production automation system with 47 data fields extracted daily.",
  alternates: { canonical: "https://www.xpersivelabs.com/portfolio" },
  openGraph: {
    type: "website",
    url: "https://www.xpersivelabs.com/portfolio",
    title: "Portfolio — Our Work",
    description:
      "Raj Ceylon Tours: a luxury Sri Lanka tourism website. Alibaba Supplier Intelligence Platform: 5 automated functions, 47 data fields daily.",
  },
};

export default function PortfolioLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
