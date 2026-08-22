"use client";

import { fadeUp, scaleIn, slideInLeft, slideInRight, staggerContainer } from "@/lib/animations";
import { motion, type Variants } from "framer-motion";
import {
  ArrowRight,
  Calendar,
  Compass,
  Flag,
  Heart,
  Lightbulb,
  MapPin,
  Rocket,
  ShieldCheck,
  Target,
  TrendingUp,
} from "lucide-react";
import Link from "next/link";
import { useRef, useState } from "react";
import { useMotionSafe } from "@/hooks/useMotionSafe";

/* ─── Data ─────────────────────────────────────────────────────────── */

const values = [
  {
    icon: Lightbulb,
    number: "01",
    title: "Craft",
    description:
      "We care about the quality of what we ship - clean architecture, readable code, and UIs that don't embarrass the client. Good craft isn't slower. It's what makes projects maintainable 18 months later.",
  },
  {
    icon: ShieldCheck,
    number: "02",
    title: "Reliability",
    description:
      "Deadlines are commitments, not suggestions. We ship on time, communicate proactively when anything changes, and stand behind everything we build long after launch.",
  },
  {
    icon: Heart,
    number: "03",
    title: "Clarity",
    description:
      "No jargon, no mystery. The client always knows what's being built, what's next, and why decisions are being made. Clear communication is part of the deliverable.",
  },
  {
    icon: Rocket,
    number: "04",
    title: "Pragmatism",
    description:
      "We pick the right tool for the job - not the trendiest one. Modern stack where it matters, simplicity where it serves the project better. Results over resume-driven development.",
  },
];

const milestones = [
  {
    year: "2024",
    icon: Flag,
    title: "Founded",
    description:
      "Xpersive Labs was founded in Colombo, Sri Lanka. Set out to build a software studio that delivers production-grade work without the agency overhead.",
  },
  {
    year: "2024",
    icon: Target,
    title: "First Product Shipped",
    description:
      "Built and shipped a Python-based Alibaba supplier intelligence tool - automating 8-10 hours of weekly manual research for an Australian importer. First proof that automation saves real time.",
  },
  {
    year: "2025",
    icon: TrendingUp,
    title: "Website Launched",
    description:
      "Launched xpersivelabs.com - built with Next.js 14, Framer Motion, and Keystatic CMS. Opened officially for client web development and automation projects.",
  },
  {
    year: "2026",
    icon: Compass,
    title: "Raj Ceylon Tours Delivered",
    description:
      "Built a multilingual luxury tourism platform for Raj Ceylon Tours - custom itinerary UX, Framer Motion animations, and a tree-planting experience tied to each booking. First international web project live.",
  },
];

/* ─── Value card ────────────────────────────────────────────────────── */
function ValueCard({ v }: { v: typeof values[number] }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [spot, setSpot] = useState({ x: 0, y: 0, on: false });
  const [hovered, setHovered] = useState(false);
  const { shouldAnimate } = useMotionSafe();

  const animProps = shouldAnimate ? {
    variants: scaleIn,
    whileHover: { y: -8, boxShadow: "0 20px 60px rgba(109,113,249,0.15)" },
    transition: { type: "spring" as const, stiffness: 200, damping: 22 },
    onMouseMove: (e: React.MouseEvent<HTMLDivElement>) => {
      const r = cardRef.current?.getBoundingClientRect();
      if (r) setSpot({ x: e.clientX - r.left, y: e.clientY - r.top, on: true });
    },
    onMouseEnter: () => setHovered(true),
    onMouseLeave: () => { setSpot((s) => ({ ...s, on: false })); setHovered(false); },
  } : { initial: false };

  return (
    <motion.div
      ref={cardRef}
      {...animProps}
      className="group relative flex flex-col rounded-3xl border border-white/6 hover:border-primary/30 overflow-hidden transition-colors duration-350"
      style={{ padding: 32, background: "rgba(255,255,255,0.02)" }}
    >
      <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{ background: "rgba(109,113,249,0.04)" }} />
      {shouldAnimate && (
        <div className="absolute inset-0 pointer-events-none"
          style={{ opacity: spot.on ? 1 : 0, transition: "opacity 0.2s ease",
            background: `radial-gradient(circle at ${spot.x}px ${spot.y}px, rgba(109,113,249,0.08) 0%, transparent 60%)` }} />
      )}
      <span className="absolute top-4 right-5 font-display font-extrabold select-none pointer-events-none leading-none"
        style={{ fontSize: 80, color: "rgba(109,113,249,0.06)" }}>{v.number}</span>
      <div className="relative inline-flex items-center justify-center w-10 h-10 mb-6 transition-all duration-300 group-hover:rotate-[5deg] shrink-0"
        style={{ borderRadius: 12, background: "linear-gradient(135deg, rgba(109,113,249,0.2), rgba(84,193,251,0.2))", border: "1px solid rgba(109,113,249,0.3)" }}>
        <v.icon size={20} className="text-primary" />
      </div>
      <h3 className="relative font-display font-bold mb-3 text-white" style={{ fontSize: 20 }}>{v.title}</h3>
      <p className="relative flex-1 text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.5)" }}>{v.description}</p>
      <div className="relative mt-6 h-px" style={{ background: "rgba(255,255,255,0.06)" }}>
        <div className="absolute inset-y-0 left-0 h-full"
          style={{ width: hovered ? "100%" : "0%", background: "linear-gradient(90deg, #6D71F9, transparent)", transition: "width 0.4s ease" }} />
      </div>
    </motion.div>
  );
}

/* ─── Page ──────────────────────────────────────────────────────────── */
export default function AboutPage() {
  const { shouldAnimate } = useMotionSafe();

  const mountProps = shouldAnimate ? {
    variants: staggerContainer,
    initial: "hidden",
    animate: "visible",
  } : { initial: false };

  const scrollProps = (variants: Variants) => shouldAnimate ? {
    variants,
    initial: "hidden",
    whileInView: "visible" as const,
    viewport: { once: true, margin: "-80px" },
  } : { initial: false };

  const childProps = (variants: Variants) => shouldAnimate ? { variants } : { initial: false };

  const ambientProps = shouldAnimate ? {
    animate: { scale: [1, 1.12, 1] },
    transition: { duration: 8, repeat: Infinity, ease: "easeInOut" as const },
  } : {};

  return (
    <div className="bg-dark text-white overflow-x-hidden">
      {/* Hero */}
      <section className="relative pt-40 pb-28 overflow-hidden">
        <motion.div
          className="absolute -top-32 -left-32 w-125 h-125 rounded-full blur-[120px] pointer-events-none"
          style={{ background: "radial-gradient(circle, rgba(109,113,249,0.35) 0%, transparent 70%)" }}
          {...ambientProps}
        />
        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <motion.div {...mountProps} className="max-w-3xl">
            <motion.div {...childProps(fadeUp)} className="flex items-center gap-2 mb-6">
              <MapPin size={14} className="text-primary" />
              <span className="text-primary text-xs font-bold uppercase" style={{ letterSpacing: "0.14em" }}>Colombo, Sri Lanka</span>
            </motion.div>
            <motion.h1 {...childProps(fadeUp)} className="font-display text-5xl sm:text-6xl lg:text-7xl font-bold leading-[1.05] mb-7">
              About <span className="text-gradient">Xpersive Labs</span>
            </motion.h1>
            <motion.p {...childProps(fadeUp)} className="text-white/55 text-lg sm:text-xl leading-relaxed max-w-2xl">
              A boutique software studio from Colombo, Sri Lanka - building web applications, automation systems, and AI-powered tools for businesses in AU, UK, and US.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Story */}
      <section className="py-24 border-t border-white/[0.07]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div {...scrollProps(staggerContainer)}>
              <motion.span {...childProps(fadeUp)} className="inline-block text-primary text-xs font-bold uppercase mb-4" style={{ letterSpacing: "0.14em" }}>
                Our Story
              </motion.span>
              <motion.h2 {...childProps(fadeUp)} className="font-display font-bold mb-7 leading-tight" style={{ fontSize: "clamp(32px, 4vw, 48px)" }}>
                Built to <span className="text-gradient">Build Well</span>
              </motion.h2>
              <motion.div {...childProps(fadeUp)} className="space-y-5 leading-relaxed" style={{ color: "rgba(255,255,255,0.6)" }}>
                <p>Xpersive Labs was founded in 2024 in Colombo, Sri Lanka. The goal was simple: build production-grade software that actually works - clean code, real deliverables, no bloat.</p>
                <p>We specialise in web application development, automation pipelines, and AI workflow integration for businesses in AU, UK, and US. Every project gets direct senior-developer access from scoping to launch - no account managers, no dropped context.</p>
              </motion.div>
              <motion.div {...childProps(fadeUp)} className="flex flex-wrap gap-3 mt-6">
                <Link href="/services" className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline underline-offset-4">
                  View Our Services <ArrowRight size={14} />
                </Link>
                <span className="text-white/20">·</span>
                <Link href="/portfolio" className="inline-flex items-center gap-2 text-sm font-semibold text-white/60 hover:text-white transition-colors">
                  See Our Work <ArrowRight size={14} />
                </Link>
              </motion.div>
            </motion.div>

            <motion.div {...childProps(fadeUp)} {...(shouldAnimate ? { initial: "hidden", whileInView: "visible", viewport: { once: true, margin: "-80px" } } : { initial: false })}>
              <div className="relative rounded-2xl overflow-hidden border border-white/10 p-10" style={{ background: "rgba(255,255,255,0.02)" }}>
                <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse at 60% 20%, rgba(109,113,249,0.12) 0%, transparent 60%)" }} />
                <div className="relative z-10 space-y-8">
                  {[
                    { label: "Founded", value: "2024", icon: Calendar },
                    { label: "Location", value: "Colombo, Sri Lanka", icon: MapPin },
                    { label: "Markets Served", value: "AU, UK, US", icon: Flag },
                    { label: "Focus", value: "Web Development, Automation, AI Workflows", icon: TrendingUp },
                  ].map(({ label, value, icon: Icon }) => (
                    <div key={label} className="flex items-center gap-5">
                      <div className="shrink-0 w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                        <Icon size={18} className="text-primary" />
                      </div>
                      <div>
                        <p className="text-xs text-white/35 uppercase tracking-widest font-medium">{label}</p>
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

      {/* Mission & Vision */}
      <section className="py-24 border-t border-white/[0.07]">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div className="text-center mb-16" {...scrollProps(staggerContainer)}>
            <motion.span {...childProps(fadeUp)} className="inline-block text-accent text-xs font-bold uppercase mb-4" style={{ letterSpacing: "0.14em" }}>Purpose</motion.span>
            <motion.h2 {...childProps(fadeUp)} className="font-display font-bold" style={{ fontSize: "clamp(32px, 4vw, 48px)" }}>Mission &amp; Vision</motion.h2>
          </motion.div>
          <motion.div className="grid grid-cols-1 md:grid-cols-2 gap-6" {...scrollProps(staggerContainer)}>
            <motion.div {...childProps(slideInLeft)} className="relative p-10 rounded-2xl border border-white/10 overflow-hidden group hover:border-primary/30 transition-colors duration-300" style={{ background: "rgba(255,255,255,0.02)" }}>
              <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ background: "radial-gradient(ellipse at 50% 0%, rgba(109,113,249,0.1) 0%, transparent 65%)" }} />
              <div className="relative z-10">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-primary/10 mb-7"><Target size={22} className="text-primary" /></div>
                <p className="text-xs font-bold uppercase mb-3" style={{ letterSpacing: "0.14em", color: "#6D71F9" }}>Mission</p>
                <h3 className="font-display text-2xl font-bold mb-5 leading-snug">Build software that performs in production</h3>
                <p className="leading-relaxed" style={{ color: "rgba(255,255,255,0.55)", fontSize: 15 }}>Build clean, fast web applications and automation systems that do exactly what the client needs - shipped on time, maintained honestly, and built to last beyond the first deployment.</p>
              </div>
            </motion.div>
            <motion.div {...childProps(slideInRight)} className="relative p-10 rounded-2xl border border-white/10 overflow-hidden group hover:border-accent/30 transition-colors duration-300" style={{ background: "rgba(255,255,255,0.02)" }}>
              <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ background: "radial-gradient(ellipse at 50% 0%, rgba(84,193,251,0.1) 0%, transparent 65%)" }} />
              <div className="relative z-10">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-accent/10 mb-7"><Compass size={22} className="text-accent" /></div>
                <p className="text-xs font-bold uppercase mb-3" style={{ letterSpacing: "0.14em", color: "#54C1FB" }}>Vision</p>
                <h3 className="font-display text-2xl font-bold mb-5 leading-snug">Be the go-to software studio for growing businesses in AU, UK, and US</h3>
                <p className="leading-relaxed" style={{ color: "rgba(255,255,255,0.55)", fontSize: 15 }}>Build a reputation for delivering software that works - consistently, on budget, and without the overhead of a large agency. One senior developer. Full accountability.</p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Values */}
      <section className="py-24 border-t border-white/[0.07]">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div className="text-center mb-16" {...scrollProps(staggerContainer)}>
            <motion.span {...childProps(fadeUp)} className="inline-block text-xs font-bold uppercase mb-4" style={{ color: "#6D71F9", letterSpacing: "0.14em" }}>What We Stand For</motion.span>
            <motion.h2 {...childProps(fadeUp)} className="font-display font-bold" style={{ fontSize: "clamp(32px, 4vw, 48px)" }}>Our Values</motion.h2>
          </motion.div>
          <motion.div className="grid grid-cols-1 sm:grid-cols-2 gap-6" {...scrollProps(staggerContainer)}>
            {values.map((v) => <ValueCard key={v.title} v={v} />)}
          </motion.div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-24 border-t border-white/[0.07]">
        <div className="max-w-5xl mx-auto px-6">
          <motion.div className="text-center mb-16" {...scrollProps(staggerContainer)}>
            <motion.span {...childProps(fadeUp)} className="inline-block text-xs font-bold uppercase mb-4" style={{ color: "#F59E0B", letterSpacing: "0.14em" }}>Our Journey</motion.span>
            <motion.h2 {...childProps(fadeUp)} className="font-display font-bold" style={{ fontSize: "clamp(32px, 4vw, 48px)" }}>Milestones</motion.h2>
          </motion.div>

          <div className="relative">
            <div className="hidden lg:block absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px" style={{ background: "rgba(109,113,249,0.2)" }} />
            <div className="space-y-10 lg:space-y-8">
              {milestones.map((m, i) => {
                const isLeft = i % 2 === 0;
                return (
                  <motion.div
                    key={i}
                    className="flex flex-col lg:grid lg:grid-cols-[1fr_120px_1fr] lg:items-center"
                    {...(shouldAnimate ? {
                      variants: isLeft ? slideInLeft : slideInRight,
                      initial: "hidden",
                      whileInView: "visible" as const,
                      viewport: { once: true, margin: "-80px" },
                    } : { initial: false })}
                  >
                    <div className={isLeft ? "hidden lg:block lg:pr-8 lg:text-right" : "hidden lg:block"}>
                      {isLeft && <MilestoneCard milestone={m} />}
                    </div>
                    <div className="flex flex-col items-center relative z-10 py-3 lg:py-0">
                      <div className="w-12 h-12 rounded-full flex items-center justify-center border border-white/10"
                        style={{ background: "rgba(109,113,249,0.12)", boxShadow: "0 0 0 5px #272848" }}>
                        <m.icon size={18} className="text-primary" />
                      </div>
                      <span className="mt-2 px-3 py-0.5 rounded-full text-xs font-bold"
                        style={{ background: "rgba(109,113,249,0.15)", color: "#6D71F9", border: "1px solid rgba(109,113,249,0.3)" }}>
                        {m.year}
                      </span>
                    </div>
                    <div className={!isLeft ? "hidden lg:block lg:pl-8" : "hidden lg:block"}>
                      {!isLeft && <MilestoneCard milestone={m} />}
                    </div>
                    <div className="lg:hidden -mt-1 col-span-3">
                      <MilestoneCard milestone={m} />
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 border-t border-white/[0.07]">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div className="text-center" {...scrollProps(staggerContainer)}>
            <motion.h2 {...childProps(fadeUp)} className="font-display text-3xl sm:text-4xl font-bold mb-5">Ready to build together?</motion.h2>
            <motion.p {...childProps(fadeUp)} className="text-white/50 mb-8 max-w-md mx-auto">Tell us what you need. We will scope it and build it right.</motion.p>
            <motion.div {...childProps(fadeUp)}>
              <Link href="/contact" className="inline-flex items-center gap-2.5 px-8 py-4 rounded-full font-bold text-white transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-primary/25"
                style={{ background: "linear-gradient(135deg, #6D71F9, #54C1FB)" }}>
                Get in Touch <ArrowRight size={17} />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

function MilestoneCard({ milestone }: { milestone: typeof milestones[number] }) {
  return (
    <div className="p-6 rounded-2xl border border-white/6 hover:border-primary/20 transition-colors duration-300" style={{ background: "rgba(255,255,255,0.02)" }}>
      <h3 className="font-display text-lg font-bold mb-2 text-white">{milestone.title}</h3>
      <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.5)" }}>{milestone.description}</p>
    </div>
  );
}
