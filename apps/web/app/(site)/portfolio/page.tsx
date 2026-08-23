"use client";

import { fadeUp, staggerContainer } from "@/lib/animations";
import { useMotionSafe } from "@/hooks/useMotionSafe";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import DraftingIllustration from "@/components/illustrations/DraftingIllustration";
import TiltProjectCard, { type Project } from "@/components/ui/TiltProjectCard";

/* ─── Types ─────────────────────────────────────────────────────────── */

type Category = "All" | "Web Development" | "Automation";

/* ─── Data ──────────────────────────────────────────────────────────── */

const projects: Project[] = [
  {
    slug: "raj-ceylon",
    title: "Raj Ceylon Tours",
    description:
      "Luxury Sri Lanka tourism website with multi-language support, custom itinerary UX, and a unique tree-planting experience tied to each booking.",
    category: "Web Development",
    tags: ["Next.js", "TypeScript", "Framer Motion", "Multilingual", "Tourism"],
    coverImage: "/project-covers/raj-ceylon-cover.jpeg",
    stats: ["Multi-language", "Custom itinerary UX", "Live"],
    privateBadge: false,
  },
  {
    slug: "alibaba-scraper",
    title: "Alibaba Supplier Intelligence",
    description:
      "Fully automated supplier intelligence platform for an Australian importer - monitoring stores, detecting new launches, and running visual search. Replaces 8-10 hours of manual research per week.",
    category: "Automation",
    tags: ["Python", "Playwright", "Anti-Detection", "CSV", "Data Extraction"],
    coverImage: "/project-covers/alibaba-scraper-cover.jpeg",
    stats: ["8-10 hrs/wk automated", "47 data fields", "Live v1.3.0"],
    privateBadge: true,
  },
];

const categories: Category[] = ["All", "Web Development", "Automation"];

/* ─── Page ───────────────────────────────────────────────────────────── */

export default function PortfolioPage() {
  const [active, setActive] = useState<Category>("All");
  const { shouldAnimate } = useMotionSafe();

  const filtered =
    active === "All" ? projects : projects.filter((p) => p.category === active);

  const mountProps = shouldAnimate ? {
    variants: staggerContainer,
    initial: "hidden",
    animate: "visible",
  } : { initial: false };

  const childProps = shouldAnimate ? { variants: fadeUp } : { initial: false };

  const scrollProps = shouldAnimate ? {
    variants: staggerContainer,
    initial: "hidden",
    whileInView: "visible" as const,
    viewport: { once: true, margin: "-80px" },
  } : { initial: false };

  return (
    <div className="bg-dark text-white min-h-screen">
      {/* ── Hero ───────────────────────────────────────────────────── */}
      <section className="relative pt-40 pb-16 overflow-hidden">
        <motion.div
          className="absolute -top-32 -right-24 w-120 h-120 rounded-full blur-[130px] pointer-events-none"
          style={{ background: "radial-gradient(circle, rgba(109,113,249,0.32) 0%, transparent 70%)" }}
          {...(shouldAnimate ? {
            animate: { scale: [1, 1.12, 1] },
            transition: { duration: 9, repeat: Infinity, ease: "easeInOut" as const },
          } : {})}
        />
        <motion.div
          className="absolute bottom-0 -left-24 w-95 h-95 rounded-full blur-[110px] pointer-events-none"
          style={{ background: "radial-gradient(circle, rgba(84,193,251,0.22) 0%, transparent 70%)" }}
          {...(shouldAnimate ? {
            animate: { scale: [1, 1.15, 1] },
            transition: { duration: 11, repeat: Infinity, ease: "easeInOut" as const, delay: 2 },
          } : {})}
        />

        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-[3fr_2fr] gap-12 items-center">
            <motion.div {...mountProps}>
              <motion.span {...childProps} className="inline-block text-primary text-xs font-bold uppercase tracking-[0.2em] mb-5">
                Selected Work
              </motion.span>
              <motion.h1 {...childProps} className="font-display text-5xl sm:text-6xl lg:text-7xl font-bold leading-[1.05] mb-6">
                Our{" "}
                <span className="text-gradient">Portfolio</span>
              </motion.h1>
              <motion.p {...childProps} className="text-white/55 text-lg sm:text-xl leading-relaxed max-w-2xl">
                Real projects, built with care. Every line of code and design
                decision made with purpose.
              </motion.p>
            </motion.div>

            <ProjectPreviewCollage projects={projects.slice(0, 2)} shouldAnimate={shouldAnimate} />
          </div>
        </div>
      </section>

      {/* ── Filter tabs ────────────────────────────────────────────── */}
      <section className="sticky top-16 z-30 bg-dark/80 backdrop-blur-md border-b border-white/7 py-4">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            className="flex items-center gap-2 flex-wrap"
            {...(shouldAnimate ? {
              initial: { opacity: 0, y: -8 },
              animate: { opacity: 1, y: 0 },
              transition: { delay: 0.3, duration: 0.5 },
            } : { initial: false })}
          >
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActive(cat)}
                className={`relative px-5 py-2 rounded-full text-sm font-semibold transition-all duration-200 ${
                  active === cat
                    ? "text-white"
                    : "text-white/45 hover:text-white/75"
                }`}
              >
                {active === cat && (
                  shouldAnimate ? (
                    <motion.span
                      layoutId="pill"
                      className="absolute inset-0 rounded-full bg-primary"
                      transition={{ type: "spring", stiffness: 350, damping: 28 }}
                    />
                  ) : (
                    <span className="absolute inset-0 rounded-full bg-primary" />
                  )
                )}
                <span className="relative z-10">{cat}</span>
              </button>
            ))}

            <span className="ml-auto text-xs text-white/30 font-medium">
              {filtered.length} project{filtered.length !== 1 ? "s" : ""}
            </span>
          </motion.div>
        </div>
      </section>

      {/* ── Project grid ───────────────────────────────────────────── */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6">
          <AnimatePresence mode="popLayout">
            <motion.div
              key={active}
              className="grid grid-cols-1 sm:grid-cols-2 gap-6"
              {...(shouldAnimate ? {
                variants: staggerContainer,
                initial: "hidden",
                animate: "visible",
                exit: { opacity: 0, transition: { duration: 0.15 } },
              } : { initial: false })}
            >
              {filtered.map((project) => (
                <TiltProjectCard key={project.slug} project={project} headingLevel="h2" />
              ))}

              {/* Placeholder card */}
              <motion.div
                key="placeholder"
                {...(shouldAnimate ? { variants: fadeUp, layout: true } : { initial: false })}
                className="rounded-[20px] border border-dashed flex flex-col items-center justify-center text-center min-h-[300px] p-8"
                style={{
                  background: "rgba(255,255,255,0.01)",
                  borderColor: "rgba(255,255,255,0.08)",
                }}
              >
                <DraftingIllustration className="w-20 h-20 mb-4" />
                <p className="text-[14px] text-white/30">More work on the way</p>
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* ── Bottom CTA ─────────────────────────────────────────────── */}
      <section className="py-20 border-t border-white/7">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div className="text-center" {...scrollProps}>
            <motion.h2 {...childProps} className="font-display text-3xl sm:text-4xl font-bold mb-5">
              Ready to be our next project?
            </motion.h2>
            <motion.p {...childProps} className="text-white/50 mb-8 max-w-md mx-auto">
              Tell us what you&apos;re building and let&apos;s create something remarkable together.
            </motion.p>
            <motion.div {...childProps}>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2.5 px-8 py-4 rounded-full font-bold text-white transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-primary/25"
                style={{ background: "linear-gradient(135deg, #6D71F9, #54C1FB)" }}
              >
                Start a Project
                <ArrowRight size={17} />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

/* ─── ProjectPreviewCollage ─────────────────────────────────────────── */

function ProjectPreviewCollage({
  projects,
  shouldAnimate,
}: {
  projects: Project[];
  shouldAnimate: boolean;
}) {
  const rotations = [-6, 5];
  const offsets = [
    { top: "0%", left: "8%" },
    { top: "22%", left: "32%" },
  ];

  return (
    <div className="relative h-80 sm:h-95 hidden sm:block">
      {projects.map((project, i) => (
        <motion.div
          key={project.slug}
          className="absolute w-55 rounded-2xl overflow-hidden border border-white/10 shadow-2xl"
          style={{
            top: offsets[i]?.top,
            left: offsets[i]?.left,
            zIndex: i + 1,
            rotate: rotations[i],
            background: "var(--surface-card)",
          }}
          {...(shouldAnimate
            ? {
                initial: { opacity: 0, y: 30, rotate: rotations[i] },
                animate: { opacity: 1, y: 0, rotate: rotations[i] },
                transition: { duration: 0.7, delay: 0.25 + i * 0.15, ease: [0.215, 0.61, 0.355, 1.0] as const },
                whileHover: { rotate: 0, scale: 1.04, zIndex: 10 },
              }
            : { initial: false })}
        >
          <div className="relative h-32">
            <Image
              src={project.coverImage}
              alt={project.title}
              fill
              sizes="220px"
              className="object-cover"
            />
          </div>
          <div className="p-4" style={{ background: "var(--surface-card)" }}>
            <p className="font-display text-sm font-bold text-white mb-0.5">{project.title}</p>
            <p className="text-xs text-white/40">{project.category}</p>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
