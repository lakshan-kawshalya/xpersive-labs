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
import { useMotionSafe } from "@/hooks/useMotionSafe";
import LayeredStackIllustration from "@/components/illustrations/LayeredStackIllustration";
import SpotlightCard from "@/components/ui/SpotlightCard";
import { LottieAnimation } from "@/components/ui/LottieAnimation";
import { LOTTIE_URLS } from "@/lib/animations-lottie";

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

const heroMilestones = [
  { year: "2024", icon: Flag, title: "Founded" },
  { year: "2024", icon: Target, title: "First project shipped" },
  { year: "2026", icon: Compass, title: "Raj Ceylon delivered" },
];

/* ─── Hero milestone aside ─────────────────────────────────────────── */
function HeroMilestoneAside({ shouldAnimate }: { shouldAnimate: boolean }) {
  return (
    <aside className="hidden lg:block">
      <div className="relative pl-6">
        <div className="absolute left-0 top-1 bottom-1 w-px" style={{ background: "rgba(109,113,249,0.2)" }} />
        <div className="space-y-7">
          {heroMilestones.map((m, i) => (
            <motion.div
              key={m.title}
              className="relative flex items-center gap-3"
              {...(shouldAnimate
                ? {
                    variants: slideInRight,
                    initial: "hidden",
                    animate: "visible",
                    transition: { delay: 0.3 + i * 0.12 },
                  }
                : { initial: false })}
            >
              <div
                className="absolute -left-6 w-3 h-3 rounded-full border border-primary/40"
                style={{ background: "var(--color-bg)" }}
              />
              <div className="shrink-0 w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center">
                <m.icon size={16} className="text-primary" />
              </div>
              <div>
                <span
                  className="block text-[11px] font-bold"
                  style={{ color: "#6D71F9" }}
                >
                  {m.year}
                </span>
                <span className="text-sm font-semibold text-text-primary">{m.title}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </aside>
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
    <div className="text-text-primary overflow-x-hidden">
      {/* Hero */}
      <section className="relative pt-40 pb-28 overflow-hidden">
        <motion.div
          className="absolute -top-32 -left-32 w-125 h-125 rounded-full blur-[120px] pointer-events-none"
          style={{ background: "radial-gradient(circle, rgba(109,113,249,0.1) 0%, transparent 70%)" }}
          {...ambientProps}
        />
        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-[3fr_2fr] gap-12 items-center">
            <motion.div {...mountProps} className="max-w-3xl">
              <motion.div {...childProps(fadeUp)} className="flex items-center gap-2 mb-6">
                <MapPin size={14} className="text-primary" />
                <span className="text-primary text-xs font-bold uppercase" style={{ letterSpacing: "0.14em" }}>Colombo, Sri Lanka</span>
              </motion.div>
              <motion.h1 {...childProps(fadeUp)} className="font-display text-5xl sm:text-6xl lg:text-7xl font-bold leading-[1.05] mb-7 text-text-primary">
                About <span className="text-gradient">Xpersive Labs</span>
              </motion.h1>
              <motion.p {...childProps(fadeUp)} className="text-text-secondary text-lg sm:text-xl leading-relaxed max-w-2xl">
                A boutique software studio from Colombo, Sri Lanka - building web applications, automation systems, and AI-powered tools for businesses in AU, UK, and US.
              </motion.p>
            </motion.div>

            <div className="hidden lg:flex flex-col items-center gap-6">
              <LottieAnimation
                src={LOTTIE_URLS.webDev}
                style={{ width: 220, height: 220 }}
                fallback={null}
              />
              <HeroMilestoneAside shouldAnimate={shouldAnimate} />
            </div>
          </div>
        </div>
      </section>

      {/* Story */}
      <section className="py-24 border-t border-border-subtle">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div {...scrollProps(staggerContainer)}>
              <motion.span {...childProps(fadeUp)} className="inline-block text-primary text-xs font-bold uppercase mb-4" style={{ letterSpacing: "0.14em" }}>
                Our Story
              </motion.span>
              <motion.h2 {...childProps(fadeUp)} className="font-display font-bold mb-7 leading-tight" style={{ fontSize: "clamp(32px, 4vw, 48px)" }}>
                Built to <span className="text-gradient">Build Well</span>
              </motion.h2>
              <motion.div {...childProps(fadeUp)} className="space-y-5 leading-relaxed" style={{ color: "var(--color-text-secondary)" }}>
                <p>Xpersive Labs was founded in 2024 in Colombo, Sri Lanka. The goal was simple: build production-grade software that actually works - clean code, real deliverables, no bloat.</p>
                <p>We specialise in web application development, automation pipelines, and AI workflow integration for businesses in AU, UK, and US. Every project gets direct senior-developer access from scoping to launch - no account managers, no dropped context.</p>
              </motion.div>
              <motion.div {...childProps(fadeUp)} className="flex flex-wrap gap-3 mt-6">
                <Link href="/services" className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline underline-offset-4">
                  View Our Services <ArrowRight size={14} />
                </Link>
                <span className="text-text-muted">·</span>
                <Link href="/portfolio" className="inline-flex items-center gap-2 text-sm font-semibold text-text-secondary hover:text-text-primary transition-colors">
                  See Our Work <ArrowRight size={14} />
                </Link>
              </motion.div>
            </motion.div>

            <motion.div {...childProps(fadeUp)} {...(shouldAnimate ? { initial: "hidden", whileInView: "visible", viewport: { once: true, margin: "-80px" } } : { initial: false })}>
              <LayeredStackIllustration className="hidden lg:block mb-8 ml-2" />
              <div className="relative rounded-2xl overflow-hidden border border-border-subtle p-10" style={{ background: "var(--surface-card)" }}>
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
                        <p className="text-xs text-text-muted uppercase tracking-widest font-medium">{label}</p>
                        <p className="text-text-primary font-semibold">{value}</p>
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
      <section className="py-24 border-t border-border-subtle">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div className="text-center mb-16" {...scrollProps(staggerContainer)}>
            <motion.span {...childProps(fadeUp)} className="inline-block text-accent text-xs font-bold uppercase mb-4" style={{ letterSpacing: "0.14em" }}>Purpose</motion.span>
            <motion.h2 {...childProps(fadeUp)} className="font-display font-bold" style={{ fontSize: "clamp(32px, 4vw, 48px)" }}>Mission &amp; Vision</motion.h2>
          </motion.div>
          <motion.div className="grid grid-cols-1 md:grid-cols-2 gap-6" {...scrollProps(staggerContainer)}>
            <motion.div {...childProps(slideInLeft)} className="relative p-10 rounded-2xl border border-border-subtle overflow-hidden group hover:border-primary/30 transition-colors duration-300" style={{ background: "var(--surface-card)" }}>
              <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ background: "radial-gradient(ellipse at 50% 0%, rgba(109,113,249,0.1) 0%, transparent 65%)" }} />
              <div className="relative z-10">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-primary/10 mb-7"><Target size={22} className="text-primary" /></div>
                <p className="text-xs font-bold uppercase mb-3" style={{ letterSpacing: "0.14em", color: "#6D71F9" }}>Mission</p>
                <h3 className="font-display text-2xl font-bold mb-5 leading-snug">Build software that performs in production</h3>
                <p className="leading-relaxed" style={{ color: "var(--color-text-secondary)", fontSize: 15 }}>Build clean, fast web applications and automation systems that do exactly what the client needs - shipped on time, maintained honestly, and built to last beyond the first deployment.</p>
              </div>
            </motion.div>
            <motion.div {...childProps(slideInRight)} className="relative p-10 rounded-2xl border border-border-subtle overflow-hidden group hover:border-accent/30 transition-colors duration-300" style={{ background: "var(--surface-card)" }}>
              <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ background: "radial-gradient(ellipse at 50% 0%, rgba(84,193,251,0.1) 0%, transparent 65%)" }} />
              <div className="relative z-10">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-accent/10 mb-7"><Compass size={22} className="text-accent" /></div>
                <p className="text-xs font-bold uppercase mb-3" style={{ letterSpacing: "0.14em", color: "#54C1FB" }}>Vision</p>
                <h3 className="font-display text-2xl font-bold mb-5 leading-snug">Be the go-to software studio for growing businesses in AU, UK, and US</h3>
                <p className="leading-relaxed" style={{ color: "var(--color-text-secondary)", fontSize: 15 }}>Build a reputation for delivering software that works - consistently, on budget, and without the overhead of a large agency. One senior developer. Full accountability.</p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Values */}
      <section className="py-24 border-t border-border-subtle">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div className="text-center mb-16" {...scrollProps(staggerContainer)}>
            <motion.span {...childProps(fadeUp)} className="inline-block text-xs font-bold uppercase mb-4" style={{ color: "#6D71F9", letterSpacing: "0.14em" }}>What We Stand For</motion.span>
            <motion.h2 {...childProps(fadeUp)} className="font-display font-bold" style={{ fontSize: "clamp(32px, 4vw, 48px)" }}>Our Values</motion.h2>
          </motion.div>
          <motion.div className="grid grid-cols-1 sm:grid-cols-2 gap-6" {...scrollProps(staggerContainer)}>
            {values.map((v) => (
              <SpotlightCard
                key={v.title}
                icon={v.icon}
                title={v.title}
                body={v.description}
                numberWatermark={v.number}
                showUnderlineBar
                iconSize="sm"
                variants={scaleIn}
              />
            ))}
          </motion.div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-24 border-t border-border-subtle">
        <div className="max-w-5xl mx-auto px-6">
          <motion.div className="text-center mb-16" {...scrollProps(staggerContainer)}>
            <motion.span {...childProps(fadeUp)} className="inline-block text-xs font-bold uppercase mb-4" style={{ color: "var(--color-warning)", letterSpacing: "0.14em" }}>Our Journey</motion.span>
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
                      <div className="w-12 h-12 rounded-full flex items-center justify-center border border-border-subtle"
                        style={{ background: "rgba(109,113,249,0.12)", boxShadow: "0 0 0 5px var(--color-bg)" }}>
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
      <section className="py-20 border-t border-border-subtle">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div className="text-center" {...scrollProps(staggerContainer)}>
            <motion.h2 {...childProps(fadeUp)} className="font-display text-3xl sm:text-4xl font-bold mb-5">Ready to build together?</motion.h2>
            <motion.p {...childProps(fadeUp)} className="text-text-secondary mb-8 max-w-md mx-auto">Tell us what you need. We will scope it and build it right.</motion.p>
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
    <div className="p-6 rounded-2xl border border-border-subtle hover:border-primary/20 transition-colors duration-300" style={{ background: "var(--surface-card)" }}>
      <h3 className="font-display text-lg font-bold mb-2 text-text-primary">{milestone.title}</h3>
      <p className="text-sm leading-relaxed" style={{ color: "var(--color-text-secondary)" }}>{milestone.description}</p>
    </div>
  );
}
