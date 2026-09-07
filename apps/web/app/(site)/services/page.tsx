"use client";

import { fadeUp, staggerContainer } from "@/lib/animations";
import { useMotionSafe } from "@/hooks/useMotionSafe";
import { motion } from "framer-motion";
import {
  ArrowRight,
  ArrowUpRight,
  Bookmark,
  CheckCircle2,
  Globe,
  Layers,
  Palette,
  Smartphone,
  Terminal,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

/* ─── Shared types ──────────────────────────────────────────────────── */

interface Step {
  title: string;
  description: string;
}

interface Service {
  id: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  label: string;
  headline: string;
  body: string[];
  toolsLabel: string;
  tools: string[];
  steps: Step[];
  caseStudy?: {
    title: string;
    description: string;
    href: string;
  };
}

/* ─── Data ──────────────────────────────────────────────────────────── */

const services: Service[] = [
  {
    id: "website",
    icon: Globe,
    label: "Website Development",
    headline: "Fast, Modern Websites Built to Last",
    body: [
      "Fast, modern websites built in Next.js and TypeScript — from marketing sites to portfolios and business websites. Optimized for search, speed, and first impressions.",
      "Direct engineer access from day one. No account managers, no handoffs, no lost context.",
    ],
    toolsLabel: "Technologies & Architecture",
    tools: ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion", "SEO", "CMS", "Vercel"],
    steps: [
      { title: "Discovery", description: "We clarify scope, sitemap, and content before writing a line of code." },
      { title: "Design", description: "Page layouts and UI flows approved before development starts." },
      { title: "Development", description: "Weekly milestone deployments with continuous staging access and zero surprises." },
      { title: "Launch & Support", description: "Production QA deployment backed by 30 days of dedicated post-launch support." },
    ],
    caseStudy: {
      title: "Raj Ceylon Tours",
      description: "High-conversion luxury tourism website with custom itinerary UX and multilingual flows built on Next.js 14.",
      href: "/portfolio/raj-ceylon",
    },
  },
  {
    id: "mobile",
    icon: Smartphone,
    label: "Mobile Application Development",
    headline: "Apps for iOS and Android Built for Real Use",
    body: [
      "Apps for iOS and Android that put your business in your customer's pocket. Built with a single codebase for both platforms, without compromising on native feel.",
      "Offline support, push notifications, and app store submission handled end-to-end.",
    ],
    toolsLabel: "Mobile Stack",
    tools: ["React Native", "Expo", "TypeScript", "Offline Sync", "Push Notifications", "App Store & Play Store"],
    steps: [
      { title: "Discovery", description: "We clarify platforms, offline requirements, and core user flows up front." },
      { title: "Design", description: "Native-feel screens and navigation approved before development starts." },
      { title: "Development", description: "Weekly TestFlight/internal builds so you can test real progress throughout." },
      { title: "Launch & Support", description: "App Store and Play Store submission, plus 30 days of dedicated post-launch support." },
    ],
  },
  {
    id: "software",
    icon: Layers,
    label: "Software Development",
    headline: "Custom Software Built Around How You Work",
    body: [
      "Custom tools and platforms built around how your business actually works — from SaaS dashboards to internal tools and client portals.",
      "Every decision from database schema to deployment pipeline is intentional, architected to scale without a rebuild in 18 months.",
    ],
    toolsLabel: "Technologies & Architecture",
    tools: ["Next.js", "TypeScript", "React", "PostgreSQL", "Prisma", "Vercel"],
    steps: [
      { title: "Discovery", description: "We clarify scope, architecture, and milestones before writing code." },
      { title: "Design", description: "Interactive system architecture and data flows approved before development starts." },
      { title: "Development", description: "Weekly milestone deployments with continuous staging access and zero surprises." },
      { title: "Launch & Support", description: "Production QA deployment backed by 30 days of dedicated post-launch support." },
    ],
  },
  {
    id: "automation",
    icon: Terminal,
    label: "Automation Development",
    headline: "Custom Scraping and Automation That Stays Live",
    body: [
      "Custom scrapers, API pipelines, and automated extractions built for resilient scale. Anti-detection hardened with a 48-hour fix guarantee.",
      "Clean data delivered to CSV, Google Sheets, or webhooks on your schedule.",
    ],
    toolsLabel: "Engineered Toolset",
    tools: ["Python", "Playwright", "curl_cffi", "Residential Proxies", "CapSolver", "Celery", "CSV", "JSON"],
    steps: [
      { title: "Requirements", description: "Target URLs, extraction fields, and export schemas mapped up front." },
      { title: "Build", description: "Engineered with curl_cffi TLS impersonation, residential proxies, and smart retries." },
      { title: "Test", description: "Live validation against CAPTCHAs, rate limits, and pagination edge cases." },
      { title: "Deploy and Monitor", description: "Scheduled execution with automated alerts and failure telemetry." },
    ],
    caseStudy: {
      title: "Alibaba Supplier Intelligence Platform",
      description: "Automated supplier intelligence replacing 8-10 hours of manual research with 47 daily monitored fields.",
      href: "/portfolio/alibaba-scraper",
    },
  },
  {
    id: "ui-ux",
    icon: Palette,
    label: "UI/UX Development",
    headline: "Design That Makes People Want to Stay",
    body: [
      "Clean, simple design that makes people want to stay and come back — clear hierarchy, accessible by default, built as a reusable design system rather than one-off screens.",
      "Wireframes and prototypes reviewed with you before a single screen is built, so there are no surprises at handoff.",
    ],
    toolsLabel: "Design Systems & Tooling",
    tools: ["Figma", "Design Systems", "Framer Motion", "Micro-animations", "WCAG AA"],
    steps: [
      { title: "Research", description: "We study your users, competitors, and existing brand before sketching a single screen." },
      { title: "Wireframes", description: "Low-fidelity flows agreed on structure and content before visual design begins." },
      { title: "Visual Design", description: "High-fidelity, interactive prototypes built as a reusable component system." },
      { title: "Handoff & QA", description: "Developer-ready specs and assets, with design QA through to production." },
    ],
  },
];

/* ─── Anchor nav with scroll tracking ───────────────────────────────── */

function AnchorNav() {
  const [activeId, setActiveId] = useState(services[0].id);

  useEffect(() => {
    const sections = services
      .map((s) => document.getElementById(s.id))
      .filter((el): el is HTMLElement => el !== null);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveId(entry.target.id);
        });
      },
      { rootMargin: "-140px 0px -70% 0px" },
    );

    sections.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="w-full bg-[rgba(109,113,249,0.05)] rounded-xl p-1.5 flex items-center gap-1.5 overflow-x-auto">
      {services.map((s) => {
        const isActive = s.id === activeId;
        return (
          <a
            key={s.id}
            href={`#${s.id}`}
            className={`whitespace-nowrap px-4 py-2.5 rounded-lg text-sm font-medium transition-all flex items-center gap-2 ${
              isActive ? "bg-bg-card text-primary shadow-sm" : "text-text-secondary hover:text-text-primary hover:bg-bg-card/70"
            }`}
          >
            <span className={`w-1.5 h-1.5 rounded-full ${isActive ? "bg-primary" : "bg-transparent"}`} />
            {s.label.replace(" Development", "").replace(" Integration", "").replace(" & Data Pipelines", " & Data")}
          </a>
        );
      })}
    </div>
  );
}

/* ─── Hero geometric visual ─────────────────────────────────────────── */

function HeroPrism() {
  return (
    <div
      className="relative w-full max-w-md aspect-square rounded-2xl bg-bg-card border border-border-subtle overflow-hidden flex items-center justify-center"
      style={{ boxShadow: "0 12px 40px -4px rgba(39,40,72,0.1)" }}
    >
      <div className="absolute -top-12 -right-12 w-48 h-48 rounded-full bg-[rgba(84,193,251,0.18)] blur-2xl" />
      <div className="absolute -bottom-12 -left-12 w-52 h-52 rounded-full bg-[rgba(109,113,249,0.14)] blur-2xl" />
      <svg className="relative z-10 w-56 h-56" fill="none" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <defs>
          <linearGradient id="prismGrad1" x1="20" x2="180" y1="20" y2="180" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#54C1FB" />
            <stop offset="100%" stopColor="#6D71F9" />
          </linearGradient>
          <linearGradient id="subtleGlass" x1="0" x2="1" y1="0" y2="1">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.85" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0.25" />
          </linearGradient>
        </defs>
        <rect fill="url(#prismGrad1)" height="96" opacity="0.9" rx="28" transform="rotate(45 100 100)" width="96" x="52" y="52" />
        <rect fill="url(#subtleGlass)" height="60" rx="18" transform="rotate(45 100 100)" width="60" x="70" y="70" />
        <circle cx="100" cy="100" fill="#ffffff" r="16" />
        <circle cx="100" cy="100" fill="#6D71F9" r="8" />
        <circle cx="100" cy="100" fill="none" r="76" stroke="#6D71F9" strokeDasharray="6 6" strokeOpacity="0.18" />
        <circle cx="154" cy="46" fill="#54C1FB" r="6" />
        <circle cx="46" cy="154" fill="#6D71F9" r="4" />
      </svg>
      <div className="absolute bottom-4 left-6 right-6 flex items-center justify-between text-[10px] tracking-widest uppercase text-text-muted">
        <span>XPR-SVCS-01</span>
        <span>Est. 2025 // Colombo</span>
      </div>
    </div>
  );
}

/* ─── Process band ───────────────────────────────────────────────────── */

function ProcessBand({ steps }: { steps: Step[] }) {
  const { shouldAnimate } = useMotionSafe();

  const scrollProps = shouldAnimate ? {
    variants: staggerContainer,
    initial: "hidden",
    whileInView: "visible" as const,
    viewport: { once: true, margin: "-80px" },
  } : { initial: false };

  const childProps = shouldAnimate ? { variants: fadeUp } : { initial: false };

  return (
    <motion.div
      className="rounded-2xl bg-[rgba(109,113,249,0.035)] p-6 sm:p-10 flex flex-col gap-8"
      {...scrollProps}
    >
      <motion.div {...childProps} className="flex flex-col gap-1">
        <span className="text-primary text-xs font-bold uppercase tracking-[0.2em]">End-to-End Delivery</span>
        <h3 className="font-display text-xl font-bold text-text-primary">Our Process</h3>
      </motion.div>

      <motion.div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4" {...scrollProps}>
        {steps.map((step, i) => (
          <motion.div
            key={step.title}
            {...childProps}
            {...(shouldAnimate ? {
              whileHover: { y: -4, boxShadow: "0 16px 36px rgba(109,113,249,0.14)" },
              transition: { type: "spring", stiffness: 220, damping: 24 },
            } : {})}
            className="rounded-xl bg-bg-card p-5 flex flex-col gap-2 transition-colors duration-300"
            style={{ boxShadow: "0 2px 12px rgba(109,113,249,0.05)" }}
          >
            <span className="font-display text-lg font-bold text-primary">{String(i + 1).padStart(2, "0")}</span>
            <h4 className="font-display font-bold text-text-primary">{step.title}</h4>
            <p className="text-sm text-text-secondary leading-relaxed">{step.description}</p>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
}

/* ─── Service section ────────────────────────────────────────────────── */

function ServiceSection({ service, index }: { service: Service; index: number }) {
  const { shouldAnimate } = useMotionSafe();
  const tinted = index % 2 === 1;

  const scrollProps = shouldAnimate ? {
    variants: staggerContainer,
    initial: "hidden",
    whileInView: "visible" as const,
    viewport: { once: true, margin: "-80px" },
  } : { initial: false };

  const childProps = shouldAnimate ? { variants: fadeUp } : { initial: false };

  return (
    <section
      id={service.id}
      className={`py-20 sm:py-24 scroll-mt-36 ${tinted ? "bg-[rgba(109,113,249,0.035)]" : ""}`}
    >
      <div className="max-w-7xl mx-auto px-6 flex flex-col gap-12">
        <motion.div className="grid grid-cols-1 lg:grid-cols-12 gap-8" {...scrollProps}>
          {/* Text block */}
          <motion.div {...childProps} className="lg:col-span-8 flex flex-col items-start gap-4">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-widest text-primary bg-[rgba(109,113,249,0.08)] px-3 py-1 rounded-full">
                {String(index + 1).padStart(2, "0")} / Capability
              </span>
              <span className="text-xs uppercase tracking-widest text-text-muted">{service.label}</span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-text-primary tracking-tight">
              {service.headline}
            </h2>
            <div className="flex flex-col gap-3 text-text-secondary leading-relaxed">
              {service.body.map((para, i) => (
                <p key={i} className={i === 0 ? "text-lg" : ""}>{para}</p>
              ))}
            </div>
          </motion.div>

          {/* Tech stack sidebar */}
          <motion.div {...childProps} className="lg:col-span-4 flex flex-col justify-end">
            <div className="rounded-xl bg-bg-card p-6 flex flex-col gap-3" style={{ boxShadow: "0 4px 20px rgba(39,40,72,0.05)" }}>
              <span className="text-xs uppercase tracking-widest text-text-muted">{service.toolsLabel}</span>
              <div className="flex flex-wrap gap-2">
                {service.tools.map((tool) => (
                  <span
                    key={tool}
                    className="font-mono text-xs text-text-secondary px-2.5 py-1 rounded-md bg-[rgba(109,113,249,0.06)]"
                  >
                    {tool}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>

        <ProcessBand steps={service.steps} />

        {service.caseStudy && (
          <motion.div
            className="rounded-2xl bg-bg-card p-6 sm:p-10 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center"
            style={{ boxShadow: "0 12px 36px rgba(39,40,72,0.05)" }}
            {...(shouldAnimate ? {
              initial: { opacity: 0, y: 16 },
              whileInView: { opacity: 1, y: 0 },
              viewport: { once: true, margin: "-80px" },
              transition: { duration: 0.5 },
            } : { initial: false })}
          >
            <div className="lg:col-span-8 flex flex-col items-start gap-2">
              <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-primary bg-[rgba(84,193,251,0.14)] px-3 py-1 rounded-full">
                <Bookmark size={13} aria-hidden="true" />
                Case Study
              </span>
              <h4 className="font-display text-xl font-bold text-text-primary">{service.caseStudy.title}</h4>
              <p className="text-text-secondary max-w-3xl">{service.caseStudy.description}</p>
            </div>
            <div className="lg:col-span-4 flex justify-start lg:justify-end">
              <Link
                href={service.caseStudy.href}
                className="group inline-flex items-center gap-2 text-sm font-semibold text-primary hover:text-primary/80 transition-colors"
              >
                Read the full case study
                <ArrowUpRight size={16} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" aria-hidden="true" />
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
  const servicesRef = useRef<HTMLDivElement>(null);
  const [tabBarVisible, setTabBarVisible] = useState(true);

  useEffect(() => {
    const el = servicesRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => setTabBarVisible(entry.isIntersecting),
      { rootMargin: "-140px 0px 0px 0px" },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const mountProps = shouldAnimate ? {
    variants: staggerContainer,
    initial: "hidden",
    animate: "visible",
  } : { initial: false };

  const childProps = shouldAnimate ? { variants: fadeUp } : { initial: false };

  const ambientProps = shouldAnimate ? {
    animate: { scale: [1, 1.15, 1] },
    transition: { duration: 10, repeat: Infinity, ease: "easeInOut" as const },
  } : {};

  return (
    <div className="text-text-primary">
      {/* ── Hero ───────────────────────────────────────────────────── */}
      <section className="relative pt-40 pb-16 overflow-hidden">
        <div
          className="absolute -top-32 right-0 w-[500px] h-[500px] rounded-full blur-[130px] pointer-events-none"
          style={{ background: "radial-gradient(circle, rgba(109,113,249,0.1) 0%, transparent 70%)" }}
        />

        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <motion.div {...mountProps} className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center mb-14">
            <div className="lg:col-span-7 flex flex-col items-start gap-5">
              <motion.span {...childProps} className="inline-flex items-center gap-2 text-primary text-xs font-bold uppercase tracking-[0.2em] bg-[rgba(109,113,249,0.08)] px-4 py-1.5 rounded-full">
                <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                What We Offer
              </motion.span>

              <motion.h1 {...childProps} className="font-display text-5xl sm:text-6xl lg:text-7xl font-bold leading-[1.05] text-text-primary">
                Our Services
              </motion.h1>

              <motion.div {...childProps} className="flex flex-col gap-2 max-w-xl">
                <p className="text-text-secondary text-lg leading-relaxed">
                  Tell us about your project. We&apos;ll scope the right technical solution together.
                </p>
                <p className="text-primary font-medium flex items-center gap-2">
                  <CheckCircle2 size={18} aria-hidden="true" />
                  One team, end-to-end delivery, no handoffs.
                </p>
              </motion.div>

              <motion.div {...childProps} className="pt-1">
                <Link
                  href="/contact"
                  className="group inline-flex items-center gap-2.5 px-8 py-[14px] rounded-full font-semibold text-base text-white transition-all duration-300 hover:brightness-110 hover:scale-[1.02]"
                  style={{ background: "linear-gradient(135deg, #6D71F9, #54C1FB)", boxShadow: "0 8px 24px rgba(109,113,249,0.3)" }}
                >
                  Let&apos;s Talk
                  <ArrowRight size={17} className="transition-transform duration-200 group-hover:translate-x-1" aria-hidden="true" />
                </Link>
              </motion.div>
            </div>

            <motion.div {...childProps} className="lg:col-span-5 flex justify-center lg:justify-end">
              <HeroPrism />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── Sticky tab bar — pins below the main nav while scrolling, ─
          hidden once the last service section has scrolled past and
          revealed again when a service section comes back into view */}
      <motion.div
        className="sticky top-16 z-40 border-b"
        style={{
          background: "rgba(248,249,255,0.92)",
          borderColor: "rgba(109,113,249,0.08)",
          pointerEvents: tabBarVisible ? "auto" : "none",
        }}
        animate={{ opacity: tabBarVisible ? 1 : 0, y: tabBarVisible ? 0 : -8 }}
        transition={{ duration: 0.25, ease: "easeOut" }}
      >
        <div className="absolute inset-0 -z-10 backdrop-blur-xl" aria-hidden="true" />
        <div className="max-w-7xl mx-auto px-6 py-3">
          <AnchorNav />
        </div>
      </motion.div>

      {/* ── Service sections ──────────────────────────────────────── */}
      <div ref={servicesRef}>
        {services.map((service, index) => (
          <ServiceSection key={service.id} service={service} index={index} />
        ))}
      </div>

      {/* ── Closing CTA ────────────────────────────────────────────── */}
      <section className="py-24 relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-6">
          <motion.div
            className="relative overflow-hidden rounded-3xl p-12 sm:p-20 text-center flex flex-col items-center border border-border-subtle"
            style={{
              background: "linear-gradient(135deg, #FFFFFF 0%, #F1F0FF 55%, #E8E6FF 100%)",
              boxShadow: "0 8px 40px rgba(109,113,249,0.12)",
            }}
            {...(shouldAnimate ? {
              initial: { opacity: 0, y: 10 },
              whileInView: { opacity: 1, y: 0 },
              viewport: { once: true, margin: "-80px" },
              transition: { duration: 0.5, ease: [0.215, 0.61, 0.355, 1.0] },
            } : { initial: false })}
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
              <span className="inline-block text-primary text-xs font-bold uppercase mb-4" style={{ letterSpacing: "0.14em" }}>
                Let&apos;s Build Something
              </span>
              <h2 className="font-display font-extrabold leading-[1.05] mb-4 text-text-primary" style={{ fontSize: "clamp(32px, 5vw, 44px)" }}>
                Not sure which service fits?
              </h2>
              <p className="text-lg leading-relaxed mb-8 max-w-xl text-text-secondary">
                Tell us about your project. We&apos;ll scope the right technical solution together.
              </p>
              <Link
                href="/contact"
                className="group inline-flex items-center gap-3 px-10 py-4 rounded-full font-semibold text-base text-white transition-all duration-300 hover:scale-[1.02]"
                style={{ background: "linear-gradient(135deg, #6D71F9, #54C1FB)", boxShadow: "0 8px 24px rgba(109,113,249,0.3)" }}
              >
                Let&apos;s Talk
                <ArrowRight size={17} className="group-hover:translate-x-0.5 transition-transform duration-200" aria-hidden="true" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
