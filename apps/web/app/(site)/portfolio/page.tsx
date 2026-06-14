"use client";

import { fadeUp, staggerContainer } from "@/lib/animations";
import { useMotionSafe } from "@/hooks/useMotionSafe";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";

/* ─── Types ─────────────────────────────────────────────────────────── */

type Category = "All" | "Automation";

interface Project {
  slug: string;
  title: string;
  shortDesc: string;
  category: Exclude<Category, "All">;
  tags: string[];
  coverImage: string;
  stats?: string[];
  privateBadge?: boolean;
}

/* ─── Data ──────────────────────────────────────────────────────────── */

const projects: Project[] = [
  {
    slug: "alibaba-scraper",
    title: "Alibaba Supplier Intelligence",
    shortDesc:
      "Fully automated supplier intelligence platform for an Australian importer - monitoring stores, detecting new launches, and running visual search. Replaces 8-10 hours of manual research per week.",
    category: "Automation",
    tags: ["Python", "Playwright", "Anti-Detection", "CSV", "Data Extraction"],
    coverImage: "/project-covers/alibaba-scraper-cover.jpeg",
    stats: ["8-10 hrs/wk automated", "47 data fields", "Live v1.3.0"],
    privateBadge: true,
  },
];

const categories: Category[] = ["All", "Automation"];

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
        <div
          className="absolute inset-0 opacity-[0.05] pointer-events-none"
          style={{
            backgroundImage: "radial-gradient(circle, #6D71F9 1px, transparent 1px)",
            backgroundSize: "36px 36px",
          }}
        />

        <div className="relative z-10 max-w-7xl mx-auto px-6">
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
                <ProjectCard key={project.slug} project={project} />
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
                <div
                  className="w-10 h-10 rounded-full border border-dashed flex items-center justify-center mb-4"
                  style={{ borderColor: "rgba(255,255,255,0.15)" }}
                >
                  <span className="text-white/20 text-xl leading-none">+</span>
                </div>
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

/* ─── ProjectCard ────────────────────────────────────────────────────── */

function ProjectCard({ project }: { project: Project }) {
  const ref = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);
  const [isTouch] = useState(
    () => typeof window !== "undefined" && window.matchMedia("(hover: none)").matches
  );
  const { shouldAnimate } = useMotionSafe();

  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isTouch || !shouldAnimate) return;
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const nx = (e.clientX - rect.left) / rect.width - 0.5;
    const ny = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x: ny * 6, y: nx * 4 });
  };

  const onMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
    setHovered(false);
  };

  return (
    <motion.div
      ref={ref}
      {...(shouldAnimate ? { variants: fadeUp, layout: true } : { initial: false })}
      onMouseMove={onMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={onMouseLeave}
      style={{
        transform: shouldAnimate
          ? `perspective(1000px) rotateX(${-tilt.x}deg) rotateY(${tilt.y}deg)`
          : undefined,
        transition: hovered
          ? "transform 0.1s ease"
          : "transform 0.5s cubic-bezier(0.23,1,0.32,1)",
      }}
      className="relative rounded-[20px] overflow-hidden border border-white/6 bg-white/2"
    >
      {/* Sheen */}
      {shouldAnimate && (
        <div
          className="absolute inset-0 pointer-events-none z-20 rounded-[20px]"
          style={{
            background: `linear-gradient(${105 + tilt.y * 5}deg, rgba(255,255,255,${hovered ? 0.04 : 0}) 0%, transparent 60%)`,
            transition: "background 0.1s ease",
          }}
        />
      )}

      {/* Cover image */}
      <div className="relative h-56 overflow-hidden">
        <Image
          src={project.coverImage}
          alt={project.title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover"
          style={{ transform: hovered ? "scale(1.05)" : "scale(1)", transition: "transform 0.5s ease" }}
        />

        {/* Category badge */}
        <div className="absolute top-4 left-4 z-10">
          <span
            className="px-3 py-1 rounded-full text-white text-xs font-semibold"
            style={{
              background: "rgba(15,15,30,0.8)",
              backdropFilter: "blur(8px)",
              border: "1px solid rgba(255,255,255,0.1)",
            }}
          >
            {project.category}
          </span>
        </div>

        {/* Hover overlay */}
        <div
          className="absolute inset-0 z-10 flex items-center justify-center"
          style={{ background: "rgba(15,15,30,0.7)", opacity: hovered ? 1 : 0, transition: "opacity 0.3s ease" }}
        >
          <motion.div
            {...(shouldAnimate ? {
              animate: { y: hovered ? 0 : 10, opacity: hovered ? 1 : 0 },
              transition: { duration: 0.2, ease: "easeOut" },
            } : {})}
          >
            <Link
              href={`/portfolio/${project.slug}`}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-white text-sm font-semibold"
              style={{ background: "rgba(109,113,249,0.9)" }}
            >
              Read Case Study
              <ArrowRight size={14} />
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Info area */}
      <div className="p-6" style={{ background: "rgba(255,255,255,0.02)" }}>
        <div className="flex flex-wrap items-center gap-2 mb-2">
          <h2
            className="font-display text-[18px] font-bold transition-colors duration-200"
            style={{ color: hovered ? "#6D71F9" : "#ffffff" }}
          >
            {project.title}
          </h2>
          {project.privateBadge && (
            <span
              className="px-2.5 py-0.5 rounded-full text-[11px] font-medium"
              style={{
                background: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(255,255,255,0.1)",
                color: "rgba(255,255,255,0.4)",
              }}
            >
              Private Repo
            </span>
          )}
        </div>
        <p className="text-white/50 text-sm leading-relaxed mb-3">
          {project.shortDesc}
        </p>
        {project.stats && (
          <div className="flex flex-wrap gap-1.5 mb-3">
            {project.stats.map((stat) => (
              <span
                key={stat}
                style={{
                  fontSize: 11,
                  background: "rgba(109,113,249,0.08)",
                  border: "1px solid rgba(109,113,249,0.15)",
                  borderRadius: 20,
                  padding: "3px 10px",
                  color: "rgba(255,255,255,0.6)",
                }}
              >
                {stat}
              </span>
            ))}
          </div>
        )}
        <div className="flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="px-3 py-1 rounded-full font-mono text-xs text-white/50 transition-all duration-200 hover:text-white"
              style={{
                background: "rgba(109,113,249,0.08)",
                border: "1px solid rgba(109,113,249,0.2)",
              }}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
