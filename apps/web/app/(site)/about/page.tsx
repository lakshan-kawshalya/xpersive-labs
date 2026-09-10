"use client";

import { fadeUp, scaleIn, staggerContainer } from "@/lib/animations";
import { motion, type Variants } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  ArrowRight,
  Compass,
  Database,
  Flag,
  Hand,
  Lightbulb,
  MessageSquare,
  Shield,
  ShieldCheck,
  Sparkles,
  Target,
  Terminal,
  TrendingUp,
  Users,
  Workflow,
  Wrench,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useMotionSafe } from "@/hooks/useMotionSafe";
import { useSectionReveal } from "@/hooks/useSectionReveal";
import LayeredStackIllustration from "@/components/illustrations/LayeredStackIllustration";
import CodeEditorIllustration from "@/components/illustrations/CodeEditorIllustration";
import SpotlightCard from "@/components/ui/SpotlightCard";
import { TEAM_MEMBERS } from "@/lib/team";

/* ─── Data ─────────────────────────────────────────────────────────── */

const beliefs = [
  {
    icon: Lightbulb,
    title: "Innovation",
    description: "We solve real problems with practical technology — not technology for the sake of it. If a simple script works better than a heavy framework, we pick simplicity every time.",
    tag: "Practical Implementation",
  },
  {
    icon: ShieldCheck,
    title: "Reliability",
    description: "Deadlines are commitments. We communicate clearly and stand behind what we build. When we deploy to production, we verify every edge case and monitor runtime health.",
    tag: "Production Integrity",
  },
  {
    icon: Users,
    title: "User-Centric",
    description: "Every product starts with the people who will actually use it. We strip away unnecessary complexity and engineer interfaces that make hard work feel effortless.",
    tag: "Zero Friction UI",
  },
  {
    icon: Sparkles,
    title: "Cutting-Edge",
    description: "We explore better ways to solve difficult problems and give our clients a real advantage — from automated headless scrapers to LLM-powered workflows.",
    tag: "Strategic Advantage",
  },
];

const transformationFlow = [
  { icon: Hand, label: "Manual Work", description: "Repetitive tasks & drag" },
  { icon: Database, label: "Data", description: "Structured extraction" },
  { icon: Workflow, label: "Automation", description: "Self-running pipelines" },
  { icon: Terminal, label: "Software", description: "Robust client applications" },
  { icon: TrendingUp, label: "Better Business", description: "Compounding velocity" },
];

const milestones = [
  {
    year: "2024",
    icon: Flag,
    title: "Founded",
    description: "Xpersive Labs was founded in Colombo, Sri Lanka. Set out to build a software studio that delivers production-grade work without the agency overhead.",
  },
  {
    year: "2024",
    icon: Target,
    title: "First Product Shipped",
    description: "Built and shipped a Python-based Alibaba supplier intelligence tool — automating 8-10 hours of weekly manual research for an Australian importer.",
  },
  {
    year: "2025",
    icon: TrendingUp,
    title: "Website Launched",
    description: "Launched xpersivelabs.com — built with Next.js, Framer Motion, and Keystatic CMS. Opened officially for client web and automation projects.",
  },
  {
    year: "2026",
    icon: Compass,
    title: "Raj Ceylon Tours Delivered",
    description: "Built a multilingual luxury tourism platform — custom itinerary UX, Framer Motion animations, and a tree-planting experience tied to each booking.",
  },
];

const howWeWork = [
  {
    icon: MessageSquare,
    title: "Direct",
    description: "You work directly with the people building your product. No middle managers, no communication games, no information loss.",
  },
  {
    icon: Wrench,
    title: "Practical",
    description: "We focus on solutions that solve the actual problem. We prioritize performance, maintainability, and real uptime over hype.",
  },
  {
    icon: Shield,
    title: "Accountable",
    description: "We take ownership from the first conversation through launch and beyond. When we commit to a scope, we make sure it functions as promised.",
  },
];

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
    animate: { scale: [1, 1.15, 1] },
    transition: { duration: 10, repeat: Infinity, ease: "easeInOut" as const },
  } : {};

  return (
    <div className="text-text-primary overflow-x-hidden">
      {/* ── Hero ───────────────────────────────────────────────────── */}
      <section className="relative pt-40 pb-16 overflow-hidden">
        <div
          className="absolute -top-32 right-0 w-[500px] h-[500px] rounded-full blur-[130px] pointer-events-none"
          style={{ background: "radial-gradient(circle, rgba(109,113,249,0.1) 0%, transparent 70%)" }}
        />
        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <motion.div {...mountProps} className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-7 flex flex-col items-start gap-5">
              <motion.span {...childProps(fadeUp)} className="inline-flex items-center gap-2 text-primary text-xs font-bold uppercase tracking-[0.2em] bg-[rgba(109,113,249,0.08)] px-4 py-1.5 rounded-full">
                <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                About Xpersive Labs
              </motion.span>
              <motion.h1 {...childProps(fadeUp)} className="font-display text-5xl sm:text-6xl lg:text-7xl font-bold leading-[1.05] text-text-primary">
                We build software that solves real problems.
              </motion.h1>
              <motion.p {...childProps(fadeUp)} className="text-text-secondary text-lg leading-relaxed max-w-2xl">
                Xpersive Labs is a Sri Lankan software studio building websites, mobile apps, automation, and digital products for businesses that want technology to actually work in the real world.
              </motion.p>
              <motion.div {...childProps(fadeUp)} className="flex flex-wrap items-center gap-4 pt-1">
                <Link
                  href="/contact"
                  className="group inline-flex items-center gap-2.5 px-8 py-[14px] rounded-full font-semibold text-base text-white transition-all duration-300 hover:brightness-110 hover:scale-[1.02]"
                  style={{ background: "linear-gradient(135deg, #6D71F9, #54C1FB)", boxShadow: "0 8px 24px rgba(109,113,249,0.3)" }}
                >
                  Let&apos;s work together
                  <ArrowRight size={17} className="transition-transform duration-200 group-hover:translate-x-1" aria-hidden="true" />
                </Link>
                <Link
                  href="/services"
                  className="inline-flex items-center gap-2.5 px-6 py-[14px] rounded-full font-semibold text-base text-text-primary hover:text-primary bg-[rgba(109,113,249,0.05)] hover:bg-[rgba(109,113,249,0.1)] transition-all"
                >
                  Explore our services
                </Link>
              </motion.div>
            </div>

            <motion.div {...childProps(fadeUp)} className="lg:col-span-5 flex justify-center lg:justify-end">
              <div className="relative w-full max-w-md rounded-2xl bg-bg-card border border-border-subtle p-2" style={{ boxShadow: "0 12px 44px -8px rgba(23,24,55,0.09)" }}>
                <div className="relative rounded-xl overflow-hidden aspect-[4/3] flex items-center justify-center bg-[rgba(109,113,249,0.04)]">
                  <CodeEditorIllustration className="w-4/5" />
                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between p-3 rounded-lg bg-bg-card/90 backdrop-blur-md">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-secondary" />
                      <span className="text-[10px] uppercase tracking-wider text-text-primary font-medium">Colombo Studio</span>
                    </div>
                    <Terminal size={16} className="text-primary" aria-hidden="true" />
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── Quick snapshot ────────────────────────────────────────── */}
      <section className="w-full bg-[rgba(109,113,249,0.035)] py-8">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { label: "Founded", value: "2024" },
            { label: "Based in", value: "Colombo, Sri Lanka" },
            { label: "Markets", value: "AU · UK · US · EU" },
            { label: "Focus", value: "Software · Automation · Design" },
          ].map((stat) => (
            <div key={stat.label} className="flex flex-col gap-1">
              <span className="text-xs uppercase tracking-wider text-text-muted">{stat.label}</span>
              <span className="font-display text-lg font-bold text-text-primary">{stat.value}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ── Our Story ─────────────────────────────────────────────── */}
      <section className="py-24" id="story">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div className="mb-14" {...scrollProps(staggerContainer)}>
            <motion.span {...childProps(fadeUp)} className="inline-block text-primary text-xs font-bold uppercase tracking-[0.2em] mb-3">Our Story</motion.span>
            <motion.h2 {...childProps(fadeUp)} className="font-display text-4xl sm:text-5xl font-bold text-text-primary tracking-tight">Built to solve a real problem.</motion.h2>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <motion.div className="lg:col-span-6 flex flex-col gap-5" {...scrollProps(staggerContainer)}>
              <motion.p {...childProps(fadeUp)} className="text-lg text-text-primary leading-relaxed">
                Xpersive Labs was founded in Colombo, Sri Lanka with one clear goal: build software that solves real problems and actually works in production.
              </motion.p>
              <motion.div {...childProps(fadeUp)} className="p-5 rounded-xl bg-[rgba(109,113,249,0.05)]">
                <p className="text-text-secondary leading-relaxed">
                  Our first product was an Alibaba supplier intelligence tool, built for FBA sellers who were spending 8-10 hours a week doing this research by hand. We eliminated the manual copy-pasting, unstable scraping, and messy spreadsheets with a high-throughput automated engine.
                </p>
              </motion.div>
              <motion.p {...childProps(fadeUp)} className="text-text-secondary leading-relaxed">
                We now build across websites, mobile apps, custom software, automation, and UI/UX design. Every project gets our full attention and our best work, with close engineering proximity to our partners.
              </motion.p>
            </motion.div>

            <motion.div {...childProps(fadeUp)} className="lg:col-span-6 flex justify-center">
              <div className="w-full max-w-sm p-4 rounded-2xl bg-bg-card border border-border-subtle" style={{ boxShadow: "0 4px 28px rgba(23,24,55,0.06)" }}>
                <div className="rounded-xl aspect-[4/3] flex items-center justify-center bg-[rgba(109,113,249,0.04)] relative overflow-hidden">
                  <LayeredStackIllustration className="w-3/4" />
                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
                    <span className="text-[10px] uppercase tracking-wider text-text-primary font-medium bg-bg-card/90 backdrop-blur-sm px-2 py-1 rounded">
                      Manual work → software that handles it
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Why We Exist ──────────────────────────────────────────── */}
      <section className="py-24 bg-[rgba(109,113,249,0.035)]">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div className="text-center max-w-2xl mx-auto mb-14" {...scrollProps(staggerContainer)}>
            <motion.span {...childProps(fadeUp)} className="inline-block text-primary text-xs font-bold uppercase tracking-[0.2em] mb-3">Why We Exist</motion.span>
            <motion.h2 {...childProps(fadeUp)} className="font-display text-3xl sm:text-4xl font-bold text-text-primary tracking-tight">Technology should remove friction, not create more of it.</motion.h2>
          </motion.div>

          <motion.div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-center mb-12" {...scrollProps(staggerContainer)}>
            {transformationFlow.map((step, i) => (
              <div key={step.label} className="contents">
                <motion.div
                  {...childProps(fadeUp)}
                  className={`rounded-xl bg-bg-card p-5 text-center transition-shadow hover:shadow-[0_6px_20px_rgba(70,73,209,0.12)] ${
                    i === transformationFlow.length - 1 ? "bg-gradient-to-b from-bg-card to-[rgba(109,113,249,0.1)]" : ""
                  }`}
                  style={{ boxShadow: "0 2px 12px rgba(23,24,55,0.04)" }}
                >
                  <step.icon size={22} className={i === transformationFlow.length - 1 ? "text-primary mx-auto mb-2" : "text-text-muted mx-auto mb-2"} aria-hidden="true" />
                  <div className={`text-xs font-bold uppercase tracking-wider ${i === transformationFlow.length - 1 ? "text-primary" : "text-text-primary"}`}>{step.label}</div>
                  <p className="text-xs text-text-secondary mt-1">{step.description}</p>
                </motion.div>
                {i < transformationFlow.length - 1 && (
                  <div className="hidden md:flex justify-center text-primary" aria-hidden="true">
                    <ArrowRight size={18} />
                  </div>
                )}
              </div>
            ))}
          </motion.div>

          <motion.p {...childProps(fadeUp)} className="text-center text-lg text-text-secondary max-w-xl mx-auto">
            We look for the repetitive, time-consuming, or frustrating parts of a business and ask a simple question: <span className="text-text-primary font-semibold">can software do this better?</span>
          </motion.p>
        </div>
      </section>

      {/* ── What We Believe ───────────────────────────────────────── */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div className="max-w-2xl mb-14" {...scrollProps(staggerContainer)}>
            <motion.h2 {...childProps(fadeUp)} className="font-display text-4xl sm:text-5xl font-bold text-text-primary tracking-tight mb-3">What we believe.</motion.h2>
            <motion.p {...childProps(fadeUp)} className="text-text-secondary text-lg">Core principles that guide how we design, build, and deliver software.</motion.p>
          </motion.div>
          <motion.div className="grid grid-cols-1 sm:grid-cols-2 gap-6" {...scrollProps(staggerContainer)}>
            {beliefs.map((belief) => (
              <SpotlightCard
                key={belief.title}
                icon={belief.icon}
                title={belief.title}
                body={belief.description}
                showUnderlineBar
                iconSize="sm"
                variants={scaleIn}
              />
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Meet the Team ─────────────────────────────────────────── */}
      <section className="py-24 bg-[rgba(109,113,249,0.035)]">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div className="max-w-2xl mb-14" {...scrollProps(staggerContainer)}>
            <motion.span {...childProps(fadeUp)} className="inline-block text-primary text-xs font-bold uppercase tracking-[0.2em] mb-3">Meet the Team</motion.span>
            <motion.h2 {...childProps(fadeUp)} className="font-display text-4xl sm:text-5xl font-bold text-text-primary tracking-tight mb-3">The people behind the work.</motion.h2>
            <motion.p {...childProps(fadeUp)} className="text-text-secondary text-lg">We&apos;re a small team of builders, designers, and problem-solvers who work closely together to turn ideas into useful, well-built digital products.</motion.p>
          </motion.div>

          <motion.div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6" {...scrollProps(staggerContainer)}>
            {TEAM_MEMBERS.map((member) => (
              <motion.div
                key={member.name}
                {...childProps(fadeUp)}
                {...(shouldAnimate ? { whileHover: { y: -4, boxShadow: "0 16px 36px rgba(109,113,249,0.14)" }, transition: { type: "spring", stiffness: 220, damping: 24 } } : {})}
                className="rounded-2xl bg-bg-card p-4 flex flex-col border border-border-subtle transition-colors duration-300 hover:border-primary/25"
                style={{ boxShadow: "0 4px 24px rgba(23,24,55,0.04)" }}
              >
                <div className="w-full aspect-[4/5] rounded-xl overflow-hidden mb-4 relative bg-[rgba(109,113,249,0.06)]">
                  {member.avatar ? (
                    <Image
                      src={member.avatar}
                      alt={member.name}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      className="object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center gap-1 border border-dashed border-border-subtle rounded-xl">
                      <span className="w-10 h-10 rounded-full bg-bg-card flex items-center justify-center text-primary font-display font-bold">
                        {member.initials}
                      </span>
                      <span className="text-[10px] uppercase tracking-wider text-text-muted font-semibold">Photo coming soon</span>
                    </div>
                  )}
                </div>
                <h3 className="font-display font-bold text-text-primary tracking-tight mb-0.5">{member.name}</h3>
                <div className="text-xs uppercase tracking-wider text-primary font-bold mb-2">{member.role}</div>
                <p className="text-sm text-text-secondary leading-relaxed">{member.shortBio}</p>
                {member.social.length > 0 && (
                  <div className="mt-4 pt-3 border-t border-border-subtle flex items-center gap-3">
                    {member.social.map(({ icon, href, label }) => (
                      <a
                        key={label}
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-xs font-medium text-primary hover:text-primary/80 transition-colors"
                      >
                        <FontAwesomeIcon icon={icon} style={{ width: 12, height: 12 }} aria-hidden="true" />
                        {label}
                      </a>
                    ))}
                  </div>
                )}
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Mission & Vision ──────────────────────────────────────── */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div className="grid grid-cols-1 md:grid-cols-2 gap-6" {...scrollProps(staggerContainer)}>
            <motion.div {...childProps(fadeUp)} className="p-8 sm:p-10 rounded-2xl bg-bg-card border border-border-subtle relative overflow-hidden" style={{ boxShadow: "0 4px 24px rgba(23,24,55,0.04)" }}>
              <div className="absolute top-0 right-0 w-32 h-32 rounded-full blur-2xl bg-[rgba(109,113,249,0.15)] pointer-events-none" />
              <span className="relative inline-block text-primary text-xs font-bold uppercase tracking-[0.2em] mb-4">Our Mission</span>
              <h3 className="relative font-display text-2xl font-bold text-text-primary mb-4 leading-snug">Build tools that replace manual work.</h3>
              <p className="relative text-text-secondary leading-relaxed">
                Build production-ready intelligence tools and software that replace hours of manual research and make powerful automation accessible to sellers, importers, and the agencies that serve them.
              </p>
            </motion.div>
            <motion.div {...childProps(fadeUp)} className="p-8 sm:p-10 rounded-2xl bg-bg-card border border-border-subtle relative overflow-hidden" style={{ boxShadow: "0 4px 24px rgba(23,24,55,0.04)" }}>
              <div className="absolute top-0 right-0 w-32 h-32 rounded-full blur-2xl bg-[rgba(84,193,251,0.18)] pointer-events-none" />
              <span className="relative inline-block text-secondary text-xs font-bold uppercase tracking-[0.2em] mb-4">Our Vision</span>
              <h3 className="relative font-display text-2xl font-bold text-text-primary mb-4 leading-snug">Be the go-to partner for businesses that need technology to perform.</h3>
              <p className="relative text-text-secondary leading-relaxed">
                Become the development partner for businesses and digital agencies that need custom software, web and mobile applications, automation, and design that actually performs in production.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── Our Journey ───────────────────────────────────────────── */}
      <section className="py-24 bg-[rgba(109,113,249,0.035)]">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div className="max-w-2xl mb-14" {...scrollProps(staggerContainer)}>
            <motion.span {...childProps(fadeUp)} className="inline-block text-primary text-xs font-bold uppercase tracking-[0.2em] mb-3">Our Journey</motion.span>
            <motion.h2 {...childProps(fadeUp)} className="font-display text-4xl sm:text-5xl font-bold text-text-primary tracking-tight">From one real problem to something bigger.</motion.h2>
          </motion.div>

          <div className="relative">
            <div className="hidden lg:block absolute top-7 left-8 right-8 h-px bg-border-subtle">
              <div className="h-full w-full opacity-60" style={{ background: "linear-gradient(90deg, #6D71F9, #54C1FB, #6D71F9)" }} />
            </div>
            <motion.div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10" {...scrollProps(staggerContainer)}>
              {milestones.map((m) => (
                <motion.div key={m.title} {...childProps(fadeUp)} className="flex flex-col">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-14 h-14 rounded-full bg-bg-card flex items-center justify-center text-primary" style={{ boxShadow: "0 2px 12px rgba(70,73,209,0.15)" }}>
                      <m.icon size={20} aria-hidden="true" />
                    </div>
                    <span className="text-xs font-bold px-2 py-0.5 rounded bg-[rgba(109,113,249,0.08)] text-text-secondary">{m.year}</span>
                  </div>
                  <h3 className="font-display font-bold text-text-primary mb-2">{m.title}</h3>
                  <p className="text-sm text-text-secondary leading-relaxed">{m.description}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── How We Work ───────────────────────────────────────────── */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div className="max-w-2xl mb-14" {...scrollProps(staggerContainer)}>
            <motion.span {...childProps(fadeUp)} className="inline-block text-primary text-xs font-bold uppercase tracking-[0.2em] mb-3">How We Work</motion.span>
            <motion.h2 {...childProps(fadeUp)} className="font-display text-4xl sm:text-5xl font-bold text-text-primary tracking-tight mb-3">Small team. Direct communication. Serious about the work.</motion.h2>
            <motion.p {...childProps(fadeUp)} className="text-text-secondary text-lg">We believe the best products are built when the people making the decisions are close to the people writing the code.</motion.p>
          </motion.div>
          <motion.div className="grid grid-cols-1 md:grid-cols-3 gap-6" {...scrollProps(staggerContainer)}>
            {howWeWork.map((item) => (
              <motion.div
                key={item.title}
                {...childProps(fadeUp)}
                {...(shouldAnimate ? { whileHover: { y: -4, boxShadow: "0 12px 32px rgba(70,73,209,0.1)" }, transition: { type: "spring", stiffness: 220, damping: 24 } } : {})}
                className="p-8 rounded-2xl bg-bg-card border border-border-subtle transition-colors duration-300"
                style={{ boxShadow: "0 4px 20px rgba(23,24,55,0.03)" }}
              >
                <div className="w-12 h-12 rounded-xl bg-[rgba(109,113,249,0.08)] flex items-center justify-center text-primary mb-6">
                  <item.icon size={22} aria-hidden="true" />
                </div>
                <h3 className="font-display text-lg font-bold text-text-primary mb-2">{item.title}</h3>
                <p className="text-text-secondary leading-relaxed">{item.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Brand moment ──────────────────────────────────────────── */}
      <BrandMoment />

      {/* ── Final CTA ─────────────────────────────────────────────── */}
      <section className="py-24 relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-6">
          <motion.div
            className="relative overflow-hidden rounded-3xl p-12 sm:p-20 text-center flex flex-col items-center border border-border-subtle"
            style={{
              background: "linear-gradient(135deg, #FFFFFF 0%, #F1F0FF 55%, #E8E6FF 100%)",
              boxShadow: "0 8px 40px rgba(109,113,249,0.12)",
            }}
            {...scrollProps(staggerContainer)}
          >
            <motion.div
              className="absolute -top-16 -left-16 w-72 h-72 rounded-full blur-[90px] pointer-events-none"
              style={{ background: "rgba(84,193,251,0.22)" }}
              {...ambientProps}
            />
            <motion.div
              className="absolute -bottom-16 -right-16 w-72 h-72 rounded-full blur-[90px] pointer-events-none"
              style={{ background: "rgba(109,113,249,0.18)" }}
              {...ambientProps}
            />
            <div className="relative z-10 flex flex-col items-center">
              <motion.span {...childProps(fadeUp)} className="inline-block text-primary text-xs font-bold uppercase mb-4" style={{ letterSpacing: "0.14em" }}>
                Let&apos;s Build Something
              </motion.span>
              <motion.h2 {...childProps(fadeUp)} className="font-display font-extrabold leading-[1.05] mb-4 text-text-primary" style={{ fontSize: "clamp(32px, 5vw, 44px)" }}>
                Have a project in mind?
              </motion.h2>
              <motion.p {...childProps(fadeUp)} className="text-lg leading-relaxed mb-8 max-w-xl text-text-secondary">
                Tell us what you&apos;re working on. We&apos;ll help you figure out the best way to bring it to life.
              </motion.p>
              <motion.div {...childProps(fadeUp)}>
                <Link
                  href="/contact"
                  className="group inline-flex items-center gap-3 px-10 py-4 rounded-full font-semibold text-base text-white transition-all duration-300 hover:scale-[1.02]"
                  style={{ background: "linear-gradient(135deg, #6D71F9, #54C1FB)", boxShadow: "0 8px 24px rgba(109,113,249,0.3)" }}
                >
                  Start a conversation
                  <ArrowRight size={17} className="group-hover:translate-x-0.5 transition-transform duration-200" aria-hidden="true" />
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

function BrandMoment() {
  const { shouldAnimate } = useMotionSafe();
  const { ref, inView } = useSectionReveal();

  return (
    <section ref={ref} className="py-28 relative overflow-hidden">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "linear-gradient(90deg, rgba(109,113,249,0.08), rgba(109,113,249,0.02), rgba(84,193,251,0.08))" }}
      />
      <motion.div
        {...(shouldAnimate ? {
          initial: { opacity: 0, y: 20 },
          animate: inView ? { opacity: 1, y: 0 } : {},
          transition: { duration: 0.6, ease: [0.215, 0.61, 0.355, 1.0] },
        } : { initial: false })}
        className="relative z-10 max-w-4xl mx-auto px-6 text-center"
      >
        <p className="font-display font-bold leading-[1.1] text-text-primary" style={{ fontSize: "clamp(32px, 5vw, 56px)" }}>
          Build less busywork.
        </p>
        <p className="font-display font-bold leading-[1.1] text-gradient" style={{ fontSize: "clamp(32px, 5vw, 56px)" }}>
          Build better software.
        </p>
      </motion.div>
    </section>
  );
}
