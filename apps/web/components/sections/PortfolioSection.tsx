"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, ExternalLink } from "lucide-react";
import { fadeUp, staggerContainer } from "@/lib/animations";

const projects = [
  {
    title: "HealthSync Platform",
    description:
      "A comprehensive healthcare management platform with real-time data sync and AI-powered diagnostics.",
    tags: ["Web App", "React", "Next.js"],
    gradient: "from-[#6D71F9] via-purple-500 to-[#54C1FB]",
    accentColor: "#6D71F9",
  },
  {
    title: "TradeFlow Mobile",
    description:
      "Cross-platform trading app with live market feeds, portfolio analytics, and push alerts.",
    tags: ["Mobile", "React Native", "TypeScript"],
    gradient: "from-[#54C1FB] via-blue-400 to-cyan-300",
    accentColor: "#54C1FB",
  },
  {
    title: "Lumina Design System",
    description:
      "A cohesive, accessible design language powering 5+ enterprise products with a shared component library.",
    tags: ["UI/UX", "Design System", "Figma"],
    gradient: "from-purple-600 via-[#6D71F9] to-pink-500",
    accentColor: "#a855f7",
  },
];

export default function PortfolioSection() {
  return (
    <section className="py-28 relative overflow-hidden">
      <div className="absolute inset-0 bg-dark" />

      {/* Separator */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Header row */}
        <motion.div
          className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-16"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <div>
            <motion.span
              variants={fadeUp}
              className="inline-block text-accent text-xs font-bold uppercase tracking-[0.2em] mb-4"
            >
              Selected Work
            </motion.span>
            <motion.h2
              variants={fadeUp}
              className="font-display text-4xl sm:text-5xl font-bold"
            >
              Our Work
            </motion.h2>
          </div>

          <motion.div variants={fadeUp}>
            <Link
              href="/portfolio"
              className="inline-flex items-center gap-2 text-sm font-medium text-white/50 hover:text-primary transition-colors duration-200"
            >
              View All Projects
              <ArrowRight size={15} />
            </Link>
          </motion.div>
        </motion.div>

        {/* Project cards */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {projects.map((project) => (
            <motion.div
              key={project.title}
              variants={fadeUp}
              whileHover={{ y: -8, scale: 1.02 }}
              transition={{ type: "spring", stiffness: 280, damping: 20 }}
              className="group relative rounded-2xl overflow-hidden border border-white/10 bg-white/[0.03] hover:border-white/20 transition-colors duration-300"
            >
              {/* Gradient image placeholder */}
              <div
                className={`relative h-52 bg-gradient-to-br ${project.gradient} overflow-hidden`}
              >
                {/* Subtle pattern overlay */}
                <div
                  className="absolute inset-0 opacity-20"
                  style={{
                    backgroundImage:
                      "radial-gradient(circle at 20% 50%, rgba(255,255,255,0.2) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(255,255,255,0.15) 0%, transparent 40%)",
                  }}
                />
                {/* Grid lines */}
                <div
                  className="absolute inset-0 opacity-10"
                  style={{
                    backgroundImage:
                      "linear-gradient(rgba(255,255,255,0.3) 1px, transparent 1px), linear-gradient(to right, rgba(255,255,255,0.3) 1px, transparent 1px)",
                    backgroundSize: "32px 32px",
                  }}
                />

                {/* Hover overlay */}
                <div className="absolute inset-0 bg-dark/75 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center">
                  <div className="flex items-center gap-2.5 text-white font-semibold text-sm border border-white/20 px-5 py-2.5 rounded-full bg-white/10 backdrop-blur-sm">
                    <ExternalLink size={15} />
                    View Project
                  </div>
                </div>
              </div>

              {/* Card body */}
              <div className="p-6">
                <h3 className="font-display text-lg font-bold mb-2">
                  {project.title}
                </h3>
                <p className="text-white/50 text-sm leading-relaxed mb-5">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs text-white/50 font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          className="text-center mt-14"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={fadeUp}
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
