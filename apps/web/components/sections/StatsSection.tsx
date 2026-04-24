"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Trophy, Users, Clock, Cpu } from "lucide-react";
import { staggerContainer, fadeUp } from "@/lib/animations";

const stats = [
  {
    icon: Trophy,
    value: 20,
    suffix: "+",
    label: "Projects Completed",
    color: "text-primary",
    bg: "bg-primary/10",
    glow: "rgba(109, 113, 249, 0.15)",
  },
  {
    icon: Users,
    value: 15,
    suffix: "+",
    label: "Happy Clients",
    color: "text-accent",
    bg: "bg-accent/10",
    glow: "rgba(84, 193, 251, 0.15)",
  },
  {
    icon: Clock,
    value: 2,
    suffix: "+",
    label: "Years of Experience",
    color: "text-purple-400",
    bg: "bg-purple-500/10",
    glow: "rgba(168, 85, 247, 0.15)",
  },
  {
    icon: Cpu,
    value: 10,
    suffix: "+",
    label: "Technologies Used",
    color: "text-pink-400",
    bg: "bg-pink-500/10",
    glow: "rgba(236, 72, 153, 0.15)",
  },
];

function AnimatedCounter({
  target,
  suffix,
  color,
}: {
  target: number;
  suffix: string;
  color: string;
}) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    const duration = 1400;
    const steps = 45;
    const stepTime = duration / steps;
    let step = 0;
    const timer = setInterval(() => {
      step++;
      const progress = step / steps;
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * target));
      if (step >= steps) clearInterval(timer);
    }, stepTime);
    return () => clearInterval(timer);
  }, [inView, target]);

  return (
    <span ref={ref} className={`font-display text-5xl sm:text-6xl font-bold ${color}`}>
      {count}
      {suffix}
    </span>
  );
}

export default function StatsSection() {
  return (
    <section className="py-24 relative overflow-hidden border-y border-white/[0.07]">
      <div className="absolute inset-0 bg-dark" />

      {/* Side glows */}
      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-64 h-64 rounded-full blur-[100px] bg-primary/10 pointer-events-none" />
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-64 h-64 rounded-full blur-[100px] bg-accent/10 pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Optional eyebrow */}
        <motion.div
          className="text-center mb-14"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={fadeUp}
        >
          <span className="inline-block text-white/30 text-xs font-bold uppercase tracking-[0.2em]">
            By the Numbers
          </span>
        </motion.div>

        <motion.div
          className="grid grid-cols-2 lg:grid-cols-4 gap-10"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
        >
          {stats.map((stat) => (
            <motion.div
              key={stat.label}
              variants={fadeUp}
              className="flex flex-col items-center text-center group"
            >
              {/* Icon */}
              <div
                className={`inline-flex items-center justify-center w-12 h-12 rounded-full ${stat.bg} mb-5 transition-transform duration-300 group-hover:scale-110`}
                style={{ boxShadow: `0 0 20px ${stat.glow}` }}
              >
                <stat.icon size={20} className={stat.color} />
              </div>

              {/* Counter */}
              <AnimatedCounter
                target={stat.value}
                suffix={stat.suffix}
                color={stat.color}
              />

              {/* Label */}
              <p className="mt-2 text-white/45 text-sm font-medium">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
