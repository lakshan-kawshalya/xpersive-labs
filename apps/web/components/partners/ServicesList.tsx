import Link from "next/link";
import { Check } from "lucide-react";
import PartnerSection from "@/components/partners/PartnerSection";
import { PARTNER_SERVICES } from "@/lib/partnerContent";

export default function ServicesList() {
  return (
    <PartnerSection title="Services we build">
      <ul className="grid gap-3 sm:grid-cols-2">
        {PARTNER_SERVICES.map((service) => (
          <li
            key={service}
            className="flex items-start gap-3 rounded-2xl border border-border-subtle bg-bg-card p-5 shadow-sm"
          >
            <Check size={20} className="mt-0.5 shrink-0 text-dark" aria-hidden="true" />
            <span className="text-base leading-relaxed text-text-primary">{service}</span>
          </li>
        ))}
      </ul>
      <p className="mt-6 text-base text-text-secondary">
        Want the detail on any of these?{" "}
        <Link href="/services" className="font-semibold text-dark underline underline-offset-4 hover:text-text-secondary">
          See our services
        </Link>
        .
      </p>
    </PartnerSection>
  );
}
