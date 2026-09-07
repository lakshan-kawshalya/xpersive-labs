"use client";

import { fadeUp, staggerContainer } from "@/lib/animations";
import { motion } from "framer-motion";
import { CheckCircle2, Monitor, Palette, Shuffle, Smartphone, Terminal } from "lucide-react";
import { useRef, useState } from "react";
import { useMotionSafe } from "@/hooks/useMotionSafe";
import { useSectionReveal } from "@/hooks/useSectionReveal";

interface Service {
  icon: React.ElementType;
  label: string;
  title: string;
  description: string;
  tag: string;
}

const services: (Service & { span: string })[] = [
  {
    icon: Monitor,
    label: "Engineering",
    title: "Website Development",
    description: "Fast, modern websites that make your business easy to find and easy to trust.",
    tag: "Live in weeks, not months",
    span: "lg:col-span-7",
  },
  {
    icon: Smartphone,
    label: "Mobile",
    title: "Mobile App Development",
    description: "Apps for iOS and Android that put your business in your customer's pocket.",
    tag: "One app, every platform",
    span: "lg:col-span-5",
  },
];

const smallServices: Service[] = [
  {
    icon: Terminal,
    label: "Systems",
    title: "Software Development",
    description: "Custom tools and platforms built around how your business actually works.",
    tag: "Built around how you actually work",
  },
  {
    icon: Shuffle,
    label: "Efficiency",
    title: "Automation",
    description: "Save hours every week by letting software handle the repetitive work.",
    tag: "Hours saved, every single week",
  },
  {
    icon: Palette,
    label: "Product",
    title: "UI/UX Development",
    description: "Clean, simple design that makes people want to stay and come back.",
    tag: "Design people actually enjoy using",
  },
];

function ServiceCard({ service, className = "" }: { service: Service; className?: string }) {
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
      className={`group relative rounded-2xl border border-border-subtle bg-bg-card overflow-hidden p-8 sm:p-10 flex flex-col justify-between transition-colors duration-300 hover:border-primary/30 ${className}`}
      style={{ boxShadow: "0 2px 12px rgba(109,113,249,0.06)" }}
    >
      {/* Mouse-tracking spotlight */}
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

      <div className="relative">
        <div className="flex items-center justify-between mb-7">
          <span className="text-xs font-bold uppercase tracking-wider text-primary px-3 py-1 bg-[rgba(109,113,249,0.08)] rounded-full">
            {service.label}
          </span>
          <div
            className="w-11 h-11 rounded-xl flex items-center justify-center transition-transform duration-300 group-hover:rotate-[8deg] group-hover:scale-110"
            style={{
              background: "linear-gradient(135deg, rgba(109,113,249,0.14), rgba(84,193,251,0.14))",
              border: "1px solid rgba(109,113,249,0.25)",
            }}
          >
            <Icon size={20} className="text-primary" aria-hidden="true" />
          </div>
        </div>
        <h3 className="font-display text-xl font-bold text-text-primary mb-3">{service.title}</h3>
        <p className="text-text-secondary leading-relaxed">{service.description}</p>
      </div>
      <div className="relative pt-4 mt-6 border-t border-border-subtle text-primary font-medium text-sm flex items-center gap-2">
        <CheckCircle2 size={17} aria-hidden="true" />
        <span>{service.tag}</span>
      </div>
    </motion.div>
  );
}

export default function ServicesSectionLK() {
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
        <motion.div className="flex flex-col sm:flex-row sm:items-end justify-between mb-16 gap-6" {...scrollProps}>
          <div>
            <motion.span {...childProps} className="inline-block text-primary text-xs font-bold uppercase tracking-[0.2em] mb-3">
              Architectural Disciplines
            </motion.span>
            <motion.h2 {...childProps} className="font-display text-4xl sm:text-5xl font-bold text-text-primary">
              What we build
            </motion.h2>
          </div>
          <motion.p {...childProps} className="text-text-secondary max-w-md">
            Surgical digital engineering and product craft. Every engagement is led and authored by senior specialists in Colombo.
          </motion.p>
        </motion.div>

        <div className="flex flex-col gap-6">
          <motion.div className="grid grid-cols-1 lg:grid-cols-12 gap-6" {...scrollProps}>
            {services.map((service) => (
              <ServiceCard key={service.title} service={service} className={service.span} />
            ))}
          </motion.div>

          <motion.div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" {...scrollProps}>
            {smallServices.map((service) => (
              <ServiceCard key={service.title} service={service} />
            ))}
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
