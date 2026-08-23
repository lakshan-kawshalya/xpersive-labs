"use client";

import { fadeUp, staggerContainer } from "@/lib/animations";
import { motion } from "framer-motion";
import { Globe2, Layers, UserCheck } from "lucide-react";
import { useMotionSafe } from "@/hooks/useMotionSafe";
import { useSectionReveal } from "@/hooks/useSectionReveal";

const reasons = [
  {
    icon: UserCheck,
    title: "Direct access, always",
    body: "You work with the developer building your product - not an account manager relaying messages. Same person from brief to launch.",
  },
  {
    icon: Layers,
    title: "Modern stack, every project",
    body: "Next.js 14, TypeScript, Python. We don't take on projects that need legacy tech - so every codebase we touch stays maintainable.",
  },
  {
    icon: Globe2,
    title: "Built for AU, UK & US clients",
    body: "We understand your market, your expectations, and your timelines. Remote collaboration is not an afterthought here - it's the whole model.",
  },
];

function ReasonCard({ reason }: { reason: typeof reasons[number] }) {
  const { shouldAnimate } = useMotionSafe();

  return (
    <motion.div
      {...(shouldAnimate ? { variants: fadeUp } : { initial: false })}
      className="group relative flex flex-col rounded-3xl border overflow-hidden transition-colors duration-[350ms] border-white/[0.06] hover:border-primary/30"
      style={{ padding: 32, background: "rgba(255,255,255,0.02)" }}
    >
      {/* Hover background tint */}
      <div
        className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{ background: "rgba(109,113,249,0.04)" }}
      />

      {/* Icon container */}
      <div
        className="relative inline-flex items-center justify-center w-12 h-12 mb-7 transition-all duration-300 group-hover:rotate-[5deg]"
        style={{
          borderRadius: 14,
          background: "linear-gradient(135deg, rgba(109,113,249,0.2), rgba(84,193,251,0.2))",
          border: "1px solid rgba(109,113,249,0.3)",
        }}
      >
        <reason.icon size={24} className="text-primary" />
      </div>

      <h3 className="relative font-display text-xl font-bold mb-3 text-white">
        {reason.title}
      </h3>
      <p className="relative text-white/50 text-sm leading-relaxed">
        {reason.body}
      </p>
    </motion.div>
  );
}

export default function WhyUsSection() {
  const { shouldAnimate } = useMotionSafe();
  const { ref, inView } = useSectionReveal();

  const scrollProps = shouldAnimate ? {
    variants: staggerContainer,
    initial: "hidden",
    whileInView: "visible" as const,
    viewport: { once: true, margin: "-80px" },
  } : { initial: false };

  return (
    <section ref={ref} className="py-28 relative overflow-hidden">
      <motion.div
        className="max-w-7xl mx-auto px-6"
        {...(shouldAnimate
          ? {
              initial: { opacity: 0, y: 10 },
              animate: inView ? { opacity: 1, y: 0 } : {},
              transition: { duration: 0.5, delay: 0.1, ease: [0.215, 0.61, 0.355, 1.0] },
            }
          : { initial: false })}
      >
        <motion.div className="text-center mb-16" {...scrollProps}>
          <motion.span {...(shouldAnimate ? { variants: fadeUp } : { initial: false })} className="inline-block text-primary text-xs font-bold uppercase tracking-[0.2em] mb-4">
            Why Xpersive Labs
          </motion.span>
          <motion.h2 {...(shouldAnimate ? { variants: fadeUp } : { initial: false })} className="font-display text-4xl sm:text-5xl font-bold">
            The case for working with a boutique studio.
          </motion.h2>
        </motion.div>

        <motion.div className="grid grid-cols-1 md:grid-cols-3 gap-6" {...scrollProps}>
          {reasons.map((reason) => (
            <ReasonCard key={reason.title} reason={reason} />
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}
