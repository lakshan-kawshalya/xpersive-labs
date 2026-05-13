import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, Calendar, Tag } from "lucide-react";

/* ─── Types ─────────────────────────────────────────────────────────── */

interface ProjectDetail {
  slug: string;
  title: string;
  category: string;
  tags: string[];
  year: string;
  gradient: string;
  summary: string;
  highlight: string;
  challenge: string;
  solution: string;
  result: string;
  tech: string[];
  status: string;
  privateBadge?: boolean;
}

/* ─── Data ──────────────────────────────────────────────────────────── */

const projects: ProjectDetail[] = [
  {
    slug: "xpersive-labs-website",
    title: "Xpersive Labs Website",
    category: "Web",
    tags: ["Next.js 14", "TypeScript", "Tailwind CSS", "Framer Motion", "Keystatic", "Vercel"],
    year: "2025",
    gradient: "from-[#6D71F9] to-[#54C1FB]",
    status: "Live",
    highlight: "Built with performance, SEO, and immersion in mind.",
    summary:
      "Our own company website built from the ground up - a fully animated, multi-page Next.js 14 site with immersive scroll effects, a visual CMS for blog management, and production deployment on Vercel.",
    challenge:
      "We needed a website that would represent Xpersive Labs accurately - immersive, fast, and polished - while being maintainable without touching code for every blog update. Most templates didn't come close to the standard we wanted to hold ourselves to.",
    solution:
      "Built entirely in Next.js 14 with the App Router, using Framer Motion for scroll-triggered animations and Keystatic as a Git-based CMS so blog posts can be written and published without a developer. Tailwind CSS powers the design system with a custom colour palette. Deployed to Vercel with automatic preview builds on every push.",
    result:
      "A production website that reflects the quality of our work - fast, animated, and fully managed through a visual CMS. Lighthouse performance score above 90. Serves as the primary client-facing presence for Xpersive Labs.",
    tech: ["Next.js 14", "TypeScript", "Tailwind CSS", "Framer Motion", "Keystatic", "Markdoc", "Vercel"],
    /* TODO: set liveUrl when xpersivelabs.com domain is purchased */
  },
  {
    slug: "alibaba-scraper",
    title: "Alibaba Product Scraper",
    category: "Automation",
    tags: ["Python", "Web Scraping", "BeautifulSoup", "Selenium", "CSV", "JSON", "Data Extraction"],
    year: "2024",
    gradient: "from-[#272848] to-[#6D71F9]",
    status: "Completed",
    highlight: "Handles bulk extraction with structured multi-format output.",
    privateBadge: true,
    summary:
      "An automated web scraping tool that extracts product listings, pricing data, and supplier contact information from Alibaba at scale. Designed for market research and competitive intelligence - outputs clean, structured data in both CSV and JSON formats.",
    challenge:
      "Manual product research on Alibaba is slow, inconsistent, and impossible to scale. Hundreds of listings across dozens of categories needed to be collected, structured, and compared - without spending days doing it by hand.",
    solution:
      "Built a Python scraper using Selenium for JavaScript-rendered pages and BeautifulSoup for HTML parsing. Handles pagination, category traversal, and rate limiting automatically. Data is cleaned, deduplicated, and exported to both CSV (for spreadsheet analysis) and JSON (for programmatic use). Designed to run on a schedule or on-demand.",
    result:
      "Reduced product research time from days to minutes. Outputs structured, analysis-ready data across thousands of listings per run. Private repository under the Xpersive Labs GitHub organisation.",
    tech: ["Python", "Selenium", "BeautifulSoup", "Pandas", "CSV", "JSON"],
  },
];

/* ─── Helpers ────────────────────────────────────────────────────────── */

function getProject(slug: string): ProjectDetail | undefined {
  return projects.find((p) => p.slug === slug);
}

/* ─── Static params (SSG) ────────────────────────────────────────────── */

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

/* ─── Page ──────────────────────────────────────────────────────────── */

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProject(slug);

  if (!project) notFound();

  const allSlugs = projects.map((p) => p.slug);
  const currentIndex = allSlugs.indexOf(slug);
  const nextSlug = allSlugs[currentIndex + 1] ?? null;
  const prevSlug = allSlugs[currentIndex - 1] ?? null;
  const nextProject = nextSlug ? getProject(nextSlug) : null;

  return (
    <div className="bg-dark text-white">
      {/* ── Hero image area ──────────────────────────────────────── */}
      <section className="relative pt-24 overflow-hidden">
        <div
          className={`w-full h-[55vh] min-h-[380px] max-h-[600px] bg-gradient-to-br ${project.gradient} relative overflow-hidden`}
        >
          <div
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,0.3) 1px, transparent 1px), linear-gradient(to right, rgba(255,255,255,0.3) 1px, transparent 1px)",
              backgroundSize: "32px 32px",
            }}
          />
          <div
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage:
                "radial-gradient(circle at 30% 70%, rgba(255,255,255,0.3) 0%, transparent 50%), radial-gradient(circle at 70% 20%, rgba(255,255,255,0.2) 0%, transparent 45%)",
            }}
          />
          <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-dark to-transparent" />
        </div>
      </section>

      {/* ── Content ──────────────────────────────────────────────── */}
      <section className="relative z-10 -mt-16 pb-24">
        <div className="max-w-4xl mx-auto px-6">
          <Link
            href="/portfolio"
            className="inline-flex items-center gap-2 text-sm text-white/40 hover:text-white/80 transition-colors mb-10"
          >
            <ArrowLeft size={15} />
            Back to Portfolio
          </Link>

          {/* Title + meta */}
          <div className="mb-12">
            <div className="flex flex-wrap items-center gap-3 mb-5">
              <span className="px-3 py-1 rounded-full bg-primary/15 border border-primary/20 text-primary text-xs font-bold uppercase tracking-wider">
                {project.category}
              </span>
              <span className="flex items-center gap-1.5 text-white/35 text-xs font-medium">
                <Calendar size={12} />
                {project.year}
              </span>
              <span className="px-3 py-1 rounded-full bg-white/[0.05] border border-white/10 text-white/40 text-xs font-medium">
                {project.status}
              </span>
              {project.privateBadge && (
                <span className="px-3 py-1 rounded-full bg-white/[0.05] border border-white/10 text-white/40 text-xs font-medium">
                  Private Repository
                </span>
              )}
            </div>

            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-5">
              {project.title}
            </h1>

            <p className="text-accent text-sm font-semibold mb-5 italic">
              {project.highlight}
            </p>

            <p className="text-white/60 text-lg leading-relaxed mb-7">
              {project.summary}
            </p>

            <div className="flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/[0.05] border border-white/10 text-xs text-white/55 font-medium"
                >
                  <Tag size={10} />
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <div className="border-t border-white/[0.07] mb-12" />

          {/* Challenge / Solution / Result */}
          <div className="space-y-12">
            <CaseBlock
              number="01"
              label="The Challenge"
              color="text-rose-400"
              bg="bg-rose-500/10"
              body={project.challenge}
            />
            <CaseBlock
              number="02"
              label="Our Solution"
              color="text-primary"
              bg="bg-primary/10"
              body={project.solution}
            />
            <CaseBlock
              number="03"
              label="The Result"
              color="text-accent"
              bg="bg-accent/10"
              body={project.result}
            />
          </div>

          <div className="border-t border-white/[0.07] my-12" />

          {/* Tech stack */}
          <div>
            <p className="text-xs text-white/30 uppercase tracking-widest font-semibold mb-5">
              Tech Stack
            </p>
            <div className="flex flex-wrap gap-2.5">
              {project.tech.map((t) => (
                <span
                  key={t}
                  className="px-4 py-2 rounded-xl bg-white/[0.04] border border-white/10 text-sm text-white/70 font-medium hover:border-primary/30 hover:text-white transition-colors duration-200"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Next project + CTA ───────────────────────────────────── */}
      <section className="border-t border-white/[0.07] py-16">
        <div className="max-w-4xl mx-auto px-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-8">
            <div>
              {prevSlug && getProject(prevSlug) && (
                <Link
                  href={`/portfolio/${prevSlug}`}
                  className="group inline-flex items-center gap-2 text-sm text-white/40 hover:text-white transition-colors"
                >
                  <ArrowLeft size={15} className="group-hover:-translate-x-1 transition-transform duration-200" />
                  <span>
                    <span className="block text-xs text-white/25 uppercase tracking-widest mb-0.5">Previous</span>
                    {getProject(prevSlug)!.title}
                  </span>
                </Link>
              )}
            </div>

            <Link
              href="/contact"
              className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full font-bold text-white text-sm transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-primary/25"
              style={{ background: "linear-gradient(135deg, #6D71F9, #54C1FB)" }}
            >
              Start Your Project
              <ArrowRight size={15} />
            </Link>

            <div className="text-right">
              {nextProject && (
                <Link
                  href={`/portfolio/${nextSlug}`}
                  className="group inline-flex items-center gap-2 text-sm text-white/40 hover:text-white transition-colors"
                >
                  <span>
                    <span className="block text-xs text-white/25 uppercase tracking-widest mb-0.5">Next</span>
                    {nextProject.title}
                  </span>
                  <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform duration-200" />
                </Link>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

/* ─── CaseBlock ──────────────────────────────────────────────────────── */

function CaseBlock({
  number,
  label,
  color,
  bg,
  body,
}: {
  number: string;
  label: string;
  color: string;
  bg: string;
  body: string;
}) {
  return (
    <div className="flex gap-6">
      <div className="flex-shrink-0">
        <div className={`w-10 h-10 rounded-xl ${bg} flex items-center justify-center`}>
          <span className={`font-display text-xs font-bold ${color}`}>{number}</span>
        </div>
      </div>
      <div className="flex-1 pt-1.5">
        <p className={`text-xs font-bold uppercase tracking-[0.2em] ${color} mb-3`}>{label}</p>
        <p className="text-white/60 leading-[1.85] text-base">{body}</p>
      </div>
    </div>
  );
}
