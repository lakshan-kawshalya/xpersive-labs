"use client";

import { fadeUp, staggerContainer } from "@/lib/animations";
import { motion } from "framer-motion";
import { Globe, ShoppingBag, Terminal, Zap } from "lucide-react";
import { useMotionSafe } from "@/hooks/useMotionSafe";
import { useSectionReveal } from "@/hooks/useSectionReveal";
import { SectionRevealOverlays } from "@/components/sections/SectionRevealOverlays";
import CircuitDividerIllustration from "@/components/illustrations/CircuitDividerIllustration";
import SpotlightCard from "@/components/ui/SpotlightCard";

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
            <SpotlightCard
              key={service.title}
              icon={service.icon}
              title={service.title}
              body={service.description}
              href={service.href}
            />
          ))}
        </motion.div>

        <CircuitDividerIllustration className="w-full h-12 mt-16" />
      </motion.div>
    </section>
  );
}
