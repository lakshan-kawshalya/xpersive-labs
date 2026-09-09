import type { ReactNode } from "react";

interface LegalNumberedCardProps {
  number: string;
  id: string;
  title: string;
  children: ReactNode;
  tinted?: boolean;
}

export function LegalNumberedCard({ number, id, title, children, tinted = false }: LegalNumberedCardProps) {
  return (
    <section
      id={id}
      className="rounded-2xl p-6 sm:p-8 border scroll-mt-32"
      style={{
        background: tinted ? "linear-gradient(135deg, #FFFFFF 0%, #FCF8FF 100%)" : "var(--surface-card)",
        borderColor: tinted ? "rgba(109,113,249,0.2)" : "var(--border-subtle)",
        boxShadow: "0 4px 20px rgba(39,40,72,0.05)",
      }}
    >
      <div className="flex items-center gap-3 mb-4">
        <span
          className={`w-8 h-8 rounded-lg font-display font-bold text-xs flex items-center justify-center shrink-0 ${
            tinted ? "bg-primary/10 text-primary" : "bg-[rgba(39,40,72,0.05)] text-text-primary"
          }`}
        >
          {number}
        </span>
        <h2 className="font-display font-bold text-xl text-text-primary">{title}</h2>
      </div>
      {children}
    </section>
  );
}
