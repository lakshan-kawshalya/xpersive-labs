import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";

interface LegalIntroCalloutProps {
  icon: LucideIcon;
  title: string;
  children: ReactNode;
}

export function LegalIntroCallout({ icon: Icon, title, children }: LegalIntroCalloutProps) {
  return (
    <div
      className="relative overflow-hidden rounded-2xl p-6 sm:p-8 border border-primary/20"
      style={{ background: "linear-gradient(135deg, #FFFFFF 0%, #FCF8FF 100%)", boxShadow: "0 4px 20px rgba(39,40,72,0.05)" }}
    >
      <div
        className="absolute top-0 right-0 w-32 h-32 rounded-bl-full pointer-events-none"
        style={{ background: "linear-gradient(135deg, rgba(109,113,249,0.1), transparent)" }}
      />
      <div className="relative flex items-start gap-4">
        <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary shrink-0 mt-0.5">
          <Icon size={20} />
        </div>
        <div className="flex flex-col gap-2">
          <h2 className="font-display font-bold text-lg text-text-primary">{title}</h2>
          <div className="text-sm sm:text-base text-text-secondary leading-relaxed">{children}</div>
        </div>
      </div>
    </div>
  );
}
