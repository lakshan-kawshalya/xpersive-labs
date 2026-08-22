"use client";

import { fadeUp, staggerContainer } from "@/lib/animations";
import { motion } from "framer-motion";
import { ArrowRight, Globe, ShoppingBag, Terminal, Zap } from "lucide-react";
import Link from "next/link";
import { useRef, useState } from "react";
import { useMotionSafe } from "@/hooks/useMotionSafe";
import { useSectionReveal } from "@/hooks/useSectionReveal";
import { SectionRevealOverlays } from "@/components/sections/SectionRevealOverlays";

const services = [
  {
    icon: Globe,
    title: "Web Application Development",
    description:
      "We build fast, modern web applications using Next.js and TypeScript - from marketing sites and client portals to SaaS dashboards and content platforms. Performance-first, SEO-ready, and built to scale without a rebuild in 18 months.",
    href: "/services#web",
    caseStudy: {
      title: "Raj Ceylon Tours",
      text: "Luxury Sri Lanka tourism website with multi-language support, custom itinerary UX, and a unique tree-planting experience. Built in Next.js 14 with Framer Motion.",
      href: "/portfolio/raj-ceylon",
    },
    featured: false,
  },
  {
    icon: Terminal,
    title: "Automation & Data Pipelines",
    description:
      "We build custom scraping tools, API integrations, and data pipelines for businesses that need reliable, structured data at scale. Anti-detection hardened, scheduled, and monitored. If it breaks, we fix it.",
    href: "/services#automation",
    caseStudy: {
      title: "Alibaba Supplier Intelligence Platform",
      text: "Automated supplier monitoring for an Australian importer - replacing 8-10 hours of weekly manual research. 47 data fields extracted daily across 5 automated functions.",
      href: "/portfolio/alibaba-scraper",
    },
    featured: true,
  },
  {
    icon: ShoppingBag,
    title: "Ecommerce Development",
    description:
      "Custom Shopify storefronts and ecommerce integrations built for conversion. Product filtering, inventory sync, custom checkout flows, and the automation layers that save your team hours every week.",
    href: "/services#ecommerce",
    caseStudy: null,
    featured: false,
  },
  {
    icon: Zap,
    title: "AI Workflow Integration",
    description:
      "We embed AI into your business processes - LLM-powered content tools, intelligent data extraction, customer response automation, and custom AI applications. Practical AI that reduces hours, not just impresses in demos.",
    href: "/services#ai",
    caseStudy: null,
    featured: false,
  },
];

function SpotlightCard({ service }: { service: typeof services[number] }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [spot, setSpot] = useState({ x: 0, y: 0, on: false });
  const { shouldAnimate } = useMotionSafe();

  const animProps = shouldAnimate ? {
    variants: fadeUp,
    whileHover: { y: -8, boxShadow: "0 20px 60px rgba(109,113,249,0.15)" },
    transition: { type: "spring" as const, stiffness: 200, damping: 22 },
    onMouseMove: (e: React.MouseEvent<HTMLDivElement>) => {
      const r = cardRef.current?.getBoundingClientRect();
      if (r) setSpot({ x: e.clientX - r.left, y: e.clientY - r.top, on: true });
    },
    onMouseLeave: () => setSpot((s) => ({ ...s, on: false })),
  } : { initial: false };

  return (
    <motion.div
      ref={cardRef}
      {...animProps}
      className={`group relative flex flex-col rounded-3xl border overflow-hidden transition-colors duration-[350ms] ${service.featured ? "border-primary/20 hover:border-primary/50" : "border-white/[0.06] hover:border-primary/30"}`}
      style={{ padding: 32, background: service.featured ? "rgba(109,113,249,0.07)" : "rgba(255,255,255,0.02)" }}
    >
      {/* Hover background tint */}
      <div
        className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{ background: "rgba(109,113,249,0.04)" }}
      />
      {service.featured && (
        <div
          className="absolute top-4 right-4 px-2.5 py-1 rounded-full text-[11px] font-semibold z-10"
          style={{
            background: "linear-gradient(135deg, rgba(109,113,249,0.25), rgba(84,193,251,0.25))",
            border: "1px solid rgba(109,113,249,0.35)",
            color: "rgba(255,255,255,0.8)",
          }}
        >
          Core Service
        </div>
      )}
      {/* Spotlight radial */}
      {shouldAnimate && (
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            opacity: spot.on ? 1 : 0,
            transition: "opacity 0.2s ease",
            background: `radial-gradient(circle at ${spot.x}px ${spot.y}px, rgba(109,113,249,0.08) 0%, transparent 60%)`,
          }}
        />
      )}

      {/* Icon container */}
      <div
        className="relative inline-flex items-center justify-center w-12 h-12 mb-7 transition-all duration-300 group-hover:rotate-[5deg]"
        style={{
          borderRadius: 14,
          background: "linear-gradient(135deg, rgba(109,113,249,0.2), rgba(84,193,251,0.2))",
          border: "1px solid rgba(109,113,249,0.3)",
        }}
      >
        <service.icon size={24} className="text-primary" />
      </div>

      <h3 className="relative font-display text-xl font-bold mb-3 text-white">
        {service.title}
      </h3>
      <p className="relative text-white/50 text-sm leading-relaxed mb-5 flex-1">
        {service.description}
      </p>

      {/* Case study callout */}
      {service.caseStudy && (
        <div
          className="relative flex gap-4 rounded-2xl mb-5 p-5"
          style={{
            background: "rgba(109,113,249,0.05)",
            border: "1px solid rgba(109,113,249,0.12)",
          }}
        >
          <div>
            <span
              className="inline-block text-[10px] font-bold uppercase tracking-[0.15em] mb-1"
              style={{ color: "rgba(255,255,255,0.35)" }}
            >
              Case Study
            </span>
            <p className="text-white text-xs font-semibold mb-1">
              {service.caseStudy.title}
            </p>
            <p className="text-white/45 text-xs leading-relaxed mb-2">
              {service.caseStudy.text}
            </p>
            <Link
              href={service.caseStudy.href}
              className="inline-flex items-center gap-1 text-xs font-semibold transition-opacity duration-200 hover:opacity-75"
              style={{ color: "#6D71F9" }}
            >
              Read the full case study
              <ArrowRight size={11} />
            </Link>
          </div>
        </div>
      )}

      {/* Learn More - visible on hover */}
      <Link
        href={service.href}
        className="relative inline-flex items-center gap-1.5 text-sm font-semibold text-primary opacity-0 translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300"
      >
        Learn More
        <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform duration-200" />
      </Link>
    </motion.div>
  );
}

export default function ServicesSection() {
  const { shouldAnimate } = useMotionSafe();
  const { ref, inView } = useSectionReveal();

  const scrollProps = shouldAnimate ? {
    variants: staggerContainer,
    initial: "hidden",
    whileInView: "visible" as const,
    viewport: { once: true, margin: "-80px" },
  } : { initial: false };

  return (
    <section ref={ref} className="py-28 relative overflow-hidden">
      <SectionRevealOverlays inView={inView} shouldAnimate={shouldAnimate} />

      <motion.div
        className="max-w-7xl mx-auto px-6"
        {...(shouldAnimate
          ? {
              initial: { opacity: 0, y: 10 },
              animate: inView ? { opacity: 1, y: 0 } : {},
              transition: { duration: 0.5, delay: 0.1, ease: [0.215, 0.61, 0.355, 1.0] },
            }
          : { initial: false })}
      >
        <motion.div className="text-center mb-16" {...scrollProps}>
          <motion.span {...(shouldAnimate ? { variants: fadeUp } : { initial: false })} className="inline-block text-primary text-xs font-bold uppercase tracking-[0.2em] mb-4">
            Our Expertise
          </motion.span>
          <motion.h2 {...(shouldAnimate ? { variants: fadeUp } : { initial: false })} className="font-display text-4xl sm:text-5xl font-bold mb-5">
            What We Build
          </motion.h2>
          <motion.p {...(shouldAnimate ? { variants: fadeUp } : { initial: false })} className="text-white/50 text-lg max-w-xl mx-auto leading-relaxed">
            Four services. Every project is scoped, built, and shipped by the same senior developer - direct access, no account managers, no dropped context.
          </motion.p>
        </motion.div>

        <motion.div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6" {...scrollProps}>
          {services.map((service) => (
            <SpotlightCard key={service.title} service={service} />
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}
