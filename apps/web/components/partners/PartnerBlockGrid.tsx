"use client";

import Reveal from "@/components/partners/Reveal";
import { REFERRAL_BLOCKS, WHITE_LABEL_BLOCKS, type PartnerOption } from "@/lib/partnerContent";

// Reads blocks here (not via props) because icon components can't cross the server/client boundary.
const BLOCKS_BY_SLUG = {
  referral: REFERRAL_BLOCKS,
  "white-label": WHITE_LABEL_BLOCKS,
} as const;

export default function PartnerBlockGrid({ slug }: { slug: PartnerOption["slug"] }) {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      {BLOCKS_BY_SLUG[slug].map(({ title, body, icon: Icon }) => (
        <Reveal key={title} className="h-full">
          <div
            className="flex h-full flex-col rounded-3xl border border-primary/10 p-8 transition-colors duration-300 hover:border-primary/30"
            style={{ background: "var(--surface-card)", boxShadow: "0 2px 12px rgba(109,113,249,0.06)" }}
          >
            <div
              className="mb-7 inline-flex h-12 w-12 items-center justify-center rounded-[14px] border border-primary/30"
              style={{ background: "linear-gradient(135deg, rgba(109,113,249,0.2), rgba(84,193,251,0.2))" }}
            >
              <Icon size={24} className="text-primary" aria-hidden="true" />
            </div>
            <h3 className="mb-3 font-display text-xl font-bold text-text-primary">{title}</h3>
            <p className="text-sm leading-relaxed text-text-secondary">{body}</p>
          </div>
        </Reveal>
      ))}
    </div>
  );
}
