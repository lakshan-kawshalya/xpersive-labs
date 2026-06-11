"use client";

import { fadeUp, staggerContainer } from "@/lib/animations";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useMotionSafe } from "@/hooks/useMotionSafe";

const projects = [
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

function TiltCard({ project }: { project: typeof projects[number] }) {
  const ref = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);
  const [isTouch, setIsTouch] = useState(false);
  const { shouldAnimate } = useMotionSafe();

  useEffect(() => {
    setIsTouch(window.matchMedia("(hover: none)").matches);
  }, []);

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
      {...(shouldAnimate ? { variants: fadeUp } : { initial: false })}
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
      className="group relative rounded-[20px] overflow-hidden border border-white/6 bg-white/2"
    >
      {/* Sheen highlight that shifts with tilt */}
      {shouldAnimate && (
        <div
          className="absolute inset-0 pointer-events-none z-20 rounded-[20px]"
          style={{
            background: `linear-gradient(${105 + tilt.y * 5}deg, rgba(255,255,255,${hovered ? 0.04 : 0}) 0%, transparent 60%)`,
            transition: "background 0.1s ease",
          }}
        />
      )}

      {/* Image area */}
      <div className="relative h-52 overflow-hidden">
        <Image
          src={project.coverImage}
          alt={project.title}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
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

        {/* Hover overlay with pill CTA */}
        <div className="absolute inset-0 z-10 flex items-center justify-center transition-opacity duration-300"
          style={{ background: "rgba(15,15,30,0.7)", opacity: hovered ? 1 : 0 }}>
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
          <h3
            className="font-display text-[18px] font-bold transition-colors duration-200"
            style={{ color: hovered ? "#6D71F9" : "#ffffff" }}
          >
            {project.title}
          </h3>
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
          {project.description}
        </p>
        {project.stats && (
          <div className="flex flex-wrap gap-1.5 mb-3">
            {project.stats.map((stat) => (
              <span
                key={stat}
                className="rounded-full"
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

export default function PortfolioSection() {
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
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-150 h-px bg-linear-to-r from-transparent via-white/10 to-transparent" />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-16"
          {...scrollProps}
        >
          <div>
            <motion.span {...childProps} className="inline-block text-accent text-xs font-bold uppercase tracking-[0.2em] mb-4">
              Selected Work
            </motion.span>
            <motion.h2 {...childProps} className="font-display text-4xl sm:text-5xl font-bold">
              Our Work
            </motion.h2>
          </div>
          <motion.div {...childProps}>
            <Link href="/portfolio" className="inline-flex items-center gap-2 text-sm font-medium text-white/50 hover:text-primary transition-colors duration-200">
              View All Projects
              <ArrowRight size={15} />
            </Link>
          </motion.div>
        </motion.div>

        {/* Cards grid */}
        <motion.div className="grid grid-cols-1 md:grid-cols-2 gap-6" {...scrollProps}>
          {projects.map((project) => (
            <TiltCard key={project.slug} project={project} />
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
            className="inline-flex items-center gap-2.5 px-8 py-4 rounded-full border border-white/20 text-white font-semibold text-base transition-all duration-300 hover:border-primary/50 hover:bg-white/5 hover:scale-105"
          >
            View All Projects
            <ArrowRight size={17} />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
