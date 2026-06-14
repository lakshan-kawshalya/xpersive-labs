"use client";

import { fadeUp, scaleIn, staggerContainer } from "@/lib/animations";
import { useCountUp } from "@/hooks/useCountUp";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { useMotionSafe } from "@/hooks/useMotionSafe";
import { useSectionReveal } from "@/hooks/useSectionReveal";
import { SectionRevealOverlays } from "@/components/sections/SectionRevealOverlays";

const stats = [
  { target: 2,  suffix: "+", label: "YEARS ACTIVE" },
  { target: 47,  suffix: "+", label: "DATA FIELDS" },
  { target: 8,   suffix: "+", label: "HRS SAVED / WEEK" },
  { target: 100, suffix: "%", label: "ON-TIME DELIVERY" },
];

interface StatItemProps {
  target: number;
  suffix: string;
  label: string;
  delay: number;
  isLast: boolean;
}

function StatItem({ target, suffix, label, delay, isLast }: StatItemProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.1 });
  const { shouldAnimate } = useMotionSafe();
  const count = useCountUp(target, target <= 5 ? 1200 : 2000, delay, shouldAnimate ? inView : false);
  const displayValue = shouldAnimate ? count : target;

  return (
    <motion.div
      ref={ref}
      {...(shouldAnimate ? { variants: scaleIn } : { initial: false })}
      className="relative flex flex-col items-center text-center px-6 py-4"
    >
      {!isLast && (
        <div
          className="hidden lg:block absolute right-0 top-1/2 -translate-y-1/2 h-12 w-px"
          style={{ background: "rgba(255,255,255,0.06)" }}
        />
      )}

      <div
        className="font-display font-extrabold text-gradient"
        style={{ fontSize: "clamp(40px, 5vw, 56px)" }}
      >
        {displayValue}{suffix}
      </div>

      <p
        className="mt-2 font-medium tracking-[0.05em] uppercase"
        style={{ fontSize: 14, color: "rgba(255,255,255,0.45)" }}
      >
        {label}
      </p>
    </motion.div>
  );
}

export default function StatsSection() {
  const { shouldAnimate } = useMotionSafe();
  const { ref, inView } = useSectionReveal();

  const containerScrollProps = shouldAnimate ? {
    initial: "hidden",
    whileInView: "visible" as const,
    viewport: { once: true, margin: "-80px" },
  } : { initial: false };

  return (
    <section
      ref={ref}
      className="py-20 relative overflow-hidden"
      style={{
        background: "rgba(255,255,255,0.02)",
        borderTop: "1px solid rgba(255,255,255,0.06)",
        borderBottom: "1px solid rgba(255,255,255,0.06)",
      }}
    >
      <SectionRevealOverlays inView={inView} shouldAnimate={shouldAnimate} />

      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-64 h-64 rounded-full blur-[100px] bg-primary/10 pointer-events-none" />
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-64 h-64 rounded-full blur-[100px] bg-accent/10 pointer-events-none" />

      <motion.div
        className="relative z-10 max-w-7xl mx-auto px-6"
        {...(shouldAnimate
          ? {
              initial: { opacity: 0, y: 10 },
              animate: inView ? { opacity: 1, y: 0 } : {},
              transition: { duration: 0.5, delay: 0.1, ease: [0.215, 0.61, 0.355, 1.0] },
            }
          : { initial: false })}
      >
        <motion.div
          className="text-center mb-14"
          {...containerScrollProps}
          variants={shouldAnimate ? fadeUp : undefined}
        >
          <span className="text-white/30 text-xs font-bold uppercase tracking-[0.2em]">
            By the Numbers
          </span>
        </motion.div>

        <motion.div
          className="grid grid-cols-2 lg:grid-cols-4"
          {...containerScrollProps}
          variants={shouldAnimate ? staggerContainer : undefined}
        >
          {stats.map((stat, i) => (
            <StatItem
              key={stat.label}
              target={stat.target}
              suffix={stat.suffix}
              label={stat.label}
              delay={i * 150}
              isLast={i === stats.length - 1}
            />
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}
