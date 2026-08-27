"use client";

import { fadeUp, staggerContainer } from "@/lib/animations";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { useMotionSafe } from "@/hooks/useMotionSafe";
import { useSectionReveal } from "@/hooks/useSectionReveal";
import TiltProjectCard from "@/components/ui/TiltProjectCard";

const projects = [
  {
    slug: "raj-ceylon",
    title: "Raj Ceylon Tours",
    category: "Web Development",
    description:
      "Luxury Sri Lanka tourism website with multi-language support, custom itinerary UX, and a unique tree-planting experience. Built with Next.js 14 and Framer Motion.",
    tags: ["Next.js", "TypeScript", "Framer Motion", "Multilingual", "Tourism"],
    coverImage: "/project-covers/raj-ceylon-cover.jpeg",
    stats: ["Multi-language", "Custom itinerary UX", "Live"],
    privateBadge: false,
    featured: true,
    result: "Luxury tourism website, multi-language, live",
  },
  {
    slug: "alibaba-scraper",
    title: "Alibaba Supplier Intelligence",
    category: "Automation",
    description:
      "Fully automated supplier intelligence platform for an Australian importer - monitoring stores, detecting new launches, and running visual search. Replaces 8-10 hours of manual research per week.",
    tags: ["Python", "Playwright", "Anti-Detection", "CSV", "Data Extraction"],
    coverImage: "/project-covers/alibaba-scraper-cover.jpeg",
    stats: ["8-10 hrs/wk automated", "47 data fields", "Live v1.3.0"],
    privateBadge: true,
  },
];

export default function PortfolioSection() {
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
    <section ref={ref} className="py-28 relative overflow-hidden">
      <motion.div
        className="relative z-10 max-w-7xl mx-auto px-6"
        {...(shouldAnimate
          ? {
              initial: { opacity: 0, y: 10 },
              animate: inView ? { opacity: 1, y: 0 } : {},
              transition: { duration: 0.5, delay: 0.1, ease: [0.215, 0.61, 0.355, 1.0] },
            }
          : { initial: false })}
      >
        {/* Header */}
        <motion.div
          className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-16"
          {...scrollProps}
        >
          <div>
            <motion.span {...childProps} className="inline-block text-accent text-xs font-bold uppercase tracking-[0.2em] mb-4">
              Selected Work
            </motion.span>
            <motion.h2 {...childProps} className="font-display text-4xl sm:text-5xl font-bold text-text-primary">
              Our Work
            </motion.h2>
          </div>
          <motion.div {...childProps}>
            <Link href="/portfolio" className="inline-flex items-center gap-2 text-sm font-medium text-text-secondary hover:text-primary transition-colors duration-200">
              View All Projects
              <ArrowRight size={15} />
            </Link>
          </motion.div>
        </motion.div>

        {/* Cards grid */}
        <motion.div className="grid grid-cols-1 md:grid-cols-2 gap-6" {...scrollProps}>
          {projects.map((project) => (
            <TiltProjectCard key={project.slug} project={project} />
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div
          className="text-center mt-14"
          {...(shouldAnimate ? {
            initial: "hidden",
            whileInView: "visible" as const,
            viewport: { once: true, margin: "-80px" },
            variants: fadeUp,
          } : { initial: false })}
        >
          <Link
            href="/portfolio"
            className="inline-flex items-center gap-2.5 px-8 py-4 rounded-full border-[1.5px] border-[rgba(26,26,46,0.2)] text-text-primary font-semibold text-base transition-all duration-300 hover:border-primary hover:text-primary hover:bg-primary/[0.04] hover:scale-[1.02]"
          >
            View All Projects
            <ArrowRight size={17} />
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
}
