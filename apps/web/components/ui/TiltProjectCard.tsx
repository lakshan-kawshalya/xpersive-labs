"use client";

import { fadeUp } from "@/lib/animations";
import { useMotionSafe } from "@/hooks/useMotionSafe";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";

export interface Project {
  slug: string;
  title: string;
  category: string;
  description: string;
  tags: string[];
  coverImage: string;
  stats?: string[];
  privateBadge?: boolean;
}

interface TiltProjectCardProps {
  project: Project;
  headingLevel?: "h2" | "h3";
}

export default function TiltProjectCard({ project, headingLevel = "h3" }: TiltProjectCardProps) {
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

  const Heading = headingLevel;

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
        background: "var(--surface-card)",
      }}
      className="relative rounded-[20px] overflow-hidden border border-white/[0.06]"
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

        {/* Hover overlay with pill CTA */}
        <div
          className="absolute inset-0 z-10 flex items-center justify-center"
          style={{ background: "rgba(15,15,30,0.7)", opacity: hovered ? 1 : 0, transition: "opacity 0.3s ease" }}
        >
          <motion.div
            {...(shouldAnimate
              ? {
                  animate: { y: hovered ? 0 : 10, opacity: hovered ? 1 : 0 },
                  transition: { duration: 0.2, ease: "easeOut" },
                }
              : {})}
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
      <div className="p-6" style={{ background: "var(--surface-card)" }}>
        <div className="flex flex-wrap items-center gap-2 mb-2">
          <Heading
            className="font-display text-[18px] font-bold transition-colors duration-200"
            style={{ color: hovered ? "#6D71F9" : "#ffffff" }}
          >
            {project.title}
          </Heading>
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
        <p className="text-white/50 text-sm leading-relaxed mb-3">{project.description}</p>
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
