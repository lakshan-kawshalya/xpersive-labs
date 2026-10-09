import { BOTH_OPTIONS_NOTE } from "@/lib/partnerContent";

export default function BothOptionsNote() {
  return (
    <section className="bg-bg px-6 py-8">
      <div className="mx-auto max-w-5xl rounded-3xl border border-border-subtle bg-bg-card p-7 shadow-sm sm:p-8">
        <h2 className="font-display text-xl font-bold text-text-primary">Both options</h2>
        <p className="mt-3 max-w-3xl text-base leading-relaxed text-text-secondary">{BOTH_OPTIONS_NOTE}</p>
      </div>
    </section>
  );
}
