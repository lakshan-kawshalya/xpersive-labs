import PartnerSection from "@/components/partners/PartnerSection";
import { PARTNER_FAQS } from "@/lib/partnerContent";

export default function PartnerFaq() {
  return (
    <PartnerSection title="Common questions">
      <div className="flex max-w-3xl flex-col gap-4">
        {PARTNER_FAQS.map(({ q, a }) => (
          <details
            key={q}
            className="group rounded-2xl border border-border-subtle bg-bg-card shadow-sm transition-colors open:border-primary/35"
          >
            <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-4 p-5 font-display text-lg font-bold text-text-primary sm:p-6 [&::-webkit-details-marker]:hidden">
              {q}
              <span
                aria-hidden="true"
                className="text-xl font-normal text-dark transition-transform duration-200 group-open:rotate-45 motion-reduce:transition-none"
              >
                +
              </span>
            </summary>
            <p className="px-5 pb-5 text-base leading-relaxed text-text-secondary sm:px-6 sm:pb-6">{a}</p>
          </details>
        ))}
      </div>
    </PartnerSection>
  );
}
