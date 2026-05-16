import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Portfolio - Our Work",
  description:
    "View Xpersive Labs' portfolio of web development and automation projects. See how we build fast, immersive digital products for global clients.",
  alternates: { canonical: "https://www.xpersivelabs.com/portfolio" },
  openGraph: { url: "https://www.xpersivelabs.com/portfolio" },
};

export default function PortfolioLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
