"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  Lightbulb,
  ShieldCheck,
  Heart,
  Rocket,
  ArrowRight,
  MapPin,
  Calendar,
  Flag,
  TrendingUp,
  Target,
  Compass,
} from "lucide-react";
import { fadeUp, staggerContainer } from "@/lib/animations";

/* ─── Data ─────────────────────────────────────────────────────────── */

const values = [
  {
    icon: Lightbulb,
    title: "Innovation",
    description:
      "We embrace the frontier of technology, constantly exploring new tools, frameworks, and approaches to solve problems no one has cracked yet.",
    color: "text-primary",
    bg: "bg-primary/10",
    border: "hover:border-primary/30",
    glow: "rgba(109,113,249,0.08)",
  },
  {
    icon: ShieldCheck,
    title: "Reliability",
    description:
      "Deadlines are commitments, not suggestions. We ship on time, communicate clearly, and stand behind everything we build long after launch.",
    color: "text-accent",
    bg: "bg-accent/10",
    border: "hover:border-accent/30",
    glow: "rgba(84,193,251,0.08)",
  },
  {
    icon: Heart,
    title: "User-Centric",
    description:
      "Every design decision, every line of code is made with the end user in mind. If it doesn't delight the people using it, we go back to the drawing board.",
    color: "text-pink-400",
    bg: "bg-pink-500/10",
    border: "hover:border-pink-500/30",
    glow: "rgba(236,72,153,0.08)",
  },
  {
    icon: Rocket,
    title: "Cutting-Edge",
    description:
      "We don't follow trends — we help set them. From AI integrations to immersive UI patterns, we push boundaries to give our clients a competitive edge.",
    color: "text-purple-400",
    bg: "bg-purple-500/10",
    border: "hover:border-purple-500/30",
    glow: "rgba(168,85,247,0.08)",
  },
];

const milestones = [
  {
    year: "2023",
    icon: Flag,
    title: "Founded",
    description:
      "Xpersive Labs was established in Colombo, Sri Lanka with a mission to build immersive digital experiences for forward-thinking businesses.",
    color: "text-primary",
    bg: "bg-primary/10",
    line: "from-primary/40",
  },
  {
    year: "2023",
    icon: Target,
    title: "First Client",
    description:
      "Landed our first enterprise client and delivered a full-stack web application ahead of schedule — setting the tone for everything that followed.",
    color: "text-accent",
    bg: "bg-accent/10",
    line: "from-accent/40",
  },
  {
    year: "2024",
    icon: TrendingUp,
    title: "Team Expansion",
    description:
      "Grew to a cross-functional team of designers, engineers, and strategists — enabling us to take on larger, more complex projects.",
    color: "text-purple-400",
    bg: "bg-purple-500/10",
    line: "from-purple-500/40",
  },
  {
    year: "2024",
    icon: Compass,
    title: "Mobile Practice Launched",
    description:
      "Expanded our service offering with a dedicated React Native mobile division, shipping two cross-platform apps within the first quarter.",
    color: "text-pink-400",
    bg: "bg-pink-500/10",
    line: "from-pink-500/40",
  },
  {
    year: "2025",
    icon: Rocket,
    title: "20+ Projects Delivered",
    description:
      "Crossed the 20-project milestone with clients spanning healthcare, fintech, retail, and SaaS — across Sri Lanka, Asia, and beyond.",
    color: "text-amber-400",
    bg: "bg-amber-500/10",
    line: "from-amber-500/40",
  },
];

/* ─── Page ──────────────────────────────────────────────────────────── */

export default function AboutPage() {
  return (
    <div className="bg-dark text-white">
      {/* ── Hero ───────────────────────────────────────────────────── */}
      <section className="relative pt-40 pb-28 overflow-hidden">
        {/* Orbs */}
        <motion.div
          className="absolute -top-32 -left-32 w-[500px] h-[500px] rounded-full blur-[120px] pointer-events-none"
          style={{ background: "radial-gradient(circle, rgba(109,113,249,0.35) 0%, transparent 70%)" }}
          animate={{ scale: [1, 1.12, 1] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute -bottom-20 -right-32 w-[400px] h-[400px] rounded-full blur-[100px] pointer-events-none"
          style={{ background: "radial-gradient(circle, rgba(84,193,251,0.25) 0%, transparent 70%)" }}
          animate={{ scale: [1, 1.15, 1] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 3 }}
        />
        {/* Dot grid */}
        <div
          className="absolute inset-0 opacity-[0.06] pointer-events-none"
          style={{
            backgroundImage: "radial-gradient(circle, #6D71F9 1px, transparent 1px)",
            backgroundSize: "36px 36px",
          }}
        />

        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="max-w-3xl"
          >
            <motion.div variants={fadeUp} className="flex items-center gap-2 mb-6">
              <MapPin size={14} className="text-primary" />
              <span className="text-primary text-xs font-bold uppercase tracking-[0.2em]">
                Colombo, Sri Lanka
              </span>
            </motion.div>

            <motion.h1
              variants={fadeUp}
              className="font-display text-5xl sm:text-6xl lg:text-7xl font-bold leading-[1.05] mb-7"
            >
              About{" "}
              <span className="text-gradient">Xpersive Labs</span>
            </motion.h1>

            <motion.p
              variants={fadeUp}
              className="text-white/55 text-lg sm:text-xl leading-relaxed max-w-2xl"
            >
              We are a Sri Lankan software startup on a mission to revolutionize
              how people interact with technology — building immersive, cutting-edge
              digital experiences that drive progress across industries.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* ── Story ──────────────────────────────────────────────────── */}
      <section className="py-24 border-t border-white/[0.07]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Text */}
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
            >
              <motion.span
                variants={fadeUp}
                className="inline-block text-primary text-xs font-bold uppercase tracking-[0.2em] mb-4"
              >
                Our Story
              </motion.span>
              <motion.h2
                variants={fadeUp}
                className="font-display text-4xl sm:text-5xl font-bold mb-7 leading-tight"
              >
                Born to Build the{" "}
                <span className="text-gradient">Future</span>
              </motion.h2>
              <motion.div
                variants={fadeUp}
                className="space-y-5 text-white/60 leading-relaxed"
              >
                <p>
                  Xpersive Labs was founded with a simple but powerful belief: great
                  technology should feel like magic. Nestled in the heart of Colombo,
                  we set out to create software experiences that don&apos;t just
                  function — they captivate, inspire, and transform.
                </p>
                <p>
                  From our first commit to our most recent delivery, every project we
                  take on is treated as an opportunity to push the boundaries of what&apos;s
                  possible. We&apos;re not just building apps — we&apos;re crafting the digital
                  layer of tomorrow&apos;s world.
                </p>
                <p>
                  Our team combines deep engineering expertise with a designer&apos;s eye
                  for detail, moving fast without sacrificing craft. We believe the
                  best software is both beautiful and bulletproof.
                </p>
              </motion.div>
            </motion.div>

            {/* Visual card */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeUp}
              className="relative"
            >
              <div className="relative rounded-2xl overflow-hidden border border-white/10 bg-white/[0.03] p-10">
                {/* Background gradient */}
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background:
                      "radial-gradient(ellipse at 60% 20%, rgba(109,113,249,0.12) 0%, transparent 60%)",
                  }}
                />
                <div className="relative z-10 space-y-8">
                  {[
                    { label: "Founded", value: "2023", icon: Calendar },
                    { label: "Location", value: "Colombo, Sri Lanka", icon: MapPin },
                    { label: "Projects Delivered", value: "20+", icon: Flag },
                    { label: "Team Members", value: "Growing", icon: TrendingUp },
                  ].map(({ label, value, icon: Icon }) => (
                    <div key={label} className="flex items-center gap-5">
                      <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                        <Icon size={18} className="text-primary" />
                      </div>
                      <div>
                        <p className="text-xs text-white/35 uppercase tracking-widest font-medium">
                          {label}
                        </p>
                        <p className="text-white font-semibold">{value}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Mission & Vision ───────────────────────────────────────── */}
      <section className="py-24 border-t border-white/[0.07]">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            className="text-center mb-16"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            <motion.span
              variants={fadeUp}
              className="inline-block text-accent text-xs font-bold uppercase tracking-[0.2em] mb-4"
            >
              Purpose
            </motion.span>
            <motion.h2
              variants={fadeUp}
              className="font-display text-4xl sm:text-5xl font-bold"
            >
              Mission &amp; Vision
            </motion.h2>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            {/* Mission */}
            <motion.div
              variants={fadeUp}
              className="relative p-10 rounded-2xl border border-white/10 bg-white/[0.03] overflow-hidden group hover:border-primary/30 transition-colors duration-300"
            >
              <div
                className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{
                  background:
                    "radial-gradient(ellipse at 50% 0%, rgba(109,113,249,0.1) 0%, transparent 65%)",
                }}
              />
              <div className="relative z-10">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-primary/10 mb-7">
                  <Target size={22} className="text-primary" />
                </div>
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary mb-3">
                  Mission
                </p>
                <h3 className="font-display text-2xl font-bold mb-5 leading-snug">
                  Drive progress through technology
                </h3>
                <p className="text-white/55 leading-relaxed">
                  Develop cutting-edge technologies that drive progress and enhance
                  human experience across diverse industries — making powerful
                  digital tools accessible and impactful for everyone.
                </p>
              </div>
            </motion.div>

            {/* Vision */}
            <motion.div
              variants={fadeUp}
              className="relative p-10 rounded-2xl border border-white/10 bg-white/[0.03] overflow-hidden group hover:border-accent/30 transition-colors duration-300"
            >
              <div
                className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{
                  background:
                    "radial-gradient(ellipse at 50% 0%, rgba(84,193,251,0.1) 0%, transparent 65%)",
                }}
              />
              <div className="relative z-10">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-accent/10 mb-7">
                  <Compass size={22} className="text-accent" />
                </div>
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-accent mb-3">
                  Vision
                </p>
                <h3 className="font-display text-2xl font-bold mb-5 leading-snug">
                  Revolutionize human–tech interaction
                </h3>
                <p className="text-white/55 leading-relaxed">
                  Revolutionize how people interact with technology by fully
                  immersing them in a new world of possibilities — where digital
                  experiences feel as natural and engaging as the world itself.
                </p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── Values ─────────────────────────────────────────────────── */}
      <section className="py-24 border-t border-white/[0.07]">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            className="text-center mb-16"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            <motion.span
              variants={fadeUp}
              className="inline-block text-purple-400 text-xs font-bold uppercase tracking-[0.2em] mb-4"
            >
              What We Stand For
            </motion.span>
            <motion.h2
              variants={fadeUp}
              className="font-display text-4xl sm:text-5xl font-bold"
            >
              Our Values
            </motion.h2>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            {values.map((v) => (
              <motion.div
                key={v.title}
                variants={fadeUp}
                whileHover={{ y: -6 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className={`group relative p-7 rounded-2xl border border-white/10 bg-white/[0.03] ${v.border} transition-colors duration-300`}
              >
                <div
                  className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                  style={{
                    background: `radial-gradient(ellipse at 50% 0%, ${v.glow} 0%, transparent 70%)`,
                  }}
                />
                <div className={`relative inline-flex items-center justify-center w-12 h-12 rounded-xl ${v.bg} mb-6`}>
                  <v.icon size={22} className={v.color} />
                </div>
                <h3 className="relative font-display text-lg font-bold mb-3">
                  {v.title}
                </h3>
                <p className="relative text-white/50 text-sm leading-relaxed">
                  {v.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Timeline ───────────────────────────────────────────────── */}
      <section className="py-24 border-t border-white/[0.07]">
        <div className="max-w-4xl mx-auto px-6">
          <motion.div
            className="text-center mb-16"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            <motion.span
              variants={fadeUp}
              className="inline-block text-amber-400 text-xs font-bold uppercase tracking-[0.2em] mb-4"
            >
              Our Journey
            </motion.span>
            <motion.h2
              variants={fadeUp}
              className="font-display text-4xl sm:text-5xl font-bold"
            >
              Milestones
            </motion.h2>
          </motion.div>

          <motion.div
            className="relative"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            {/* Vertical line */}
            <div className="absolute left-[27px] top-0 bottom-0 w-px bg-white/10 hidden sm:block" />

            <div className="space-y-10">
              {milestones.map((m, i) => (
                <motion.div
                  key={i}
                  variants={fadeUp}
                  className="flex gap-6 group"
                >
                  {/* Icon node */}
                  <div className="relative flex-shrink-0 hidden sm:flex">
                    <div
                      className={`w-14 h-14 rounded-full ${m.bg} flex items-center justify-center z-10 border border-white/10 transition-transform duration-300 group-hover:scale-110`}
                      style={{ boxShadow: `0 0 0 6px rgba(39,40,72,1)` }}
                    >
                      <m.icon size={20} className={m.color} />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1 pb-2">
                    <div className="flex items-center gap-3 mb-2 flex-wrap">
                      <span
                        className={`inline-block px-3 py-1 rounded-full text-xs font-bold ${m.bg} ${m.color}`}
                      >
                        {m.year}
                      </span>
                      <h3 className="font-display text-lg font-bold">{m.title}</h3>
                    </div>
                    <p className="text-white/50 text-sm leading-relaxed">
                      {m.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── CTA ────────────────────────────────────────────────────── */}
      <section className="py-20 border-t border-white/[0.07]">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            className="text-center"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={staggerContainer}
          >
            <motion.h2
              variants={fadeUp}
              className="font-display text-3xl sm:text-4xl font-bold mb-5"
            >
              Ready to build together?
            </motion.h2>
            <motion.p
              variants={fadeUp}
              className="text-white/50 mb-8 max-w-md mx-auto"
            >
              Let&apos;s turn your idea into an experience people will remember.
            </motion.p>
            <motion.div variants={fadeUp}>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2.5 px-8 py-4 rounded-full font-bold text-white transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-primary/25"
                style={{ background: "linear-gradient(135deg, #6D71F9, #54C1FB)" }}
              >
                Get in Touch
                <ArrowRight size={17} />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
