"use client";

import { fadeUp, staggerContainer } from "@/lib/animations";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, ExternalLink } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

/* ─── Types ─────────────────────────────────────────────────────────── */

type Category = "All" | "Web" | "Automation";

interface Project {
  slug: string;
  title: string;
  shortDesc: string;
  category: Exclude<Category, "All">;
  tags: string[];
  coverImage: string;
}

/* ─── Data ──────────────────────────────────────────────────────────── */

const projects: Project[] = [
  {
    slug: "xpersive-labs-website",
    title: "Xpersive Labs Website",
    shortDesc:
      "Our own company website built from the ground up - a fully animated, multi-page Next.js 14 site with immersive scroll effects, a visual CMS for blog management, and production deployment on Vercel.",
    category: "Web",
    tags: ["Next.js 14", "TypeScript", "Tailwind CSS", "Framer Motion", "Keystatic", "Vercel"],
    coverImage: "/project-covers/xpersive-labs-project-cover.jpeg",
    /* TODO: set liveUrl to "https://xpersivelabs.com" when domain is purchased */
  },
  {
    slug: "alibaba-scraper",
    title: "Alibaba Product Scraper",
    shortDesc:
      "An automated web scraping tool that extracts product listings, pricing data, and supplier contact information from Alibaba at scale. Designed for market research and competitive intelligence - outputs clean, structured data in both CSV and JSON formats.",
    category: "Automation",
    tags: ["Python", "Web Scraping", "BeautifulSoup", "Selenium", "CSV", "JSON", "Data Extraction"],
    coverImage: "/project-covers/alibaba-scraper-cover.jpeg",
  },
];

const categories: Category[] = ["All", "Web", "Automation"];

/* ─── Component ─────────────────────────────────────────────────────── */

export default function PortfolioPage() {
  const [active, setActive] = useState<Category>("All");

  const filtered =
    active === "All" ? projects : projects.filter((p) => p.category === active);

  return (
    <div className="bg-dark text-white min-h-screen">
      {/* ── Hero ───────────────────────────────────────────────────── */}
      <section className="relative pt-40 pb-16 overflow-hidden">
        <motion.div
          className="absolute -top-32 -right-24 w-[480px] h-[480px] rounded-full blur-[130px] pointer-events-none"
          style={{ background: "radial-gradient(circle, rgba(109,113,249,0.32) 0%, transparent 70%)" }}
          animate={{ scale: [1, 1.12, 1] }}
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-0 -left-24 w-[380px] h-[380px] rounded-full blur-[110px] pointer-events-none"
          style={{ background: "radial-gradient(circle, rgba(84,193,251,0.22) 0%, transparent 70%)" }}
          animate={{ scale: [1, 1.15, 1] }}
          transition={{ duration: 11, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        />
        <div
          className="absolute inset-0 opacity-[0.05] pointer-events-none"
          style={{
            backgroundImage: "radial-gradient(circle, #6D71F9 1px, transparent 1px)",
            backgroundSize: "36px 36px",
          }}
        />

        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <motion.div variants={staggerContainer} initial="hidden" animate="visible">
            <motion.span
              variants={fadeUp}
              className="inline-block text-primary text-xs font-bold uppercase tracking-[0.2em] mb-5"
            >
              Selected Work
            </motion.span>
            <motion.h1
              variants={fadeUp}
              className="font-display text-5xl sm:text-6xl lg:text-7xl font-bold leading-[1.05] mb-6"
            >
              Our{" "}
              <span className="text-gradient">Portfolio</span>
            </motion.h1>
            <motion.p
              variants={fadeUp}
              className="text-white/55 text-lg sm:text-xl leading-relaxed max-w-2xl"
            >
              Real projects, built with care. Every line of code and design
              decision made with purpose.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* ── Filter tabs ────────────────────────────────────────────── */}
      <section className="sticky top-16 z-30 bg-dark/80 backdrop-blur-md border-b border-white/[0.07] py-4">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            className="flex items-center gap-2 flex-wrap"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
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
                  <motion.span
                    layoutId="pill"
                    className="absolute inset-0 rounded-full bg-primary"
                    transition={{ type: "spring", stiffness: 350, damping: 28 }}
                  />
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
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
              exit={{ opacity: 0, transition: { duration: 0.15 } }}
            >
              {filtered.map((project) => (
                <ProjectCard key={project.slug} project={project} />
              ))}
            </motion.div>
          </AnimatePresence>

          {/* More projects coming soon */}
          <motion.p
            className="text-center text-white/25 text-sm mt-14 font-medium"
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            More projects coming soon.
          </motion.p>
        </div>
      </section>

      {/* ── Bottom CTA ─────────────────────────────────────────────── */}
      <section className="py-20 border-t border-white/[0.07]">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            className="text-center"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={staggerContainer}
          >
            <motion.h2
              variants={fadeUp}
              className="font-display text-3xl sm:text-4xl font-bold mb-5"
            >
              Ready to be our next project?
            </motion.h2>
            <motion.p
              variants={fadeUp}
              className="text-white/50 mb-8 max-w-md mx-auto"
            >
              Tell us what you&apos;re building and let&apos;s create something remarkable together.
            </motion.p>
            <motion.div variants={fadeUp}>
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
  return (
    <motion.div
      variants={fadeUp}
      layout
      className="group relative rounded-2xl overflow-hidden border border-white/10 bg-white/[0.03] hover:border-white/20 transition-colors duration-300"
    >
      {/* Cover image */}
      <div className="relative h-56 overflow-hidden">
        <Image
          src={project.coverImage}
          alt={project.title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {/* Category badge */}
        <div className="absolute top-4 left-4 z-10">
          <span className="px-3 py-1 rounded-full bg-black/40 backdrop-blur-sm border border-white/20 text-white text-xs font-semibold">
            {project.category}
          </span>
        </div>

        {/* Hover overlay */}
        <div className="absolute inset-0 bg-dark/80 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col items-center justify-center gap-4 px-6 text-center z-10">
          <p className="text-white/85 text-sm leading-relaxed">{project.shortDesc}</p>
          <Link
            href={`/portfolio/${project.slug}`}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-white/25 bg-white/10 backdrop-blur-sm text-white text-sm font-semibold hover:bg-white/20 transition-colors"
          >
            <ExternalLink size={14} />
            View Project
          </Link>
        </div>
      </div>

      {/* Card body */}
      <div className="p-6">
        <Link href={`/portfolio/${project.slug}`} className="group/title">
          <h3 className="font-display text-lg font-bold mb-3 group-hover/title:text-primary transition-colors duration-200">
            {project.title}
          </h3>
        </Link>
        <div className="flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="px-2.5 py-1 rounded-full bg-white/[0.05] border border-white/10 text-xs text-white/50 font-medium"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
