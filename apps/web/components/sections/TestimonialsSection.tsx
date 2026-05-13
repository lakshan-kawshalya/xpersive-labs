"use client";

import { fadeUp, staggerContainer } from "@/lib/animations";
import { motion } from "framer-motion";
import { Clock, Shield, Star } from "lucide-react";

const principles = [
  {
    icon: Shield,
    title: "Transparent Communication",
    body: "We keep you in the loop at every stage - no surprises, no black boxes. You always know what's being built and why.",
    color: "text-primary",
    bg: "bg-primary/10",
    border: "hover:border-primary/25",
    glow: "rgba(109, 113, 249, 0.08)",
  },
  {
    icon: Clock,
    title: "On-Time Delivery",
    body: "We scope carefully and commit seriously. Your deadlines are our deadlines, not a suggestion.",
    color: "text-accent",
    bg: "bg-accent/10",
    border: "hover:border-accent/25",
    glow: "rgba(84, 193, 251, 0.08)",
  },
  {
    icon: Star,
    title: "Quality Over Quantity",
    body: "We'd rather do two things exceptionally well than ten things poorly. Every project gets our full attention.",
    color: "text-purple-400",
    bg: "bg-purple-500/10",
    border: "hover:border-purple-500/25",
    glow: "rgba(168, 85, 247, 0.08)",
  },
];

export default function TestimonialsSection() {
  return (
    <section className="py-28 bg-dark relative overflow-hidden">
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(109,113,249,1) 1px, transparent 1px), linear-gradient(to right, rgba(109,113,249,1) 1px, transparent 1px)",
          backgroundSize: "72px 72px",
        }}
      />

      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <motion.div
          className="text-center mb-16"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <motion.span
            variants={fadeUp}
            className="inline-block text-primary text-xs font-bold uppercase tracking-[0.2em] mb-4"
          >
            Our Principles
          </motion.span>
          <motion.h2
            variants={fadeUp}
            className="font-display text-4xl sm:text-5xl font-bold mb-4"
          >
            How We Work
          </motion.h2>
          <motion.p
            variants={fadeUp}
            className="text-white/45 text-lg max-w-md mx-auto"
          >
            What you can expect from every project we take on.
          </motion.p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {principles.map((p) => (
            <motion.div
              key={p.title}
              variants={fadeUp}
              whileHover={{ y: -6 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className={`relative p-8 rounded-2xl bg-white/[0.03] border border-white/10 ${p.border} transition-colors duration-300 flex flex-col`}
            >
              <div
                className="absolute inset-0 rounded-2xl opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                style={{ background: `radial-gradient(ellipse at 50% 0%, ${p.glow} 0%, transparent 70%)` }}
              />

              <div className={`relative inline-flex items-center justify-center w-12 h-12 rounded-xl ${p.bg} mb-6 flex-shrink-0`}>
                <p.icon size={22} className={p.color} />
              </div>

              <h3 className="relative font-display text-xl font-bold mb-3">
                {p.title}
              </h3>
              <p className="relative text-white/55 text-sm leading-[1.8] flex-1">
                {p.body}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
