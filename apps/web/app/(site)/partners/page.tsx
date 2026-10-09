import type { Metadata } from "next";
import BothOptionsNote from "@/components/partners/BothOptionsNote";
import OptionCard from "@/components/partners/OptionCard";
import PartnerFaq from "@/components/partners/PartnerFaq";
import PartnerHero from "@/components/partners/PartnerHero";
import PartnerInterestForm from "@/components/partners/PartnerInterestForm";
import PartnerSection from "@/components/partners/PartnerSection";
import RegisterLink from "@/components/partners/RegisterLink";
import ServicesList from "@/components/partners/ServicesList";
import { PARTNER_OPTIONS } from "@/lib/partnerContent";

const URL = "https://www.xpersivelabs.com/partners";
const TITLE = "Partner Program | Referral and White-label";
const DESCRIPTION =
  "Marketing agencies and freelancers: introduce a client and receive 15% of net fees on the first project, or have us build under your brand. Register your interest.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: URL },
  openGraph: { type: "website", title: `${TITLE} | Xpersive Labs`, description: DESCRIPTION, url: URL },
};

export default function PartnersPage() {
  return (
    <>
      <PartnerHero
        label="Partner Program"
        title="Work with us as a"
        titleAccent="partner."
        intro="For marketing agencies and freelancers. Introduce a business that needs something built, or have us build under your brand. Pick the option that fits how you work."
      >
        <RegisterLink />
      </PartnerHero>

      <PartnerSection label="Choose your option" title="Two ways to work with us" isTinted>
        <div className="grid gap-6 md:grid-cols-2">
          {PARTNER_OPTIONS.map((option) => (
            <OptionCard key={option.slug} option={option} />
          ))}
        </div>
      </PartnerSection>

      <ServicesList />
      <BothOptionsNote />
      <PartnerFaq />

      <PartnerSection
        id="register"
        label="Get started"
        title="Register your interest"
        intro="Tell us a little about you and which option you are interested in."
        isTinted
      >
        <div className="max-w-3xl">
          <PartnerInterestForm />
        </div>
      </PartnerSection>
    </>
  );
}
