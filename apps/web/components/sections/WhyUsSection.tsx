"use client";

import { fadeUp, staggerContainer } from "@/lib/animations";
import { motion } from "framer-motion";
import { Globe2, Layers, UserCheck } from "lucide-react";
import { useMotionSafe } from "@/hooks/useMotionSafe";
import { useSectionReveal } from "@/hooks/useSectionReveal";
import SpotlightCard from "@/components/ui/SpotlightCard";

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
    body: "We understand your market, your expectations, and your timezones. Remote collaboration isn't an afterthought - it's the whole model.",
  },
];

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
    <section ref={ref} className="py-28 relative overflow-hidden" style={{ background: "#272848" }}>
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
          <motion.h2 {...(shouldAnimate ? { variants: fadeUp } : { initial: false })} className="font-display text-4xl sm:text-5xl font-bold text-white">
            The case for working with a boutique studio.
          </motion.h2>
        </motion.div>

        <motion.div className="grid grid-cols-1 md:grid-cols-3 gap-6" {...scrollProps}>
          {reasons.map((reason) => (
            <SpotlightCard
              key={reason.title}
              icon={reason.icon}
              title={reason.title}
              body={reason.body}
              theme="dark"
            />
          ))}
        </motion.div>

        <motion.p
          className="text-center mt-12 font-mono text-[13px]"
          style={{ color: "rgba(255,255,255,0.4)", letterSpacing: "0.04em" }}
          {...(shouldAnimate ? { variants: fadeUp } : { initial: false })}
        >
          Raj Ceylon Tours · Alibaba Supplier Intelligence · Xpersive Labs Website
        </motion.p>
      </motion.div>
    </section>
  );
}
