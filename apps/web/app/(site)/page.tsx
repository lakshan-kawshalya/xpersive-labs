import { headers } from "next/headers";
import HeroSection from "@/components/sections/HeroSection";
import TrustBar from "@/components/sections/TrustBar";
import ServicesSection from "@/components/sections/ServicesSection";
import PortfolioSection from "@/components/sections/PortfolioSection";
import WhyUsSection from "@/components/sections/WhyUsSection";
import ProcessSection from "@/components/sections/ProcessSection";
import CTASection from "@/components/sections/CTASection";
import HeroSectionLK from "@/components/sections/lk/HeroSectionLK";
import ServicesSectionLK from "@/components/sections/lk/ServicesSectionLK";
import CaseStudiesSectionLK from "@/components/sections/lk/CaseStudiesSectionLK";
import ProcessSectionLK from "@/components/sections/lk/ProcessSectionLK";
import PhilosophySectionLK from "@/components/sections/lk/PhilosophySectionLK";
import FAQSectionLK from "@/components/sections/lk/FAQSectionLK";
import CTASectionLK from "@/components/sections/lk/CTASectionLK";
import SectionBreak from "@/components/sections/lk/SectionBreak";
import { DEFAULT_REGION, isRegion } from "@/lib/geo/regions";
import { REGION_HEADER_NAME } from "@/proxy";

export default async function Home() {
  const regionHeader = (await headers()).get(REGION_HEADER_NAME);
  const region = isRegion(regionHeader) ? regionHeader : DEFAULT_REGION;

  if (region === "LK") {
    return (
      <>
        <div className="snap-start scroll-mt-16">
          <HeroSectionLK />
        </div>
        <SectionBreak />
        <div className="snap-start scroll-mt-16">
          <ServicesSectionLK />
        </div>
        <SectionBreak />
        <div className="snap-start scroll-mt-16">
          <CaseStudiesSectionLK />
        </div>
        <SectionBreak />
        <div className="snap-start scroll-mt-16">
          <ProcessSectionLK />
        </div>
        <SectionBreak />
        <div className="snap-start scroll-mt-16">
          <PhilosophySectionLK />
        </div>
        <SectionBreak />
        <div className="snap-start scroll-mt-16">
          <FAQSectionLK />
        </div>
        <SectionBreak />
        <div className="snap-start scroll-mt-16">
          <CTASectionLK />
        </div>
      </>
    );
  }

  return (
    <>
      <HeroSection />
      <TrustBar />
      <ServicesSection />
      <ProcessSection />
      <PortfolioSection />
      <WhyUsSection />
      <CTASection />
    </>
  );
}
