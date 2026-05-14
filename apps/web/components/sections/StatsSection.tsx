"use client";

import { fadeUp, scaleIn, staggerContainer } from "@/lib/animations";
import { motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const stats = [
  { value: 2, suffix: "+", label: "YEARS ACTIVE" },
  { value: 2, suffix: "",  label: "PROJECTS DELIVERED" },
  { value: 5, suffix: "+", label: "TECHNOLOGIES" },
  { value: 2, suffix: "",  label: "CORE SERVICES" },
];

function AnimatedCounter({ target, suffix }: { target: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  useEffect(() => {
    if (!inView) return;
    const duration = 2000;
    const steps = 60;
    const stepTime = duration / steps;
    let step = 0;
    const timer = setInterval(() => {
      step++;
      const progress = step / steps;
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * target));
      if (step >= steps) clearInterval(timer);
    }, stepTime);
    return () => clearInterval(timer);
  }, [inView, target]);

  return (
    <span ref={ref} className="font-display font-extrabold text-gradient" style={{ fontSize: "clamp(40px, 5vw, 56px)" }}>
      {count}{suffix}
    </span>
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
            <motion.div
              key={stat.label}
              variants={scaleIn}
              transition={{ delay: i * 0.1 }}
              className="relative flex flex-col items-center text-center px-6 py-4"
            >
              {/* Vertical divider (hidden on mobile, hidden after last item) */}
              {i < stats.length - 1 && (
                <div
                  className="hidden lg:block absolute right-0 top-1/2 -translate-y-1/2 h-12 w-px"
                  style={{ background: "rgba(255,255,255,0.06)" }}
                />
              )}

              <AnimatedCounter target={stat.value} suffix={stat.suffix} />

              <p
                className="mt-2 font-medium tracking-[0.05em] uppercase"
                style={{ fontSize: 14, color: "rgba(255,255,255,0.45)" }}
              >
                {stat.label}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
