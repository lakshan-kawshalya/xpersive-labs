"use client";

import { fadeUp, staggerContainer } from "@/lib/animations";
import { motion } from "framer-motion";
import { CreditCard, Layers, Palette, Smartphone, Workflow, Globe } from "lucide-react";
import { useRef, useState } from "react";
import { useMotionSafe } from "@/hooks/useMotionSafe";
import { useSectionReveal } from "@/hooks/useSectionReveal";

interface Service {
  icon: React.ElementType;
  discipline: string;
  title: string;
  description: string;
  tags: string;
  span?: string;
  badge?: { value: string; label: string };
}

const services: Service[] = [
  {
    icon: Globe,
    discipline: "Discipline 01",
    title: "Website Development",
    description: "Fast, modern websites that make your business easy to find and easy to trust.",
    tags: "Next.js · Tailwind · SEO",
  },
  {
    icon: Smartphone,
    discipline: "Discipline 02",
    title: "Mobile App Development",
    description: "Apps for iOS and Android that put your business in your customer's pocket.",
    tags: "React Native · Flutter · Offline Sync",
  },
  {
    icon: Layers,
    discipline: "Discipline 03",
    title: "Software Development",
    description: "Custom tools and platforms built around how your business actually works.",
    tags: "Cloud SaaS · Distributed Systems",
  },
  {
    icon: Workflow,
    discipline: "Discipline 04",
    title: "Automation",
    description: "Save hours every week by letting software handle the repetitive work.",
    tags: "Python Scrapers · Webhooks · Cron Infrastructure",
    span: "lg:col-span-2",
    badge: { value: "100%", label: "Human-free pipelines" },
  },
  {
    icon: Palette,
    discipline: "Discipline 05",
    title: "UI/UX Development",
    description: "Clean, simple design that makes people want to stay and come back.",
    tags: "Design Systems · Micro-animations · WCAG AA",
  },
];

function ServiceCard({ service }: { service: Service }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [spot, setSpot] = useState({ x: 0, y: 0, on: false });
  const { shouldAnimate } = useMotionSafe();
  const Icon = service.icon;

  const animProps = shouldAnimate
    ? {
        variants: fadeUp,
        whileHover: { y: -6, boxShadow: "0 20px 48px rgba(109,113,249,0.16)" },
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
      className={`group relative rounded-2xl border border-border-subtle bg-bg-card overflow-hidden p-8 flex flex-col justify-between transition-colors duration-300 hover:border-primary/30 ${service.span ?? ""}`}
      style={{ boxShadow: "0 2px 12px rgba(109,113,249,0.06)" }}
    >
      {shouldAnimate && (
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            opacity: spot.on ? 1 : 0,
            transition: "opacity 0.2s ease",
            background: `radial-gradient(circle at ${spot.x}px ${spot.y}px, rgba(109,113,249,0.06) 0%, transparent 60%)`,
          }}
        />
      )}

      <div className={`relative ${service.badge ? "flex flex-col md:flex-row md:items-start justify-between gap-6" : ""}`}>
        <div className={service.badge ? "max-w-xl" : ""}>
          <div
            className="w-12 h-12 rounded-xl flex items-center justify-center mb-5 transition-colors duration-300 group-hover:bg-primary"
            style={{ background: "rgba(109,113,249,0.1)" }}
          >
            <Icon size={22} className="text-primary transition-colors duration-300 group-hover:text-white" aria-hidden="true" />
          </div>
          <span className="text-[11px] uppercase tracking-wider text-text-muted block mb-1">{service.discipline}</span>
          <h3 className="font-display text-xl font-bold text-text-primary mb-2">{service.title}</h3>
          <p className="text-text-secondary leading-relaxed">{service.description}</p>
        </div>

        {service.badge && (
          <div className="bg-[rgba(109,113,249,0.05)] px-5 py-3 rounded-xl flex items-center gap-3 self-start shrink-0">
            <CreditCard size={20} className="text-secondary" aria-hidden="true" />
            <div className="text-left">
              <div className="font-display text-lg font-bold text-text-primary leading-tight">{service.badge.value}</div>
              <div className="text-[11px] uppercase tracking-wider text-text-muted">{service.badge.label}</div>
            </div>
          </div>
        )}
      </div>

      <div className="relative mt-6 pt-4 border-t border-border-subtle flex items-center justify-between text-[11px] uppercase tracking-wider text-text-muted">
        <span>{service.tags}</span>
        <span className="text-primary transition-transform duration-200 group-hover:translate-x-1">→</span>
      </div>
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

  const childProps = shouldAnimate ? { variants: fadeUp } : { initial: false };

  return (
    <section ref={ref} className="py-28 relative overflow-hidden bg-[rgba(109,113,249,0.035)]">
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
        <motion.div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6" {...scrollProps}>
          <div>
            <motion.span {...childProps} className="inline-block text-primary text-xs font-bold uppercase tracking-[0.2em] mb-3">
              Architectural Disciplines
            </motion.span>
            <motion.h2 {...childProps} className="font-display text-4xl sm:text-5xl font-bold text-text-primary">
              What we build
            </motion.h2>
          </div>
          <motion.div
            {...childProps}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-bg-card border border-border-subtle text-text-primary shadow-sm self-start md:self-auto"
          >
            <CreditCard size={16} className="text-primary" aria-hidden="true" />
            <span className="text-sm font-medium">Engagements starting from $1,500 · Fixed sprint scopes</span>
          </motion.div>
        </motion.div>

        <motion.div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" {...scrollProps}>
          {services.map((service) => (
            <ServiceCard key={service.title} service={service} />
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}
