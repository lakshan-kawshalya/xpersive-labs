import type { ReactNode } from "react";
import Reveal from "@/components/partners/Reveal";

export default function PartnerHero({
  label,
  title,
  titleAccent,
  intro,
  children,
}: {
  label: string;
  title?: string;
  titleAccent: string;
  intro: string;
  children?: ReactNode;
}) {
  return (
    <section className="relative overflow-hidden pb-16 pt-40">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-32 right-0 h-[500px] w-[500px] rounded-full blur-[130px]"
        style={{ background: "radial-gradient(circle, rgba(109,113,249,0.1) 0%, transparent 70%)" }}
      />
      <div className="relative z-10 mx-auto max-w-7xl px-6">
        <div className="flex max-w-3xl flex-col items-start gap-5">
          <Reveal>
            <span className="inline-flex items-center gap-2 rounded-full bg-[rgba(109,113,249,0.08)] px-4 py-1.5 text-xs font-bold uppercase tracking-[0.2em] text-primary">
              {label}
            </span>
          </Reveal>
          <Reveal>
            <h1 className="font-display text-5xl font-bold leading-[1.05] text-text-primary sm:text-6xl lg:text-7xl">
              {title && <>{title} </>}
              <span className="text-gradient">{titleAccent}</span>
            </h1>
          </Reveal>
          <Reveal>
            <p className="max-w-xl text-lg leading-relaxed text-text-secondary">{intro}</p>
          </Reveal>
          {children && <Reveal className="pt-1">{children}</Reveal>}
        </div>
      </div>
    </section>
  );
}
