import Link from "next/link";
import { Check } from "lucide-react";
import PartnerSection from "@/components/partners/PartnerSection";
import Reveal from "@/components/partners/Reveal";
import { PARTNER_SERVICES } from "@/lib/partnerContent";

export default function ServicesList() {
  return (
    <PartnerSection label="What we do" title="Services we build" isTinted>
      <ul className="grid gap-4 sm:grid-cols-2">
        {PARTNER_SERVICES.map((service) => (
          <li key={service}>
            <Reveal className="h-full">
              <div
                className="flex h-full items-start gap-4 rounded-2xl border border-primary/10 p-5"
                style={{ background: "var(--surface-card)", boxShadow: "0 2px 12px rgba(109,113,249,0.06)" }}
              >
                <span
                  className="mt-0.5 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-[10px] border border-primary/30"
                  style={{ background: "linear-gradient(135deg, rgba(109,113,249,0.2), rgba(84,193,251,0.2))" }}
                >
                  <Check size={16} className="text-primary" aria-hidden="true" />
                </span>
                <span className="text-base leading-relaxed text-text-primary">{service}</span>
              </div>
            </Reveal>
          </li>
        ))}
      </ul>
      <p className="mt-8 text-base text-text-secondary">
        Want the detail on any of these?{" "}
        <Link href="/services" className="font-semibold text-primary underline-offset-4 hover:underline">
          See our services
        </Link>
        .
      </p>
    </PartnerSection>
  );
}
