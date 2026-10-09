import BothOptionsNote from "@/components/partners/BothOptionsNote";
import PartnerBlockGrid from "@/components/partners/PartnerBlockGrid";
import PartnerCta from "@/components/partners/PartnerCta";
import PartnerHero from "@/components/partners/PartnerHero";
import PartnerSection from "@/components/partners/PartnerSection";
import RegisterLink from "@/components/partners/RegisterLink";
import ServicesList from "@/components/partners/ServicesList";
import type { PartnerOption } from "@/lib/partnerContent";

export default function PartnerDetailPage({
  option,
  otherOption,
}: {
  option: PartnerOption;
  otherOption: PartnerOption;
}) {
  return (
    <>
      <PartnerHero label="Partner Program" titleAccent={option.label} intro={option.summary}>
        <RegisterLink />
      </PartnerHero>

      <PartnerSection label="The details" title="How it works" isTinted>
        <PartnerBlockGrid slug={option.slug} />
      </PartnerSection>

      <ServicesList />
      <BothOptionsNote />
      <PartnerCta otherLabel={otherOption.label} otherHref={otherOption.href} />
    </>
  );
}
