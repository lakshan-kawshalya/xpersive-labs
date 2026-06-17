import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Portfolio — Our Work",
  description:
    "View Xpersive Labs' portfolio. See the Alibaba Supplier Intelligence Platform: production-ready with 5 automated functions, 47 data fields, and a full anti-detection layer.",
  alternates: { canonical: "https://www.xpersivelabs.com/portfolio" },
  openGraph: {
    type: "website",
    url: "https://www.xpersivelabs.com/portfolio",
    title: "Portfolio — Our Work",
    description:
      "Alibaba Supplier Intelligence Platform: 5 automated functions, 47 data fields, full anti-detection layer. Proof of model for data pipeline agencies.",
  },
};

export default function PortfolioLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
