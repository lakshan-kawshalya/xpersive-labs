"use client";

import { fadeUp, staggerContainer } from "@/lib/animations";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useMotionSafe } from "@/hooks/useMotionSafe";
import { useSectionReveal } from "@/hooks/useSectionReveal";

const caseStudies = [
  {
    slug: "raj-ceylon",
    badge: "Production Hours",
    meta: "Luxury Tour Booking Platform",
    title: "RajCeylonTours — Luxury Tour Booking Platform",
    description:
      "A luxury Sri Lanka tour booking and bespoke travel reservation platform designed for effortless discovery, bookings, and high-conversion guest experiences.",
    coverImage: "/project-covers/raj-ceylon-cover.jpeg",
    stats: [
      { label: "Deployment", value: "Global Edge" },
      { label: "Performance Score", value: "99 / 100", accent: true },
      { label: "Checkout Flow", value: "3 Steps" },
      { label: "Currency Engine", value: "Multi-Fiat" },
    ],
  },
  {
    slug: "alibaba-scraper",
    badge: "Automation & Data Intelligence",
    meta: "Australian Importer & Sourcing",
    title: "Alibaba Supplier Intelligence Platform",
    description:
      "A custom Python automation system that replaced 8-10 hours of manual weekly supplier research with fully automated daily monitoring for an Australian importer.",
    coverImage: "/project-covers/alibaba-scraper-cover.jpeg",
    stats: [
      { label: "Time Saved", value: "8+ hrs/week", accent: true },
      { label: "Data Fields", value: "47 fields" },
      { label: "Detection", value: "Daily automated" },
      { label: "Delivery", value: "Structured CSV" },
    ],
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
        className="max-w-7xl mx-auto px-6"
        {...(shouldAnimate
          ? {
              initial: { opacity: 0, y: 10 },
              animate: inView ? { opacity: 1, y: 0 } : {},
              transition: { duration: 0.5, delay: 0.1, ease: [0.215, 0.61, 0.355, 1.0] },
            }
          : { initial: false })}
      >
        <motion.div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-16" {...scrollProps}>
          <div>
            <motion.span {...childProps} className="inline-block text-primary text-xs font-bold uppercase tracking-[0.2em] mb-4">
              Case Studies · Production Systems
            </motion.span>
            <motion.h2 {...childProps} className="font-display text-4xl sm:text-5xl font-bold text-text-primary mb-3">
              A few things we&apos;ve built.
            </motion.h2>
            <motion.p {...childProps} className="text-text-secondary text-lg max-w-2xl leading-relaxed">
              Real systems deployed for global founders and institutions. Designed for clarity, resilient performance, and high conversion.
            </motion.p>
          </div>
          <motion.div {...childProps}>
            <Link href="/portfolio" className="inline-flex items-center gap-2 text-sm font-medium text-text-secondary hover:text-primary transition-colors duration-200">
              View All Projects
              <ArrowUpRight size={15} />
            </Link>
          </motion.div>
        </motion.div>

        <motion.div className="grid grid-cols-1 md:grid-cols-2 gap-8" {...scrollProps}>
          {caseStudies.map((study) => (
            <motion.article
              key={study.slug}
              {...childProps}
              {...(shouldAnimate
                ? { whileHover: { y: -6, boxShadow: "0 24px 56px rgba(109,113,249,0.16)" }, transition: { type: "spring", stiffness: 180, damping: 22 } }
                : {})}
              className="rounded-2xl border border-border-subtle bg-bg-card shadow-sm overflow-hidden group transition-colors duration-300 hover:border-primary/25 flex flex-col"
            >
              <div className="w-full rounded-t-2xl overflow-hidden relative aspect-video">
                <Image
                  src={study.coverImage}
                  alt={`${study.title} interface showcase`}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover object-top transition-transform duration-700 group-hover:scale-[1.03]"
                />
              </div>

              <div className="p-6 sm:p-8 flex flex-col gap-5 flex-1">
                <div>
                  <div className="flex flex-wrap items-center gap-2 mb-3">
                    <span className="text-xs font-bold uppercase tracking-wider text-primary px-3 py-1 bg-[rgba(109,113,249,0.08)] rounded-full">
                      {study.badge}
                    </span>
                    <span className="text-xs text-text-muted">{study.meta}</span>
                  </div>
                  <h3 className="font-display text-xl sm:text-2xl font-bold text-text-primary mb-2">{study.title}</h3>
                  <p className="text-text-secondary leading-relaxed">{study.description}</p>
                </div>

                <div className="grid grid-cols-2 gap-4 p-5 rounded-lg bg-[rgba(109,113,249,0.04)]">
                  {study.stats.map((stat) => (
                    <div key={stat.label}>
                      <span className="text-xs uppercase tracking-wider text-text-muted block">{stat.label}</span>
                      <span className={`font-display text-base font-semibold mt-1 block ${stat.accent ? "text-primary" : "text-text-primary"}`}>
                        {stat.value}
                      </span>
                    </div>
                  ))}
                </div>

                <Link
                  href={`/portfolio/${study.slug}`}
                  className="mt-auto self-start inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[rgba(109,113,249,0.08)] text-text-primary hover:bg-primary hover:text-white transition-all font-medium text-sm"
                >
                  Read Case Study
                  <ArrowUpRight size={17} aria-hidden="true" />
                </Link>
              </div>
            </motion.article>
          ))}
        </motion.div>

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
            <ArrowUpRight size={17} />
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
}
