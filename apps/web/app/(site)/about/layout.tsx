import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn about Xpersive Labs, a Sri Lankan software studio building Alibaba supplier intelligence tools, FBA product research automation, and web applications for e-commerce businesses. Based in Colombo.",
  alternates: { canonical: "https://www.xpersivelabs.com/about" },
  openGraph: { type: "website", url: "https://www.xpersivelabs.com/about" },
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
