import HeroSection from "@/components/sections/HeroSection";
import ServicesSection from "@/components/sections/ServicesSection";
import ClientQuoteSection from "@/components/sections/ClientQuoteSection";
import PortfolioSection from "@/components/sections/PortfolioSection";
import StatsSection from "@/components/sections/StatsSection";
import BuildTimelineSection from "@/components/sections/BuildTimelineSection";
import TestimonialsSection from "@/components/sections/TestimonialsSection";
import HomePricingSection from "@/components/sections/HomePricingSection";
import CTASection from "@/components/sections/CTASection";

export default function Home() {
  return (
    <>
      <HeroSection />
      <ServicesSection />
      <ClientQuoteSection />
      <PortfolioSection />
      <StatsSection />
      <BuildTimelineSection />
      <TestimonialsSection />
      <HomePricingSection />
      <CTASection />
    </>
  );
}
