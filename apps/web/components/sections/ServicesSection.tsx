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
      "We build custom web applications using Next.js and TypeScript - client portals, SaaS dashboards, marketing sites, and content platforms. Performance-first, SEO-ready, and built to last without a rebuild in 18 months.",
    href: "/services#web",
  },
  {
    icon: Terminal,
    title: "Automation & Data Pipelines",
    description:
      "Where automation adds value to a project, we build it in - scrapers, API integrations, scheduled data jobs. Production-hardened and maintained as part of the wider product.",
    href: "/services#automation",
  },
  {
    icon: ShoppingBag,
    title: "Ecommerce Development",
    description:
      "Custom Shopify storefronts and ecommerce integrations built around conversion. Product filtering, checkout flows, and the backend automation that keeps inventory accurate.",
    href: "/services#ecommerce",
  },
  {
    icon: Zap,
    title: "AI Workflow Integration",
    description:
      "We embed AI into web products where it earns its place - LLM-powered features, intelligent data processing, and automation that reduces manual work for your team.",
    href: "/services#ai",
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
      className="group relative flex flex-col rounded-3xl border overflow-hidden transition-colors duration-[350ms] border-white/[0.06] hover:border-primary/30"
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
            Web application development is what we do. Automation, ecommerce integrations, and AI workflows extend what we build - they&apos;re tools in service of the product, not the product itself.
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
