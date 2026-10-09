import type { ReactNode } from "react";

export default function PartnerHero({
  label,
  title,
  intro,
  children,
}: {
  label: string;
  title: string;
  intro: string;
  children?: ReactNode;
}) {
  return (
    <section className="relative overflow-hidden bg-dark px-6 pb-16 pt-32 sm:pb-24 sm:pt-44">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-32 -top-24 h-[420px] w-[420px] rounded-full bg-primary/30 blur-[100px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 top-1/3 h-[360px] w-[360px] rounded-full bg-accent/20 blur-[100px]"
      />
      <div className="relative z-10 mx-auto max-w-3xl">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-accent">{label}</p>
        <h1 className="mt-4 font-display text-4xl font-bold leading-[1.1] text-white sm:text-6xl">{title}</h1>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/80">{intro}</p>
        {children && <div className="mt-10">{children}</div>}
      </div>
    </section>
  );
}
