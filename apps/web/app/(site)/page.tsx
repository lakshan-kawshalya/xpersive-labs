import { headers } from "next/headers";
import HeroSection from "@/components/sections/HeroSection";
import ServicesSection from "@/components/sections/ServicesSection";
import PortfolioSection from "@/components/sections/PortfolioSection";
import ProcessSection from "@/components/sections/ProcessSection";
import WhyUsSection from "@/components/sections/WhyUsSection";
import FAQSection from "@/components/sections/FAQSection";
import CTASection from "@/components/sections/CTASection";
import HeroSectionLK from "@/components/sections/lk/HeroSectionLK";
import ServicesSectionLK from "@/components/sections/lk/ServicesSectionLK";
import CaseStudiesSectionLK from "@/components/sections/lk/CaseStudiesSectionLK";
import ProcessSectionLK from "@/components/sections/lk/ProcessSectionLK";
import PhilosophySectionLK from "@/components/sections/lk/PhilosophySectionLK";
import FAQSectionLK from "@/components/sections/lk/FAQSectionLK";
import CTASectionLK from "@/components/sections/lk/CTASectionLK";
import SectionBreak from "@/components/sections/SectionBreak";
import { DEFAULT_REGION, isRegion } from "@/lib/geo/regions";
import { REGION_HEADER_NAME } from "@/proxy";

export default async function Home() {
  const regionHeader = (await headers()).get(REGION_HEADER_NAME);
  const region = isRegion(regionHeader) ? regionHeader : DEFAULT_REGION;

  if (region === "LK") {
    return (
      <>
        <HeroSectionLK />
        <SectionBreak />
        <ServicesSectionLK />
        <SectionBreak />
        <CaseStudiesSectionLK />
        <SectionBreak />
        <ProcessSectionLK />
        <SectionBreak />
        <PhilosophySectionLK />
        <SectionBreak />
        <FAQSectionLK />
        <SectionBreak />
        <CTASectionLK />
      </>
    );
  }

  return (
    <>
      <HeroSection />
      <SectionBreak />
      <ServicesSection />
      <SectionBreak />
      <PortfolioSection />
      <SectionBreak />
      <ProcessSection />
      <SectionBreak />
      <WhyUsSection />
      <SectionBreak />
      <FAQSection />
      <SectionBreak />
      <CTASection />
    </>
  );
}
