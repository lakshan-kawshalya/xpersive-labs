import HeroSection from "@/components/sections/HeroSection";
import ServicesSection from "@/components/sections/ServicesSection";
import PortfolioSection from "@/components/sections/PortfolioSection";
import WhyUsSection from "@/components/sections/WhyUsSection";
import BuildTimelineSection from "@/components/sections/BuildTimelineSection";
import CTASection from "@/components/sections/CTASection";

export default function Home() {
  return (
    <>
      <HeroSection />
      <ServicesSection />
      <PortfolioSection />
      <WhyUsSection />
      <BuildTimelineSection />
      <CTASection />
    </>
  );
}
