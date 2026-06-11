"use client";

import { fadeUp, staggerContainer } from "@/lib/animations";
import { motion } from "framer-motion";
import { ArrowRight, Search, Terminal, TrendingUp } from "lucide-react";
import Link from "next/link";
import { useRef, useState } from "react";
import { useMotionSafe } from "@/hooks/useMotionSafe";
import type { LucideIcon } from "lucide-react";

interface ServiceItem {
  icon: LucideIcon;
  title: string;
  description: string;
  href: string;
  featured: boolean;
}

const services: ServiceItem[] = [
  {
    icon: Terminal,
    title: "Supplier Intelligence Tools",
    description:
      "Custom-built Python scrapers that monitor your Alibaba suppliers daily — tracking new launches, price changes, and stock movements. Delivered as structured CSV data, ready to action.",
    href: "/services#automation",
    featured: true,
  },
  {
    icon: Search,
    title: "Product Research Automation",
    description:
      "Automated keyword searches and product deep-dives across Alibaba at scale. Stop doing this manually — get structured data on demand.",
    href: "/services#automation",
    featured: false,
  },
  {
    icon: TrendingUp,
    title: "Competitor Price Monitoring",
    description:
      "Track competitor listings and pricing movements automatically. Know when the market shifts before your competitors do.",
    href: "/services#automation",
    featured: false,
  },
];

function SpotlightCard({ service }: { service: ServiceItem }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [spot, setSpot] = useState({ x: 0, y: 0, on: false });
  const { shouldAnimate } = useMotionSafe();

  const animProps = shouldAnimate ? {
    variants: fadeUp,
    whileHover: { y: -8, boxShadow: service.featured
      ? "0 20px 60px rgba(109,113,249,0.25)"
      : "0 20px 60px rgba(109,113,249,0.15)"
    },
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
      className={[
        "group relative flex flex-col rounded-3xl overflow-hidden transition-colors duration-[350ms]",
        service.featured
          ? "border border-primary/25 hover:border-primary/50"
          : "border border-white/[0.06] hover:border-primary/30",
      ].join(" ")}
      style={{
        padding: 32,
        background: service.featured
          ? "rgba(109,113,249,0.06)"
          : "rgba(255,255,255,0.02)",
      }}
    >
      {/* Featured badge */}
      {service.featured && (
        <div className="absolute top-4 right-4">
          <span
            className="px-3 py-1 rounded-full text-xs font-semibold"
            style={{
              background: "rgba(109,113,249,0.15)",
              border: "1px solid rgba(109,113,249,0.4)",
              color: "#6D71F9",
            }}
          >
            Core Service
          </span>
        </div>
      )}

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
      <p className="relative text-white/50 text-sm leading-relaxed mb-7 flex-1">
        {service.description}
      </p>

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
