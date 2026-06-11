import type { Metadata } from "next";
import AlibabaCaseStudy from "./AlibabaCaseStudy";

export const metadata: Metadata = {
  title: "Alibaba Supplier Intelligence Platform - Case Study",
  description:
    "How Xpersive Labs built a fully automated Alibaba supplier intelligence platform for an Australian importer — replacing 8-10 hours of manual research per week with a 5-function automation module extracting 47 unique data fields daily.",
  alternates: {
    canonical: "https://www.xpersivelabs.com/portfolio/alibaba-scraper",
  },
  openGraph: {
    url: "https://www.xpersivelabs.com/portfolio/alibaba-scraper",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Alibaba Supplier Intelligence Platform",
  description: "Automated supplier monitoring platform for Australian importer",
  author: { "@type": "Organization", name: "Xpersive Labs" },
  publisher: { "@type": "Organization", name: "Xpersive Labs" },
  datePublished: "2026-05-01",
  url: "https://www.xpersivelabs.com/portfolio/alibaba-scraper",
};

export default function AlibabaCaseStudyPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <AlibabaCaseStudy />
    </>
  );
}
