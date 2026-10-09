import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  Bot,
  ExternalLink,
  Ruler,
  ShoppingBag,
  type LucideIcon,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Velora — Multi-Brand Fashion Commerce Platform",
  description:
    "An in-house fashion commerce platform built by Xpersive Labs to demonstrate multi-brand e-commerce, AI size advisory, and admin management capabilities to fashion and apparel clients.",
  alternates: { canonical: "https://www.xpersivelabs.com/portfolio/velora" },
  openGraph: { url: "https://www.xpersivelabs.com/portfolio/velora" },
};

const DEMO_URL = "https://velora.xpersivelabs.com";

const stats = [
  { value: "5", label: "In-house brands" },
  { value: "28", label: "Catalog pieces" },
  { value: "2", label: "AI features" },
];

interface Feature {
  icon: LucideIcon;
  title: string;
  body: string;
  chips: string[];
  screenshot?: { src: string; alt: string; width: number; height: number };
}

const features: Feature[] = [
  {
    icon: ShoppingBag,
    title: "Five brands. One platform.",
    body: "Velora runs five in-house clothing brands across different age groups and styles from a single Next.js application. Each brand has its own storefront, product catalog, and visual identity — all managed through a shared admin backend.",
    chips: ["5 brands", "28 catalog pieces", "Full cart and checkout"],
    screenshot: {
      src: "/project-covers/velora-storefront.jpeg",
      alt: "Velora storefront home page with a hero carousel of fashion looks across the five brands",
      width: 1200,
      height: 667,
    },
  },
  {
    icon: Ruler,
    title: "AI-powered size recommendations.",
    body: "A built-in AI size advisor helps shoppers find the right fit based on their measurements. Powered by Gemini, it reduces returns and increases purchase confidence — two of the biggest friction points in online fashion retail.",
    chips: ["Powered by Gemini"],
  },
  {
    icon: Bot,
    title: "An assistant that quotes and captures.",
    body: "The AI shopping assistant answers product questions in real time, quotes pricing packages based on the visitor's needs, and captures leads directly in the conversation. It turns a passive browse into an active sales interaction.",
    chips: ["Powered by Gemini"],
    screenshot: {
      src: "/project-covers/velora-assistant.jpeg",
      alt: "Velora storefront with the Xela AI assistant panel open, offering a tour, questions, and a build-a-package pricing flow",
      width: 1200,
      height: 750,
    },
  },
];

const tech = [
  "Next.js",
  "TypeScript",
  "Supabase",
  "Tailwind CSS",
  "Gemini",
  "Framer Motion",
];

export default function VeloraCaseStudyPage() {
  return (
    <div className="text-text-primary">
      {/* ── Hero ─────────────────────────────────────────────────── */}
      <section className="relative pt-36 pb-16 overflow-hidden">
        <div
          aria-hidden="true"
          className="absolute -top-32 -right-24 w-120 h-120 rounded-full blur-[130px] pointer-events-none"
          style={{
            background:
              "radial-gradient(circle, rgba(84,193,251,0.14) 0%, transparent 70%)",
          }}
        />
        <div className="relative z-10 max-w-4xl mx-auto px-6">
          <Link
            href="/portfolio"
            className="inline-flex items-center gap-2 text-sm text-text-muted hover:text-text-primary transition-colors mb-10"
          >
            <ArrowLeft size={15} aria-hidden="true" />
            Back to Portfolio
          </Link>

          <div className="flex flex-wrap items-center gap-3 mb-5">
            <span
              className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider"
              style={{
                background: "rgba(84,193,251,0.12)",
                border: "1px solid rgba(84,193,251,0.3)",
                color: "#54C1FB",
              }}
            >
              Studio Project
            </span>
            <span className="text-text-muted text-xs font-medium">
              Web Development · AI/ML
            </span>
          </div>

          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-5 text-text-primary">
            Velora — Multi-Brand Fashion Commerce Platform
          </h1>
          <p className="text-text-muted text-sm font-medium mb-10">
            In-House Build · Next.js · Supabase · Gemini
          </p>

          <dl className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="rounded-2xl p-6 border border-border-subtle backdrop-blur-md"
                style={{
                  background: "rgba(255,255,255,0.7)",
                  boxShadow: "0 2px 16px rgba(109,113,249,0.06)",
                }}
              >
                <dd className="font-display text-4xl font-bold text-gradient mb-1">
                  {stat.value}
                </dd>
                <dt className="text-[11px] font-bold uppercase tracking-[0.14em] text-text-muted">
                  {stat.label}
                </dt>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* ── Purpose ──────────────────────────────────────────────── */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-6">
          <span className="inline-block text-primary text-xs font-bold uppercase tracking-[0.2em] mb-4">
            The Purpose
          </span>
          <h2 className="font-display text-3xl sm:text-4xl font-bold mb-6">
            Show, don&apos;t tell.
          </h2>
          <div className="space-y-5 text-text-secondary text-lg leading-relaxed">
            <p>
              Fashion and apparel clients often struggle to visualise what a
              modern e-commerce platform looks like until they see one. Velora
              is our answer to that problem.
            </p>
            <p>
              We built a fully working multi-brand storefront — not a mockup,
              not a prototype — to demonstrate exactly the kind of platform we
              can build for clients in the fashion industry. Every feature on
              Velora is something we can replicate, customise, and deploy for a
              real clothing brand.
            </p>
          </div>
        </div>
      </section>

      {/* ── Features ─────────────────────────────────────────────── */}
      <section className="py-8">
        <div className="max-w-4xl mx-auto px-6 space-y-6">
          <span className="inline-block text-primary text-xs font-bold uppercase tracking-[0.2em]">
            What It Does
          </span>
          {features.map(({ icon: Icon, title, body, chips, screenshot }) => (
            <article
              key={title}
              className="rounded-2xl p-8 border border-border-subtle"
              style={{ background: "var(--surface-card)" }}
            >
              <div className="flex flex-col sm:flex-row gap-6">
                <div
                  className="shrink-0 w-12 h-12 rounded-xl flex items-center justify-center"
                  style={{ background: "rgba(109,113,249,0.1)" }}
                >
                  <Icon size={22} className="text-primary" aria-hidden="true" />
                </div>
                <div>
                  <h3 className="font-display text-xl font-bold mb-3">
                    {title}
                  </h3>
                  <p className="text-text-secondary leading-[1.8] mb-4">
                    {body}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {chips.map((chip) => (
                      <span
                        key={chip}
                        className="px-3 py-1 rounded-full text-xs font-semibold text-primary"
                        style={{
                          background: "rgba(109,113,249,0.08)",
                          border: "1px solid rgba(109,113,249,0.2)",
                        }}
                      >
                        {chip}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              {screenshot && (
                <Image
                  src={screenshot.src}
                  alt={screenshot.alt}
                  width={screenshot.width}
                  height={screenshot.height}
                  sizes="(max-width: 896px) 100vw, 832px"
                  className="mt-8 w-full h-auto rounded-xl border border-border-subtle"
                />
              )}
            </article>
          ))}
        </div>
      </section>

      {/* ── Tech stack ───────────────────────────────────────────── */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-6">
          <p className="text-xs text-text-muted uppercase tracking-widest font-semibold mb-5">
            Tech Stack
          </p>
          <div className="flex flex-wrap gap-2.5">
            {tech.map((t) => (
              <span
                key={t}
                className="px-4 py-2 rounded-xl bg-bg-card border border-border-subtle text-sm text-text-secondary font-medium"
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── Demo ─────────────────────────────────────────────────── */}
      <section className="pb-24">
        <div className="max-w-4xl mx-auto px-6">
          <div
            className="text-center p-8 sm:p-12"
            style={{
              background: "rgba(109,113,249,0.06)",
              border: "1px solid rgba(109,113,249,0.15)",
              borderRadius: 24,
            }}
          >
            <h2 className="font-display text-3xl sm:text-4xl font-bold mb-4">
              See it live.
            </h2>
            <p className="text-text-secondary text-lg leading-relaxed max-w-xl mx-auto mb-3">
              Velora is live and fully functional. Explore the storefront, try
              the AI size advisor, or chat with the shopping assistant.
            </p>
            <p className="text-text-muted text-xs mb-8">
              Hosted on Render&apos;s free tier — may take 20-30 seconds to wake
              up on first load.
            </p>
            <a
              href={DEMO_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 px-8 py-4 rounded-full font-semibold text-white transition-transform duration-300 hover:scale-[1.02]"
              style={{
                background: "linear-gradient(135deg, #6D71F9, #54C1FB)",
                boxShadow: "0 8px 24px rgba(109,113,249,0.3)",
              }}
            >
              Open Velora Demo →
              <ExternalLink size={15} aria-hidden="true" />
            </a>
            <p className="text-text-secondary text-sm mt-8">
              Interested in a similar build for your brand?{" "}
              <a
                href="mailto:hello@xpersivelabs.com"
                className="text-primary font-semibold hover:underline"
              >
                hello@xpersivelabs.com
              </a>
            </p>
          </div>
        </div>
      </section>

      {/* ── Bottom navigation ────────────────────────────────────── */}
      <section className="border-t border-border-subtle py-16">
        <div className="max-w-4xl mx-auto px-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-8">
          <Link
            href="/portfolio/alibaba-scraper"
            className="group inline-flex items-center gap-2 text-sm text-text-muted hover:text-text-primary transition-colors"
          >
            <ArrowLeft
              size={15}
              className="group-hover:-translate-x-1 transition-transform duration-200"
              aria-hidden="true"
            />
            <span>
              <span className="block text-xs uppercase tracking-widest mb-0.5">
                Previous
              </span>
              Alibaba Supplier Intelligence
            </span>
          </Link>
          <span className="text-sm text-text-muted sm:text-right">
            <span className="block text-xs uppercase tracking-widest mb-0.5">
              Next
            </span>
            More coming soon
          </span>
        </div>
      </section>
    </div>
  );
}
