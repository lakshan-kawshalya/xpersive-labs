"use client";

import { fadeUp, staggerContainer } from "@/lib/animations";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const projects = [
  {
    slug: "xpersive-labs-website",
    title: "Xpersive Labs Website",
    category: "Web",
    description:
      "Our own company website - a fully animated multi-page Next.js 14 site with scroll-reveal effects, Keystatic CMS blog, contact form, and Vercel deployment.",
    tags: ["Next.js 14", "TypeScript", "Tailwind CSS", "Framer Motion"],
    coverImage: "/project-covers/xpersive-labs-project-cover.jpeg",
    accentColor: "#6D71F9",
    /* TODO: add liveUrl when xpersivelabs.com domain is live */
  },
  {
    slug: "alibaba-scraper",
    title: "Alibaba Product Scraper",
    category: "Automation",
    description:
      "Automated scraper that extracts product listings, pricing, and supplier data from Alibaba at scale. Exports structured data to both CSV and JSON formats for market research and analysis.",
    tags: ["Python", "Web Scraping", "CSV", "JSON", "Automation"],
    coverImage: "/project-covers/alibaba-scraper-cover.jpeg",
    accentColor: "#6D71F9",
  },
];

export default function PortfolioSection() {
  return (
    <section className="py-28 relative overflow-hidden">
      <div className="absolute inset-0 bg-dark" />

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

        {/* Project cards - 2 col */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {projects.map((project) => (
            <motion.div
              key={project.slug}
              variants={fadeUp}
              whileHover={{ y: -8, scale: 1.02 }}
              transition={{ type: "spring", stiffness: 280, damping: 20 }}
              className="group relative rounded-2xl overflow-hidden border border-white/10 bg-white/[0.03] hover:border-white/20 transition-colors duration-300"
            >
              {/* Cover image */}
              <div className="relative h-52 overflow-hidden">
                <Image
                  src={project.coverImage}
                  alt={project.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute top-4 left-4 z-10">
                  <span className="px-3 py-1 rounded-full bg-black/40 backdrop-blur-sm border border-white/20 text-white text-xs font-semibold">
                    {project.category}
                  </span>
                </div>
                <div className="absolute inset-0 bg-dark/75 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center z-10">
                  <Link
                    href={`/portfolio/${project.slug}`}
                    className="flex items-center gap-2.5 text-white font-semibold text-sm border border-white/20 px-5 py-2.5 rounded-full bg-white/10 backdrop-blur-sm"
                  >
                    View Project
                  </Link>
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
