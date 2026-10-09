import Link from "next/link";
import { ArrowRight } from "lucide-react";
import BothOptionsNote from "@/components/partners/BothOptionsNote";
import PartnerHero from "@/components/partners/PartnerHero";
import PartnerSection from "@/components/partners/PartnerSection";
import RegisterLink from "@/components/partners/RegisterLink";
import ServicesList from "@/components/partners/ServicesList";
import type { PartnerBlock, PartnerOption } from "@/lib/partnerContent";

const TEXT_LINK = "font-semibold text-dark underline underline-offset-4 hover:text-text-secondary";

export default function PartnerDetailPage({
  option,
  otherOption,
  blocks,
}: {
  option: PartnerOption;
  otherOption: PartnerOption;
  blocks: readonly PartnerBlock[];
}) {
  return (
    <>
      <PartnerHero label="Partner Program" title={option.label} intro={option.summary}>
        <RegisterLink tone="onDark" />
      </PartnerHero>

      <PartnerSection title="How it works">
        <dl className="grid gap-5 md:grid-cols-2">
          {blocks.map(({ title, body }) => (
            <div key={title} className="rounded-2xl border border-border-subtle bg-bg-card p-6 shadow-sm">
              <dt className="font-display text-lg font-bold text-text-primary">{title}</dt>
              <dd className="mt-2 text-base leading-relaxed text-text-secondary">{body}</dd>
            </div>
          ))}
        </dl>
      </PartnerSection>

      <ServicesList />
      <BothOptionsNote />

      <section className="bg-bg px-6 py-16 sm:py-20">
        <div className="mx-auto max-w-5xl">
          <h2 className="font-display text-3xl font-bold text-text-primary sm:text-4xl">Ready to talk?</h2>
          <div className="mt-8">
            <RegisterLink tone="onLight" />
          </div>
          <ul className="mt-8 flex flex-col gap-3 text-base">
            <li>
              <Link href={otherOption.href} className={`inline-flex items-center gap-1.5 ${TEXT_LINK}`}>
                Read how {otherOption.label} works <ArrowRight size={16} aria-hidden="true" />
              </Link>
            </li>
            <li>
              <Link href="/partners" className={TEXT_LINK}>
                Back to the Partner Program
              </Link>
            </li>
            <li>
              <Link href="/services" className={TEXT_LINK}>
                Our services
              </Link>
            </li>
          </ul>
        </div>
      </section>
    </>
  );
}
