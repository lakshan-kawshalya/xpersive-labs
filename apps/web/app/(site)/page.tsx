import type { Metadata } from "next";
import HeroSection from "@/components/sections/HeroSection";
import ServicesSection from "@/components/sections/ServicesSection";
import PortfolioSection from "@/components/sections/PortfolioSection";
import StatsSection from "@/components/sections/StatsSection";
import TestimonialsSection from "@/components/sections/TestimonialsSection";
import CTASection from "@/components/sections/CTASection";

export const metadata: Metadata = {
  title: "Xpersive Labs | E-Commerce Automation Tools for FBA Sellers",
  description:
    "Custom Python automation tools for Amazon FBA sellers and Alibaba importers. Supplier monitoring, product research, and competitor tracking — automated and delivered daily.",
  alternates: { canonical: "https://www.xpersivelabs.com" },
  openGraph: {
    url: "https://www.xpersivelabs.com",
    title: "Xpersive Labs | E-Commerce Automation Tools for FBA Sellers",
    description:
      "Custom Python automation tools for Amazon FBA sellers and Alibaba importers. Supplier monitoring, product research, and competitor tracking — automated and delivered daily.",
  },
  twitter: {
    title: "Xpersive Labs | E-Commerce Automation Tools for FBA Sellers",
    description:
      "Custom Python automation tools for Amazon FBA sellers and Alibaba importers. Supplier monitoring, product research, and competitor tracking — automated and delivered daily.",
  },
};

export default function Home() {
  return (
    <>
      <HeroSection />
      <ServicesSection />
      <PortfolioSection />
      <StatsSection />
      <TestimonialsSection />
      <CTASection />
    </>
  );
}
