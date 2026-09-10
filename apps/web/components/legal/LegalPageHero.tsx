import { Calendar } from "lucide-react";

interface LegalPageHeroProps {
  eyebrow: string;
  title: string;
  subtitle: string;
  effectiveDate: string;
}

export function LegalPageHero({ eyebrow, title, subtitle, effectiveDate }: LegalPageHeroProps) {
  return (
    <section className="relative pt-40 pb-16 overflow-hidden">
      <div
        className="absolute -top-24 left-1/4 w-110 h-110 rounded-full blur-[120px] pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(84,193,251,0.14) 0%, transparent 70%)" }}
      />
      <div
        className="absolute top-1/3 -right-20 w-110 h-110 rounded-full blur-[120px] pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(109,113,249,0.12) 0%, transparent 70%)" }}
      />

      <div className="relative z-10 max-w-6xl mx-auto px-6">
        <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/10 border border-primary/20 mb-6">
          <span className="w-1.5 h-1.5 rounded-full bg-primary" />
          <span className="font-display font-bold text-xs text-primary uppercase tracking-[0.18em]">
            {eyebrow}
          </span>
        </span>

        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
          <div>
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-text-primary mb-4">
              {title}
            </h1>
            <p className="text-text-secondary text-base sm:text-lg max-w-2xl leading-relaxed">{subtitle}</p>
          </div>

          <div
            className="flex items-center gap-4 py-3 px-5 rounded-2xl bg-bg-card border border-border-subtle self-start lg:self-auto"
            style={{ boxShadow: "0 4px 20px rgba(39,40,72,0.05)" }}
          >
            <div className="flex flex-col">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-text-muted">
                Current Effective Date
              </span>
              <span className="text-sm font-bold text-text-primary flex items-center gap-1.5">
                <Calendar size={14} className="text-primary" />
                {effectiveDate}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
