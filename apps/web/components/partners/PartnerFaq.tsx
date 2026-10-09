import PartnerSection from "@/components/partners/PartnerSection";
import Reveal from "@/components/partners/Reveal";
import { PARTNER_FAQS } from "@/lib/partnerContent";

export default function PartnerFaq() {
  return (
    <PartnerSection label="FAQ" title="Common questions" isCentered>
      <div className="mx-auto flex max-w-3xl flex-col gap-4">
        {PARTNER_FAQS.map(({ q, a }) => (
          <Reveal key={q}>
            <details
              className="group rounded-2xl border border-primary/10 transition-colors open:border-primary/35"
              style={{ background: "var(--surface-card)", boxShadow: "0 2px 12px rgba(109,113,249,0.06)" }}
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 p-6 font-display text-lg font-bold text-text-primary [&::-webkit-details-marker]:hidden">
                {q}
                <span
                  aria-hidden="true"
                  className="text-xl font-normal text-primary transition-transform duration-200 group-open:rotate-45 motion-reduce:transition-none"
                >
                  +
                </span>
              </summary>
              <p className="px-6 pb-6 text-base leading-relaxed text-text-secondary">{a}</p>
            </details>
          </Reveal>
        ))}
      </div>
    </PartnerSection>
  );
}
