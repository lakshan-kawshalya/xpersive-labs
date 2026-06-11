"use client";

import { fadeUp, staggerContainer } from "@/lib/animations";
import { motion } from "framer-motion";
import { ArrowRight, Globe, Palette, Terminal } from "lucide-react";
import Link from "next/link";
import { useRef, useState } from "react";
import { useMotionSafe } from "@/hooks/useMotionSafe";

const services = [
  {
    icon: Globe,
    title: "Web Development",
    description:
      "We build fast, modern web applications for e-commerce sellers, importers, and digital agencies. From client portals to custom dashboards, every project uses Next.js, TypeScript, and a relentless focus on performance and SEO.",
    href: "/services#web",
    caseStudy: null,
  },
  {
    icon: Palette,
    title: "UI/UX Design",
    description:
      "Great tools start with great design. We create clean, intuitive interfaces built for e-commerce workflows: supplier dashboards, product research tools, and white-label platforms ready for development.",
    href: "/services#design",
    caseStudy: null,
  },
  {
    icon: Terminal,
    title: "Automation and Web Scraping",
    description:
      "We build custom Alibaba supplier intelligence tools that track stores, detect new launches, and run visual search — extracting 47 structured data fields per product. Anti-detection hardened and production-ready.",
    href: "/services#automation",
    caseStudy: {
      title: "Alibaba Supplier Intelligence Platform",
      text: "Automated supplier monitoring for an Australian importer - replacing 8-10 hours of weekly research. 47 data fields extracted daily across 5 automated functions.",
      href: "/portfolio/alibaba-scraper",
    },
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
      className="group relative flex flex-col rounded-3xl border border-white/[0.06] hover:border-primary/30 overflow-hidden transition-colors duration-[350ms]"
      style={{ padding: 32, background: "rgba(255,255,255,0.02)" }}
    >
      {/* Hover background tint */}
      <div
        className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{ background: "rgba(109,113,249,0.04)" }}
      />
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

  const scrollProps = shouldAnimate ? {
    variants: staggerContainer,
    initial: "hidden",
    whileInView: "visible" as const,
    viewport: { once: true, margin: "-80px" },
  } : { initial: false };

  const childProps = shouldAnimate ? { variants: fadeUp } : { initial: false };

  return (
    <section className="py-28 relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      <div className="max-w-7xl mx-auto px-6">
        <motion.div className="text-center mb-16" {...scrollProps}>
          <motion.span {...childProps} className="inline-block text-primary text-xs font-bold uppercase tracking-[0.2em] mb-4">
            Our Expertise
          </motion.span>
          <motion.h2 {...childProps} className="font-display text-4xl sm:text-5xl font-bold mb-5">
            What We Do
          </motion.h2>
          <motion.p {...childProps} className="text-white/50 text-lg max-w-xl mx-auto leading-relaxed">
            From Alibaba data automation to custom web apps, we deliver
            end-to-end solutions that make a measurable difference for
            e-commerce businesses.
          </motion.p>
        </motion.div>

        <motion.div className="grid grid-cols-1 md:grid-cols-3 gap-6" {...scrollProps}>
          {services.map((service) => (
            <SpotlightCard key={service.title} service={service} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
