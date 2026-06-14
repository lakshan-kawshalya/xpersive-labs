"use client";

import { fadeUp, staggerContainer } from "@/lib/animations";
import { useMotionSafe } from "@/hooks/useMotionSafe";
import { motion } from "framer-motion";
import {
  ArrowRight,
  CheckCircle,
  Code2,
  Globe,
  Monitor,
  Palette,
  PenTool,
  Play,
  Rocket,
  Search,
  Settings,
  Terminal,
} from "lucide-react";
import Link from "next/link";

/* ─── Shared types ──────────────────────────────────────────────────── */

interface Step {
  icon: React.ComponentType<{ size?: number; className?: string }>;
  title: string;
  description: string;
}

interface Service {
  id: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  label: string;
  headline: string;
  body: string[];
  steps: Step[];
  tools: string[];
  accentColor: string;
  accentBg: string;
  gradientFrom: string;
  gradientTo: string;
  glowColor: string;
}

/* ─── Data ──────────────────────────────────────────────────────────── */

const webSteps: Step[] = [
  {
    icon: Search,
    title: "Discovery and Planning",
    description:
      "We dive deep into your e-commerce workflow, data sources, and constraints to define exactly what success looks like before writing a single line of code.",
  },
  {
    icon: PenTool,
    title: "UI/UX Design",
    description:
      "Wireframes, prototypes, and high-fidelity mockups that align stakeholders and de-risk development before build begins.",
  },
  {
    icon: Code2,
    title: "Development",
    description:
      "Clean architecture, thorough testing, and continuous delivery so you see progress - and can steer it - every step of the way.",
  },
  {
    icon: Rocket,
    title: "Testing & Launch",
    description:
      "Production deployment, performance audits, and post-launch support so your product lands without friction.",
  },
];

const designSteps: Step[] = [
  {
    icon: Search,
    title: "Research",
    description:
      "User interviews, competitive audits, and heuristic evaluations to uncover real needs and opportunities before any pixel is placed.",
  },
  {
    icon: PenTool,
    title: "Wireframing",
    description:
      "Low-fidelity layouts that map out information architecture and user flows - fast to iterate, easy to validate with stakeholders.",
  },
  {
    icon: CheckCircle,
    title: "Prototyping",
    description:
      "Interactive prototypes that simulate the real product so you can test with users before committing to full development.",
  },
  {
    icon: Rocket,
    title: "Handoff",
    description:
      "A living component library, design tokens, and developer-ready specs that keep teams moving fast and brand consistent.",
  },
];

const automationSteps: Step[] = [
  {
    icon: Settings,
    title: "Requirements",
    description:
      "We map your target suppliers, search terms, and data fields, then spec the tool before writing a line of code.",
  },
  {
    icon: Code2,
    title: "Build",
    description:
      "Custom Playwright-based scraper built with curl_cffi for TLS fingerprint evasion, Parsel for HTML parsing, and DataImpulse residential proxies for anti-detection.",
  },
  {
    icon: Play,
    title: "Test",
    description:
      "End-to-end validation against live Alibaba: edge cases, pagination, CAPTCHA flow, proxy rotation, and output schema verification.",
  },
  {
    icon: Monitor,
    title: "Deploy and Monitor",
    description:
      "Scheduled runs, error alerting, and output delivery to CSV, JSON, or your preferred destination.",
  },
];

const services: Service[] = [
  {
    id: "web",
    icon: Globe,
    label: "Web Development",
    headline: "Custom Web Applications for E-Commerce",
    body: [
      "We build fast, modern web applications for FBA sellers, importers, and digital agencies. From client portals to custom dashboards, every project uses Next.js, TypeScript, and a relentless focus on performance and SEO.",
      "From database schema to deployment pipeline, every decision is intentional. We don't just ship features. We ship products that are fast, maintainable, and built to scale.",
    ],
    steps: webSteps,
    tools: ["Next.js", "TypeScript", "React", "Tailwind CSS", "Framer Motion", "PostgreSQL", "Prisma", "Vercel"],
    accentColor: "text-primary",
    accentBg: "bg-primary/10",
    gradientFrom: "from-primary/20",
    gradientTo: "to-accent/5",
    glowColor: "rgba(109,113,249,0.25)",
  },
  {
    id: "design",
    icon: Palette,
    label: "UI/UX Design",
    headline: "Research-Driven Design for E-Commerce Tools",
    body: [
      "Great tools start with great design. We create clean, intuitive interfaces built for e-commerce workflows: supplier dashboards, product research tools, and white-label platforms.",
      "Whether you need a full product design from scratch, a design system to scale an existing product, or a usability audit, we bring structured process and rigour to every engagement.",
    ],
    steps: designSteps,
    tools: ["Figma", "Design Systems", "Prototyping", "User Research", "Accessibility", "Component Libraries"],
    accentColor: "text-purple-400",
    accentBg: "bg-purple-500/10",
    gradientFrom: "from-purple-500/20",
    gradientTo: "to-pink-500/5",
    glowColor: "rgba(168,85,247,0.25)",
  },
  {
    id: "automation",
    icon: Terminal,
    label: "Automation & Web Scraping",
    headline: "E-Commerce Data Automation at Scale",
    body: [
      "We build custom automation tools for e-commerce sellers on Amazon, Shopify, and Alibaba: extracting structured product data, monitoring suppliers, running keyword searches, and tracking competitor launches. Our tools use residential proxies and CAPTCHA solvers to stay live in production.",
      "Every tool is purpose-built for the real platform: dynamic pages, pagination, anti-bot measures, and structured multi-format output. The Alibaba Supplier Intelligence Platform is our proof of concept: 47 data fields, 5 automated functions, daily runs.",
    ],
    steps: automationSteps,
    tools: ["Python", "Playwright", "curl_cffi", "Residential Proxies", "CapSolver", "CSV", "JSON"],
    accentColor: "text-accent",
    accentBg: "bg-accent/10",
    gradientFrom: "from-accent/20",
    gradientTo: "to-primary/5",
    glowColor: "rgba(84,193,251,0.25)",
  },
];

/* ─── Process timeline ──────────────────────────────────────────────── */

function ProcessTimeline({ steps }: { steps: Step[] }) {
  const { shouldAnimate } = useMotionSafe();

  return (
    <div>
      {/* Desktop: horizontal */}
      <div className="hidden lg:flex items-start">
        {steps.map((step, i) => (
          <div key={step.title} className="flex items-start flex-1">
            <div className="flex flex-col items-center text-center flex-1 px-3">
              <div
                className="w-6 h-6 rounded-full flex items-center justify-center mb-5 relative z-10 flex-shrink-0"
                style={{ background: "rgba(109,113,249,0.12)", border: "1px solid rgba(109,113,249,0.3)" }}
              >
                <div className="w-2 h-2 rounded-full bg-primary" />
              </div>

              <motion.span
                className="font-display font-extrabold leading-none select-none mb-3 block"
                style={{ fontSize: 64, color: "rgba(109,113,249,0.15)" }}
                {...(shouldAnimate ? {
                  initial: { opacity: 0 },
                  whileInView: { opacity: 1 },
                  viewport: { once: true },
                  transition: { delay: i * 0.15 },
                } : { initial: false })}
              >
                {String(i + 1).padStart(2, "0")}
              </motion.span>

              <motion.div
                {...(shouldAnimate ? {
                  initial: { opacity: 0, y: 16 },
                  whileInView: { opacity: 1, y: 0 },
                  viewport: { once: true },
                  transition: { delay: i * 0.15 + 0.1 },
                } : { initial: false })}
              >
                <h3 className="font-semibold text-white mb-2" style={{ fontSize: 20 }}>
                  {step.title}
                </h3>
                <p className="text-white/55 leading-relaxed" style={{ fontSize: 15 }}>
                  {step.description}
                </p>
              </motion.div>
            </div>

            {i < steps.length - 1 && (
              <div className="pt-3 flex-shrink-0 w-4">
                <motion.div
                  style={{
                    height: 1,
                    borderTop: "1px dashed rgba(109,113,249,0.2)",
                    transformOrigin: "left center",
                    width: "100%",
                  }}
                  {...(shouldAnimate ? {
                    initial: { scaleX: 0 },
                    whileInView: { scaleX: 1 },
                    viewport: { once: true },
                    transition: { delay: i * 0.15 + 0.3, duration: 0.5, ease: "easeOut" },
                  } : { initial: false })}
                />
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Mobile: vertical */}
      <div className="lg:hidden space-y-0">
        {steps.map((step, i) => (
          <motion.div
            key={step.title}
            className="flex gap-4"
            {...(shouldAnimate ? {
              initial: { opacity: 0, x: -16 },
              whileInView: { opacity: 1, x: 0 },
              viewport: { once: true },
              transition: { delay: i * 0.1 },
            } : { initial: false })}
          >
            <div className="flex flex-col items-center flex-shrink-0">
              <div
                className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0"
                style={{ background: "rgba(109,113,249,0.12)", border: "1px solid rgba(109,113,249,0.3)" }}
              >
                <div className="w-2 h-2 rounded-full bg-primary" />
              </div>
              {i < steps.length - 1 && (
                <div className="w-px flex-1 mt-2 mb-2" style={{ borderLeft: "1px dashed rgba(109,113,249,0.2)" }} />
              )}
            </div>
            <div className="pb-8">
              <span
                className="font-display font-extrabold leading-none select-none block mb-2"
                style={{ fontSize: 40, color: "rgba(109,113,249,0.2)" }}
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="font-semibold text-white mb-1" style={{ fontSize: 18 }}>{step.title}</h3>
              <p className="text-white/55 leading-relaxed" style={{ fontSize: 14 }}>{step.description}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

/* ─── ServiceRow ────────────────────────────────────────────────────── */

function ServiceRow({ service, index }: { service: Service; index: number }) {
  const reversed = index % 2 !== 0;
  const { shouldAnimate } = useMotionSafe();

  const scrollProps = shouldAnimate ? {
    variants: staggerContainer,
    initial: "hidden",
    whileInView: "visible" as const,
    viewport: { once: true, margin: "-80px" },
  } : { initial: false };

  const childProps = shouldAnimate ? { variants: fadeUp } : { initial: false };

  return (
    <section id={service.id} className="py-24 border-t border-white/[0.07] scroll-mt-20">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          {...scrollProps}
          className={`grid grid-cols-1 md:grid-cols-2 gap-16 items-start mb-20 ${reversed ? "md:grid-flow-dense" : ""}`}
        >
          {/* Text block */}
          <motion.div {...childProps} className={reversed ? "lg:col-start-2" : ""}>
            <div className="flex items-center gap-3 mb-5">
              <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl ${service.accentBg}`}>
                <service.icon size={22} className={service.accentColor} />
              </div>
              <span className={`text-xs font-bold uppercase tracking-[0.2em] ${service.accentColor}`}>
                {service.label}
              </span>
            </div>

            <h2 className="font-display text-3xl sm:text-4xl font-bold leading-tight mb-7">
              {service.headline}
            </h2>

            <div className="space-y-4 text-white/55 leading-relaxed mb-8">
              {service.body.map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>

            <div>
              <p className="text-xs text-white/30 uppercase tracking-widest font-semibold mb-3">
                Tools &amp; Technologies
              </p>
              <div className="flex flex-wrap gap-2">
                {service.tools.map((tool, idx) => (
                  <motion.span
                    key={tool}
                    className="px-3 py-1.5 rounded-full font-mono text-[13px] cursor-default transition-all duration-200 hover:text-white"
                    style={{
                      background: "rgba(109,113,249,0.08)",
                      border: "1px solid rgba(109,113,249,0.2)",
                      color: "rgba(255,255,255,0.7)",
                    }}
                    {...(shouldAnimate ? {
                      initial: { opacity: 0, y: 8 },
                      whileInView: { opacity: 1, y: 0 },
                      viewport: { once: true },
                      transition: { delay: idx * 0.04, duration: 0.3 },
                      whileHover: {
                        backgroundColor: "rgba(109,113,249,0.15)",
                        borderColor: "rgba(109,113,249,0.4)",
                        color: "#ffffff",
                      },
                    } : { initial: false })}
                  >
                    {tool}
                  </motion.span>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Visual accent card */}
          <motion.div {...childProps} className={reversed ? "lg:col-start-1 lg:row-start-1" : ""}>
            <div
              className={`relative rounded-2xl p-10 border border-white/10 bg-gradient-to-br ${service.gradientFrom} ${service.gradientTo} overflow-hidden h-full min-h-[280px] flex items-center justify-center`}
            >
              <div className="absolute -bottom-8 -right-8 opacity-5">
                <service.icon size={200} />
              </div>
              <div
                className="absolute top-0 right-0 w-48 h-48 rounded-full blur-3xl pointer-events-none"
                style={{ background: `radial-gradient(circle, ${service.glowColor} 0%, transparent 70%)` }}
              />
              <div className="relative z-10 text-center">
                <div className={`inline-flex items-center justify-center w-20 h-20 rounded-2xl ${service.accentBg} mb-5 border border-white/10`}>
                  <service.icon size={38} className={service.accentColor} />
                </div>
                <p className="font-display text-2xl font-bold mb-2">{service.label}</p>
                <p className={`text-sm font-medium ${service.accentColor}`}>
                  End-to-end delivery
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Process timeline */}
        <div>
          <motion.p
            className="text-xs text-white/30 uppercase tracking-widest font-semibold mb-10"
            {...(shouldAnimate ? {
              initial: { opacity: 0 },
              whileInView: { opacity: 1 },
              viewport: { once: true },
            } : { initial: false })}
          >
            Our Process
          </motion.p>
          <ProcessTimeline steps={service.steps} />
        </div>

        {/* Case study callout — automation service only */}
        {service.id === "automation" && (
          <motion.div
            className="mt-14 flex gap-4 rounded-2xl p-6"
            style={{
              background: "rgba(109,113,249,0.05)",
              border: "1px solid rgba(109,113,249,0.12)",
            }}
            {...(shouldAnimate ? {
              initial: { opacity: 0, y: 16 },
              whileInView: { opacity: 1, y: 0 },
              viewport: { once: true, margin: "-80px" },
              transition: { duration: 0.5 },
            } : { initial: false })}
          >
            <div>
              <span
                className="inline-block text-[10px] font-bold uppercase tracking-[0.15em] mb-2"
                style={{ color: "rgba(255,255,255,0.35)" }}
              >
                Case Study
              </span>
              <p className="font-display font-bold text-white text-base mb-2">
                Alibaba Supplier Intelligence Platform
              </p>
              <p className="text-white/50 text-sm leading-relaxed mb-3">
                Automated supplier monitoring for an Australian importer -
                replacing 8-10 hours of weekly research. 47 data fields
                extracted daily across 5 automated functions.
              </p>
              <Link
                href="/portfolio/alibaba-scraper"
                className="inline-flex items-center gap-1.5 text-sm font-semibold transition-opacity duration-200 hover:opacity-75"
                style={{ color: "#6D71F9" }}
              >
                Read the full case study
                <ArrowRight size={13} />
              </Link>
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
}

/* ─── Page ──────────────────────────────────────────────────────────── */

export default function ServicesPage() {
  const { shouldAnimate } = useMotionSafe();

  const mountProps = shouldAnimate ? {
    variants: staggerContainer,
    initial: "hidden",
    animate: "visible",
  } : { initial: false };

  const childProps = shouldAnimate ? { variants: fadeUp } : { initial: false };

  const scrollProps = shouldAnimate ? {
    variants: staggerContainer,
    initial: "hidden",
    whileInView: "visible" as const,
    viewport: { once: true, margin: "-80px" },
  } : { initial: false };

  return (
    <div className="bg-dark text-white">
      {/* ── Hero ───────────────────────────────────────────────────── */}
      <section className="relative pt-40 pb-20 overflow-hidden">
        <motion.div
          className="absolute -top-32 right-0 w-[500px] h-[500px] rounded-full blur-[130px] pointer-events-none"
          style={{ background: "radial-gradient(circle, rgba(109,113,249,0.3) 0%, transparent 70%)" }}
          {...(shouldAnimate ? {
            animate: { scale: [1, 1.1, 1] },
            transition: { duration: 9, repeat: Infinity, ease: "easeInOut" as const },
          } : {})}
        />
        <motion.div
          className="absolute bottom-0 -left-20 w-[400px] h-[400px] rounded-full blur-[100px] pointer-events-none"
          style={{ background: "radial-gradient(circle, rgba(84,193,251,0.2) 0%, transparent 70%)" }}
          {...(shouldAnimate ? {
            animate: { scale: [1, 1.15, 1] },
            transition: { duration: 11, repeat: Infinity, ease: "easeInOut" as const, delay: 2 },
          } : {})}
        />
        <div
          className="absolute inset-0 opacity-[0.05] pointer-events-none"
          style={{
            backgroundImage: "radial-gradient(circle, #6D71F9 1px, transparent 1px)",
            backgroundSize: "36px 36px",
          }}
        />

        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <motion.div {...mountProps}>
            <motion.span {...childProps} className="inline-block text-primary text-xs font-bold uppercase tracking-[0.2em] mb-5">
              What We Offer
            </motion.span>

            <motion.h1 {...childProps} className="font-display text-5xl sm:text-6xl lg:text-7xl font-bold leading-[1.05] mb-7 max-w-3xl">
              Our{" "}
              <span className="text-gradient">Services</span>
            </motion.h1>

            <motion.p {...childProps} className="text-white/55 text-lg sm:text-xl leading-relaxed max-w-2xl mb-4">
              E-commerce automation, custom web applications, and UI/UX design for sellers, importers, and digital agencies.
            </motion.p>
            <motion.p {...childProps} className="text-white/45 text-sm leading-relaxed max-w-2xl mb-10">
              Running a digital agency? We take on white-label projects: your brand, our build.{" "}
              <Link href="/contact" className="text-primary font-semibold hover:opacity-75 transition-opacity duration-200">
                Let&apos;s talk.
              </Link>
            </motion.p>

            {/* Service anchors */}
            <motion.div {...childProps} className="flex flex-wrap gap-3">
              {services.map((s) => (
                <a
                  key={s.id}
                  href={`#${s.id}`}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-white/10 bg-white/[0.03] text-sm font-medium text-white/70 hover:text-white hover:border-white/25 transition-all duration-200"
                >
                  <s.icon size={15} className={s.accentColor} />
                  {s.label}
                </a>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── Service rows ───────────────────────────────────────────── */}
      {services.map((service, index) => (
        <ServiceRow key={service.id} service={service} index={index} />
      ))}

      {/* ── CTA ────────────────────────────────────────────────────── */}
      <section className="py-20 border-t border-white/[0.07]">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            className="relative rounded-2xl overflow-hidden p-12 sm:p-16 text-center"
            {...scrollProps}
          >
            <div
              className="absolute inset-0"
              style={{ background: "linear-gradient(135deg, #6D71F9 0%, #5457f5 50%, #54C1FB 100%)" }}
            />
            <div
              className="absolute inset-0 opacity-10"
              style={{
                backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.5) 1px, transparent 1px)",
                backgroundSize: "28px 28px",
              }}
            />
            <motion.div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full blur-[80px] bg-white/10"
              {...(shouldAnimate ? {
                animate: { scale: [1, 1.2, 1] },
                transition: { duration: 6, repeat: Infinity, ease: "easeInOut" as const },
              } : {})}
            />

            <div className="relative z-10">
              <motion.h2 {...childProps} className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-5">
                Not sure which service fits?
              </motion.h2>
              <motion.p {...childProps} className="text-white/75 text-lg mb-10 max-w-xl mx-auto">
                Tell us about your project and we&apos;ll scope the right solution
                together - no commitment required.
              </motion.p>
              <motion.div {...childProps}>
                <Link
                  href="/contact"
                  className="group inline-flex items-center gap-2.5 px-10 py-4 rounded-full bg-white text-primary font-bold text-base transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-white/20"
                >
                  Let&apos;s Talk
                  <ArrowRight
                    size={17}
                    className="group-hover:translate-x-1 transition-transform duration-200"
                  />
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
