"use client";

import { motion } from "framer-motion";
import { useMotionSafe } from "@/hooks/useMotionSafe";
import { useSectionReveal } from "@/hooks/useSectionReveal";
import { SectionRevealOverlays } from "@/components/sections/SectionRevealOverlays";

export default function ClientQuoteSection() {
  const { shouldAnimate } = useMotionSafe();
  const { ref, inView } = useSectionReveal();

  return (
    <section
      ref={ref}
      className="py-20 relative overflow-hidden"
      style={{
        background: "rgba(109,113,249,0.03)",
        borderTop: "1px solid rgba(109,113,249,0.08)",
        borderBottom: "1px solid rgba(109,113,249,0.08)",
      }}
    >
      <SectionRevealOverlays inView={inView} shouldAnimate={shouldAnimate} />

      {/* Ambient orb */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 80% at 50% 50%, rgba(84,193,251,0.04) 0%, transparent 70%)",
        }}
      />

      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        {/* Decorative opening quote mark */}
        <motion.div
          className="font-display font-extrabold select-none leading-none mb-2"
          style={{
            fontSize: "clamp(72px, 10vw, 120px)",
            background:
              "linear-gradient(135deg, rgba(109,113,249,0.35), rgba(84,193,251,0.35))",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            lineHeight: 0.85,
          }}
          {...(shouldAnimate
            ? {
                initial: { opacity: 0, y: -8 },
                animate: inView ? { opacity: 1, y: 0 } : {},
                transition: { duration: 0.5, ease: "easeOut" },
              }
            : { initial: false })}
          aria-hidden="true"
        >
          &ldquo;
        </motion.div>

        <motion.blockquote
          {...(shouldAnimate
            ? {
                initial: { opacity: 0, y: 20 },
                animate: inView ? { opacity: 1, y: 0 } : {},
                transition: {
                  duration: 0.7,
                  delay: 0.15,
                  ease: [0.215, 0.61, 0.355, 1.0],
                },
              }
            : { initial: false })}
        >
          <p
            className="font-display font-bold text-white leading-[1.25] mb-7"
            style={{ fontSize: "clamp(20px, 3.2vw, 38px)" }}
          >
            The system runs every morning and the sourcing research is just
            there. We don&apos;t touch it.
          </p>
          <footer
            className="text-sm font-medium tracking-wide"
            style={{ color: "rgba(255,255,255,0.35)" }}
          >
            - Agency client, Australia (anonymised)
          </footer>
        </motion.blockquote>
      </div>
    </section>
  );
}
