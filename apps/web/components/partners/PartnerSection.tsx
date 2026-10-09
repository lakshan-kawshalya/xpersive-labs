import type { ReactNode } from "react";
import Reveal from "@/components/partners/Reveal";

export default function PartnerSection({
  id,
  label,
  title,
  intro,
  isTinted = false,
  isCentered = false,
  children,
}: {
  id?: string;
  label?: string;
  title: string;
  intro?: string;
  isTinted?: boolean;
  isCentered?: boolean;
  children: ReactNode;
}) {
  return (
    <section id={id} className={`scroll-mt-24 py-16 sm:py-20 ${isTinted ? "bg-[rgba(109,113,249,0.035)]" : ""}`}>
      <div className="mx-auto max-w-7xl px-6">
        <Reveal className={`mb-10 max-w-2xl ${isCentered ? "mx-auto text-center" : ""}`}>
          {label && (
            <span className="mb-3 inline-block text-xs font-bold uppercase tracking-[0.2em] text-primary">
              {label}
            </span>
          )}
          <h2 className="font-display text-3xl font-bold tracking-tight text-text-primary sm:text-4xl">{title}</h2>
          {intro && <p className="mt-4 text-lg leading-relaxed text-text-secondary">{intro}</p>}
        </Reveal>
        {children}
      </div>
    </section>
  );
}
