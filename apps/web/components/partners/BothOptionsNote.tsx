import Reveal from "@/components/partners/Reveal";
import { BOTH_OPTIONS_NOTE } from "@/lib/partnerContent";

export default function BothOptionsNote() {
  return (
    <section className="py-8">
      <div className="mx-auto max-w-7xl px-6">
        <Reveal>
          <div
            className="rounded-3xl border border-primary/10 p-8 sm:p-10"
            style={{
              background: "linear-gradient(135deg, #FFFFFF 0%, #F1F0FF 55%, #E8E6FF 100%)",
              boxShadow: "0 8px 40px rgba(109,113,249,0.12)",
            }}
          >
            <h2 className="font-display text-2xl font-bold text-text-primary">Both options</h2>
            <p className="mt-3 max-w-3xl text-base leading-relaxed text-text-secondary">{BOTH_OPTIONS_NOTE}</p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
