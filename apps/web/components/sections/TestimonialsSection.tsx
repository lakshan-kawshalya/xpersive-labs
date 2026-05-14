"use client";

import { fadeUp } from "@/lib/animations";
import { motion } from "framer-motion";
import { Clock, Shield, Star } from "lucide-react";
import { useRef, useState } from "react";

const principles = [
  {
    icon: Shield,
    number: "01",
    title: "Transparent Communication",
    body: "We keep you in the loop at every stage — no surprises, no black boxes. You always know what's being built and why.",
  },
  {
    icon: Clock,
    number: "02",
    title: "On-Time Delivery",
    body: "We scope carefully and commit seriously. Your deadlines are our deadlines, not a suggestion.",
  },
  {
    icon: Star,
    number: "03",
    title: "Quality Over Quantity",
    body: "We'd rather do two things exceptionally well than ten things poorly. Every project gets our full attention.",
  },
];

function PrincipleCard({ principle }: { principle: typeof principles[number] }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [spot, setSpot] = useState({ x: 0, y: 0, on: false });
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      ref={cardRef}
      variants={fadeUp}
      onMouseMove={(e) => {
        const r = cardRef.current?.getBoundingClientRect();
        if (r) setSpot({ x: e.clientX - r.left, y: e.clientY - r.top, on: true });
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => {
        setSpot((s) => ({ ...s, on: false }));
        setHovered(false);
      }}
      whileHover={{ y: -8, boxShadow: "0 20px 60px rgba(109,113,249,0.15)" }}
      transition={{ type: "spring", stiffness: 200, damping: 22 }}
      className="group relative flex flex-col rounded-3xl border border-white/6 hover:border-primary/30 overflow-hidden transition-colors duration-350"
      style={{ padding: 32, background: "rgba(255,255,255,0.02)" }}
    >
      {/* Hover tint */}
      <div
        className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{ background: "rgba(109,113,249,0.04)" }}
      />
      {/* Spotlight */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          opacity: spot.on ? 1 : 0,
          transition: "opacity 0.2s ease",
          background: `radial-gradient(circle at ${spot.x}px ${spot.y}px, rgba(109,113,249,0.08) 0%, transparent 60%)`,
        }}
      />

      {/* Number watermark */}
      <span
        className="absolute top-4 right-5 font-display font-extrabold select-none pointer-events-none leading-none"
        style={{ fontSize: 80, color: "rgba(109,113,249,0.06)" }}
      >
        {principle.number}
      </span>

      {/* Icon */}
      <div
        className="relative inline-flex items-center justify-center w-10 h-10 mb-6 transition-all duration-300 group-hover:rotate-[5deg] shrink-0"
        style={{
          borderRadius: 12,
          background: "linear-gradient(135deg, rgba(109,113,249,0.2), rgba(84,193,251,0.2))",
          border: "1px solid rgba(109,113,249,0.3)",
        }}
      >
        <principle.icon size={20} className="text-primary" />
      </div>

      <h3 className="relative font-display font-bold mb-3 text-white" style={{ fontSize: 20 }}>
        {principle.title}
      </h3>
      <p
        className="relative flex-1 leading-[1.7]"
        style={{ fontSize: 15, color: "rgba(255,255,255,0.55)" }}
      >
        {principle.body}
      </p>

      {/* Animated bottom line */}
      <div className="relative mt-6 h-px" style={{ background: "rgba(255,255,255,0.06)" }}>
        <div
          className="absolute inset-y-0 left-0 h-full"
          style={{
            width: hovered ? "100%" : "0%",
            background: "linear-gradient(90deg, #6D71F9, transparent)",
            transition: "width 0.4s ease",
          }}
        />
      </div>
    </motion.div>
  );
}

export default function TestimonialsSection() {
  return (
    <section className="py-28 bg-dark relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-150 h-px bg-linear-to-r from-transparent via-white/10 to-transparent" />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <motion.div
          className="text-center mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.12 } } }}
        >
          <motion.span
            variants={fadeUp}
            className="inline-block text-xs font-bold uppercase mb-4"
            style={{ color: "#6D71F9", letterSpacing: "0.12em" }}
          >
            Our Principles
          </motion.span>
          <motion.h2
            variants={fadeUp}
            className="font-display font-bold mb-4"
            style={{ fontSize: "clamp(36px, 5vw, 48px)" }}
          >
            How We Work
          </motion.h2>
          <motion.p variants={fadeUp} className="text-white/45 text-lg max-w-md mx-auto">
            What you can expect from every project we take on.
          </motion.p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.15 } } }}
        >
          {principles.map((p) => (
            <PrincipleCard key={p.title} principle={p} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
