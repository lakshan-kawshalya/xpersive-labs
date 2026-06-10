"use client";

import { fadeUp, scaleIn, staggerContainer } from "@/lib/animations";
import { useCountUp } from "@/hooks/useCountUp";
import { motion } from "framer-motion";

const stats = [
  { target: 2,  suffix: "+", label: "YEARS ACTIVE" },
  { target: 20, suffix: "+", label: "DATA FIELDS" },
  { target: 8,  suffix: "+", label: "HRS SAVED / WEEK" },
  { target: 3,  suffix: "",  label: "CORE SERVICES" },
];

interface StatItemProps {
  target: number;
  suffix: string;
  label: string;
  delay: number;
  isLast: boolean;
}

function StatItem({ target, suffix, label, delay, isLast }: StatItemProps) {
  const { count, ref } = useCountUp(target, 2000, delay);

  return (
    <motion.div
      variants={scaleIn}
      className="relative flex flex-col items-center text-center px-6 py-4"
    >
      {!isLast && (
        <div
          className="hidden lg:block absolute right-0 top-1/2 -translate-y-1/2 h-12 w-px"
          style={{ background: "rgba(255,255,255,0.06)" }}
        />
      )}

      <div
        ref={ref}
        className="font-display font-extrabold text-gradient"
        style={{ fontSize: "clamp(40px, 5vw, 56px)" }}
      >
        {count}{suffix}
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
  return (
    <section
      className="py-20 relative overflow-hidden"
      style={{
        background: "rgba(255,255,255,0.02)",
        borderTop: "1px solid rgba(255,255,255,0.06)",
        borderBottom: "1px solid rgba(255,255,255,0.06)",
      }}
    >
      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-64 h-64 rounded-full blur-[100px] bg-primary/10 pointer-events-none" />
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-64 h-64 rounded-full blur-[100px] bg-accent/10 pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <motion.div
          className="text-center mb-14"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={fadeUp}
        >
          <span className="text-white/30 text-xs font-bold uppercase tracking-[0.2em]">
            By the Numbers
          </span>
        </motion.div>

        <motion.div
          className="grid grid-cols-2 lg:grid-cols-4"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
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
      </div>
    </section>
  );
}
