"use client";

import { fadeUp, staggerContainer } from "@/lib/animations";
import { motion } from "framer-motion";
import { ShieldCheck } from "lucide-react";
import { useRef, useState } from "react";
import { useMotionSafe } from "@/hooks/useMotionSafe";
import { useSectionReveal } from "@/hooks/useSectionReveal";

const tenets = [
  {
    num: "01",
    color: "bg-primary",
    title: "Direct access, always",
    body: "You work with the person actually building your project, not an account manager relaying messages.",
  },
  {
    num: "02",
    color: "bg-accent",
    title: "Modern, reliable technology",
    body: "We build with the same modern tools trusted by companies worldwide, so what you get is fast, secure, and built to last.",
  },
  {
    num: "03",
    color: "bg-text-muted",
    title: "Built for Sri Lankan businesses",
    body: "We understand local business needs, communicate in the way you're used to, and are based right here in Colombo.",
  },
];

function TenetCard({ tenet, childProps }: { tenet: (typeof tenets)[number]; childProps: Record<string, unknown> }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [spot, setSpot] = useState({ x: 0, y: 0, on: false });
  const { shouldAnimate } = useMotionSafe();

  const hoverProps = shouldAnimate
    ? {
        whileHover: { y: -6, boxShadow: "0 20px 48px rgba(109,113,249,0.14)" },
        transition: { type: "spring" as const, stiffness: 200, damping: 22 },
        onMouseMove: (e: React.MouseEvent<HTMLDivElement>) => {
          const r = cardRef.current?.getBoundingClientRect();
          if (r) setSpot({ x: e.clientX - r.left, y: e.clientY - r.top, on: true });
        },
        onMouseLeave: () => setSpot((s) => ({ ...s, on: false })),
      }
    : {};

  return (
    <motion.div
      ref={cardRef}
      {...childProps}
      {...hoverProps}
      className="group relative overflow-hidden p-8 rounded-2xl bg-bg-card border border-border-subtle transition-colors duration-300 hover:border-primary/25"
    >
      {shouldAnimate && (
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            opacity: spot.on ? 1 : 0,
            transition: "opacity 0.2s ease",
            background: `radial-gradient(circle at ${spot.x}px ${spot.y}px, rgba(109,113,249,0.06) 0%, transparent 60%)`,
          }}
        />
      )}
      <div className="relative flex items-center gap-4 mb-3">
        <span
          className={`w-8 h-8 rounded-full ${tenet.color} text-white text-xs font-bold flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:scale-110`}
        >
          {tenet.num}
        </span>
        <h3 className="font-display text-lg font-bold text-text-primary">{tenet.title}</h3>
      </div>
      <p className="relative text-text-secondary leading-relaxed pl-12">{tenet.body}</p>
    </motion.div>
  );
}

export default function PhilosophySectionLK() {
  const { shouldAnimate } = useMotionSafe();
  const { ref, inView } = useSectionReveal();

  const scrollProps = shouldAnimate ? {
    variants: staggerContainer,
    initial: "hidden",
    whileInView: "visible" as const,
    viewport: { once: true, margin: "-80px" },
  } : { initial: false };

  const childProps = shouldAnimate ? { variants: fadeUp } : { initial: false };

  return (
    <section ref={ref} className="py-28 relative overflow-hidden bg-[rgba(109,113,249,0.035)]">
      <motion.div
        className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-16 items-start"
        {...(shouldAnimate
          ? {
              initial: { opacity: 0, y: 10 },
              animate: inView ? { opacity: 1, y: 0 } : {},
              transition: { duration: 0.5, delay: 0.1, ease: [0.215, 0.61, 0.355, 1.0] },
            }
          : { initial: false })}
      >
        {/* Left: thesis */}
        <motion.div className="lg:col-span-6 flex flex-col gap-6" {...scrollProps}>
          <motion.span
            {...childProps}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[rgba(109,113,249,0.08)] text-primary text-xs font-bold uppercase tracking-wider self-start"
          >
            <span className="w-2 h-2 rounded-full bg-primary inline-block" />
            Zero Middlemen · Studio Philosophy
          </motion.span>
          <motion.h2 {...childProps} className="font-display text-4xl sm:text-5xl font-bold text-text-primary">
            Work directly with the people building it.
          </motion.h2>
          <motion.p {...childProps} className="text-text-secondary text-lg leading-relaxed">
            No account managers, no delays, no big-agency overhead. You talk to the team actually writing the code.
          </motion.p>
          <motion.div {...childProps} className="pt-4">
            <div className="p-6 rounded-2xl bg-bg-card shadow-sm flex items-center gap-4 border border-border-subtle">
              <div className="w-12 h-12 rounded-full bg-[rgba(109,113,249,0.08)] flex items-center justify-center text-primary shrink-0">
                <ShieldCheck size={24} aria-hidden="true" />
              </div>
              <div>
                <span className="font-bold text-text-primary block">Uncompromising Quality</span>
                <span className="text-sm text-text-secondary">Zero outsourcing. Every line of code is produced directly in our Colombo lab.</span>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Right: 3 tenets */}
        <motion.div className="lg:col-span-6 flex flex-col gap-6" {...scrollProps}>
          {tenets.map((tenet) => (
            <TenetCard key={tenet.num} tenet={tenet} childProps={childProps} />
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}
