"use client";

import { fadeUp, staggerContainer } from "@/lib/animations";
import { motion } from "framer-motion";
import { Globe, ShoppingBag, Terminal, Zap } from "lucide-react";
import Link from "next/link";
import { useRef, useState } from "react";
import { useMotionSafe } from "@/hooks/useMotionSafe";
import { useSectionReveal } from "@/hooks/useSectionReveal";
import { SectionRevealOverlays } from "@/components/sections/SectionRevealOverlays";
import CircuitDividerIllustration from "@/components/illustrations/CircuitDividerIllustration";
import { LottieAnimation } from "@/components/ui/LottieAnimation";
import { LOTTIE_URLS } from "@/lib/animations-lottie";

const services = [
  {
    icon: Globe,
    lottie: LOTTIE_URLS.webDev,
    label: "Web Application Development",
    title: "Websites & Web Apps That Win Clients",
    description:
      "From marketing sites to client portals and SaaS dashboards — we build fast, modern web products using Next.js. Performance-first, SEO-ready, and built to last.",
    cta: "Learn more",
    href: "/services#web",
  },
  {
    icon: Terminal,
    lottie: LOTTIE_URLS.automation,
    label: "Automation & Data Pipelines",
    title: "Save Hours Every Week With Automation",
    description:
      "Scrapers, API integrations, scheduled jobs, and data pipelines. If you're doing it manually and it happens more than once a week, we can automate it.",
    cta: "See case study",
    href: "/portfolio/alibaba-scraper",
  },
  {
    icon: ShoppingBag,
    lottie: LOTTIE_URLS.ecommerce,
    label: "Ecommerce Development",
    title: "Shopify Stores That Actually Convert",
    description:
      "Custom Shopify storefronts built around conversion. Product filtering, checkout flows, inventory automation — the full stack, not just a theme.",
    cta: "Learn more",
    href: "/services#ecommerce",
  },
  {
    icon: Zap,
    lottie: LOTTIE_URLS.ai,
    label: "AI Workflow Integration",
    title: "AI Tools Built Into Your Business",
    description:
      "LLM-powered features, intelligent data processing, and automations that reduce manual work. We embed AI where it actually earns its place — not as a gimmick.",
    cta: "Learn more",
    href: "/services#ai",
  },
];

function ServiceCard({ service }: { service: (typeof services)[number] }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [spot, setSpot] = useState({ x: 0, y: 0, on: false });
  const { shouldAnimate } = useMotionSafe();
  const Icon = service.icon;

  const animProps = shouldAnimate
    ? {
        variants: fadeUp,
        whileHover: { y: -6, boxShadow: "0 8px 32px rgba(109,113,249,0.12)" },
        transition: { type: "spring" as const, stiffness: 200, damping: 22 },
        onMouseMove: (e: React.MouseEvent<HTMLDivElement>) => {
          const r = cardRef.current?.getBoundingClientRect();
          if (r) setSpot({ x: e.clientX - r.left, y: e.clientY - r.top, on: true });
        },
        onMouseLeave: () => setSpot((s) => ({ ...s, on: false })),
      }
    : { initial: false };

  return (
    <motion.div
      ref={cardRef}
      {...animProps}
      className="group relative flex flex-col rounded-3xl border overflow-hidden transition-colors duration-300 border-border-subtle hover:border-primary/25 bg-bg-card"
      style={{ padding: 32, boxShadow: "0 2px 12px rgba(109,113,249,0.06)" }}
    >
      {/* Spotlight radial */}
      {shouldAnimate && (
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            opacity: spot.on ? 1 : 0,
            transition: "opacity 0.2s ease",
            background: `radial-gradient(circle at ${spot.x}px ${spot.y}px, rgba(109,113,249,0.05) 0%, transparent 60%)`,
          }}
        />
      )}

      <div className="relative w-20 h-20 mb-5 -ml-2">
        <LottieAnimation
          src={service.lottie}
          style={{ width: 80, height: 80 }}
          fallback={
            <div className="w-14 h-14 rounded-xl flex items-center justify-center bg-primary/10 border border-primary/20">
              <Icon size={24} className="text-primary" />
            </div>
          }
        />
      </div>

      <span className="relative text-[11px] font-medium text-primary uppercase tracking-[0.1em] mb-2">
        {service.label}
      </span>
      <h3 className="relative font-display text-xl font-bold mb-3 text-text-primary">{service.title}</h3>
      <p className="relative text-[15px] text-text-secondary leading-relaxed flex-1 mb-5">
        {service.description}
      </p>

      <Link
        href={service.href}
        className="relative inline-flex items-center gap-1.5 text-sm font-medium text-primary w-fit hover:underline"
      >
        {service.cta}
        <span aria-hidden="true">→</span>
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
          <motion.h2 {...(shouldAnimate ? { variants: fadeUp } : { initial: false })} className="font-display text-4xl sm:text-5xl font-bold mb-5 text-text-primary">
            What We Build
          </motion.h2>
          <motion.p {...(shouldAnimate ? { variants: fadeUp } : { initial: false })} className="text-text-secondary text-lg max-w-xl mx-auto leading-relaxed">
            Web application development is what we do. Automation, ecommerce integrations, and AI workflows extend what we build - they&apos;re tools in service of the product, not the product itself.
          </motion.p>
        </motion.div>

        <motion.div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6" {...scrollProps}>
          {services.map((service) => (
            <ServiceCard key={service.title} service={service} />
          ))}
        </motion.div>

        <CircuitDividerIllustration className="w-full h-12 mt-16" />
      </motion.div>
    </section>
  );
}
