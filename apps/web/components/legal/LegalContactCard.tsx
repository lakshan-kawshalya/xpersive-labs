import { Mail } from "lucide-react";
import { LegalNumberedCard } from "@/components/legal/LegalNumberedCard";

interface LegalContactCardProps {
  number: string;
  intro: string;
}

export function LegalContactCard({ number, intro }: LegalContactCardProps) {
  return (
    <LegalNumberedCard number={number} id="contact" title="Contact Us" tinted>
      <p className="text-sm sm:text-base text-text-secondary leading-relaxed mb-6">{intro}</p>
      <div className="bg-bg-card rounded-xl p-5 border border-border-subtle flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs uppercase tracking-wider font-semibold text-text-muted block mb-1">
            Legal Inquiries
          </span>
          <p className="font-display font-bold text-base text-text-primary">Xpersive Labs</p>
          <p className="text-sm text-text-secondary">Colombo, Sri Lanka</p>
        </div>
        <a
          href="mailto:hello@xpersivelabs.com"
          className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-primary/10 text-primary hover:bg-primary hover:text-white transition-all text-xs font-semibold border border-primary/20"
        >
          <Mail size={16} />
          hello@xpersivelabs.com
        </a>
      </div>
    </LegalNumberedCard>
  );
}
