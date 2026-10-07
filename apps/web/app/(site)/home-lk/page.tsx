import type { Metadata } from "next";
import HeroSectionLK from "@/components/sections/lk/HeroSectionLK";
import ServicesSectionLK from "@/components/sections/lk/ServicesSectionLK";
import CaseStudiesSectionLK from "@/components/sections/lk/CaseStudiesSectionLK";
import ProcessSectionLK from "@/components/sections/lk/ProcessSectionLK";
import PhilosophySectionLK from "@/components/sections/lk/PhilosophySectionLK";
import FAQSectionLK from "@/components/sections/lk/FAQSectionLK";
import CTASectionLK from "@/components/sections/lk/CTASectionLK";

// Served at "/" for Sri Lanka visitors via a Proxy rewrite (see proxy.ts), so it
// stays a fully static page rather than branching at render time. Not a page
// people link to directly, so it's kept out of search results and pointed at
// the canonical root to avoid duplicate-content signals.
export const metadata: Metadata = {
  robots: { index: false, follow: true },
  alternates: { canonical: "https://www.xpersivelabs.com" },
};

export default function HomeLK() {
  return (
    <>
      <HeroSectionLK />
      <ServicesSectionLK />
      <CaseStudiesSectionLK />
      <ProcessSectionLK />
      <PhilosophySectionLK />
      <FAQSectionLK />
      <CTASectionLK />
    </>
  );
}
