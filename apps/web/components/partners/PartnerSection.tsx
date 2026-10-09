import type { ReactNode } from "react";

export default function PartnerSection({
  id,
  title,
  intro,
  children,
}: {
  id?: string;
  title: string;
  intro?: string;
  children: ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-24 bg-bg px-6 py-16 sm:py-20">
      <div className="mx-auto max-w-5xl">
        <h2 className="font-display text-3xl font-bold text-text-primary sm:text-4xl">{title}</h2>
        {intro && <p className="mt-4 max-w-2xl text-base leading-relaxed text-text-secondary sm:text-lg">{intro}</p>}
        <div className="mt-8">{children}</div>
      </div>
    </section>
  );
}
