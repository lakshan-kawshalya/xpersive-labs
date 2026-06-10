import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, Calendar, Tag } from "lucide-react";
import type { Metadata } from "next";

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
    slug: "alibaba-scraper",
    title: "Alibaba Supplier Intelligence Tool",
    category: "Automation",
    tags: ["Python", "Playwright", "curl_cffi", "Parsel", "BeautifulSoup", "DataImpulse Residential Proxies", "CapSolver"],
    year: "May 2026",
    gradient: "from-[#272848] to-[#6D71F9]",
    status: "Live",
    highlight: "Production-ready since May 2026. Replaces 8-10 hours of manual research per week.",
    privateBadge: true,
    summary:
      "A production-ready Alibaba supplier intelligence tool with 4 core modes: store monitoring, new launch detection, keyword search, and product deep-dives. Built with Playwright, curl_cffi, Parsel, BeautifulSoup, DataImpulse Residential Proxies, and CapSolver. Extracts 20+ structured data fields per product and processes 60+ products per monitoring session.",
    challenge:
      "FBA sellers and importers were spending 8-10 hours per week manually researching Alibaba: checking supplier stores for new launches, monitoring competitor pricing, and building product shortlists by hand. There was no single tool that combined all these workflows into a production-reliable system.",
    solution:
      "Built a Python-based Alibaba intelligence tool with four distinct operating modes: store monitoring (tracks a supplier store for new products), new launch detection (finds newly listed products by keyword), keyword search (structured extraction across search results), and product deep-dive (pulls all available data for a specific listing). The anti-detection layer uses curl_cffi for TLS fingerprint evasion, DataImpulse residential proxies for IP rotation, and CapSolver for CAPTCHA handling. Parsel and BeautifulSoup handle HTML extraction. Output covers 20+ structured fields per product including pricing, MOQ, supplier details, ratings, and shipping data. Version 1.3.0 went live in May 2026.",
    result:
      "Replaced 8-10 hours of manual weekly research with a single scheduled run. Each session processes 60+ products and outputs clean, analysis-ready data in CSV and JSON. Running in production since May 2026 under the Xpersive Labs GitHub organisation.",
    tech: ["Python", "Playwright", "curl_cffi", "Parsel", "BeautifulSoup", "DataImpulse Residential Proxies", "CapSolver", "CSV", "JSON"],
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

/* ─── Metadata ────────────────────────────────────────────────────────── */

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};
  return {
    title: project.title,
    description: project.summary,
    alternates: { canonical: `https://www.xpersivelabs.com/portfolio/${slug}` },
    openGraph: {
      title: project.title,
      description: project.summary,
      url: `https://www.xpersivelabs.com/portfolio/${slug}`,
    },
  };
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
