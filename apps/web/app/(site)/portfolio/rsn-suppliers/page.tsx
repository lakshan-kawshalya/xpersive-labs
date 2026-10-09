import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ClipboardCheck, History, Search, ShieldCheck, type LucideIcon } from "lucide-react";

export const metadata: Metadata = {
  title: "RSN Suppliers — Business Management & Supply Operations System",
  description:
    "A cloud-based operations system built by Xpersive Labs for a Sri Lanka B2B industrial supplier — replacing paper-based workflows with alias search, per-client pricing, and PO-to-invoice tracking.",
  alternates: { canonical: "https://www.xpersivelabs.com/portfolio/rsn-suppliers" },
  openGraph: { url: "https://www.xpersivelabs.com/portfolio/rsn-suppliers" },
};

const stats = [
  { value: "~20", label: "Factory clients" },
  { value: "∞", label: "Aliases per item" },
  { value: "2024", label: "Invoice gap closed" },
];

interface Feature {
  icon: LucideIcon;
  title: string;
  body: string;
  note?: string;
}

const features: Feature[] = [
  {
    icon: Search,
    title: "One item. Every name it goes by.",
    body: "Every catalog item can carry unlimited aliases — supplier part numbers, customer phrasing, common misspellings, garbled WhatsApp descriptions. Staff type whatever they heard and the system finds the right item. When a new name comes up, they add it with one tap. Built on PostgreSQL pg_trgm full-text search, not an external API.",
    note: "PostgreSQL pg_trgm · Full-text search",
  },
  {
    icon: History,
    title: "What did we charge them last time?",
    body: "Every quote and invoice is logged against the client it was issued to. Before sending a new quote, staff see the last price in one lookup — no digging through paper, no calling the owner. Supplier cost is tracked separately and flags when a quote is about to go out below current cost.",
  },
  {
    icon: ClipboardCheck,
    title: "No invoice left behind.",
    body: "Every purchase order has a matching status. A standing view shows every PO that has not yet been matched to a supplier invoice — the exact gap that caused the 2024 incident. The owner sees it every time they open the system, not six months later when a client calls.",
  },
  {
    icon: ShieldCheck,
    title: "Cost price never reaches a client document.",
    body: "Supplier costs, supplier identities, and internal margins are structurally separated from anything client-facing. Invoices show RSN's item name alongside each factory's own part number — because each factory matches paperwork against its own PO system, and that detail matters to their accounts team.",
  },
];

const tech = ["Next.js", "TypeScript", "PostgreSQL", "Prisma", "Docker", "Auth.js", "Tailwind CSS", "Resend"];

function ClientProjectBadge() {
  return (
    <span
      className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider"
      style={{
        background: "rgba(109,113,249,0.15)",
        border: "1px solid rgba(109,113,249,0.3)",
        color: "#6D71F9",
      }}
    >
      Client Project
    </span>
  );
}

function StatusPill({ label }: { label: string }) {
  return (
    <span
      className="px-3 py-1 rounded-full text-[11px] font-semibold"
      style={{
        background: "rgba(255,193,7,0.12)",
        border: "1px solid rgba(255,193,7,0.3)",
        color: "#F59E0B",
      }}
    >
      ● {label}
    </span>
  );
}

export default function RsnSuppliersCaseStudyPage() {
  return (
    <div className="text-text-primary">
      {/* ── Hero ─────────────────────────────────────────────────── */}
      <section className="relative pt-36 pb-16 overflow-hidden">
        <div
          aria-hidden="true"
          className="absolute -top-32 -right-24 w-120 h-120 rounded-full blur-[130px] pointer-events-none"
          style={{ background: "radial-gradient(circle, rgba(109,113,249,0.14) 0%, transparent 70%)" }}
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
            <ClientProjectBadge />
            <StatusPill label="In Development" />
            <span className="text-text-muted text-xs font-medium">Systems · Web Development</span>
          </div>

          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-5 text-text-primary">
            RSN Suppliers — Business Management &amp; Supply Operations System
          </h1>
          <p className="text-text-muted text-sm font-medium mb-10">
            Client Project · Next.js · PostgreSQL · Prisma · Docker
          </p>

          <dl className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="rounded-2xl p-6 border border-border-subtle backdrop-blur-md"
                style={{ background: "rgba(255,255,255,0.7)", boxShadow: "0 2px 16px rgba(109,113,249,0.06)" }}
              >
                <dd className="font-display text-4xl font-bold text-gradient mb-1">{stat.value}</dd>
                <dt className="text-[11px] font-bold uppercase tracking-[0.14em] text-text-muted">
                  {stat.label}
                </dt>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* ── The problem ──────────────────────────────────────────── */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-6">
          <span className="inline-block text-primary text-xs font-bold uppercase tracking-[0.2em] mb-4">
            The Challenge
          </span>
          <h2 className="font-display text-3xl sm:text-4xl font-bold mb-6">
            Three names for the same item. None of them in the system.
          </h2>
          <div className="space-y-5 text-text-secondary text-lg leading-relaxed">
            <p>
              RSN Suppliers runs on relationships — 20 garment factories, each with their own way of
              describing the same part. A soleplate might be called by RSN&apos;s catalog name, a supplier
              part number, or whatever a factory floor worker wrote on a WhatsApp message.
            </p>
            <p>
              Staff were searching for items that existed in their own stock and coming up empty. Pricing
              was negotiated per client and lived in memory. Supplier costs drifted silently — RSN had
              already quoted below their own current cost without realising it. And purchase orders were
              going unmatched to invoices for months: 21 invoices from 2024 surfaced only when a
              client&apos;s accounts team called asking where their invoice was.
            </p>
          </div>
        </div>
      </section>

      {/* ── The solution ─────────────────────────────────────────── */}
      <section className="py-8">
        <div className="max-w-4xl mx-auto px-6 space-y-6">
          <span className="inline-block text-primary text-xs font-bold uppercase tracking-[0.2em]">
            The Solution
          </span>
          {features.map(({ icon: Icon, title, body, note }) => (
            <article
              key={title}
              className="rounded-2xl p-8 border border-border-subtle flex flex-col sm:flex-row gap-6"
              style={{ background: "var(--surface-card)" }}
            >
              <div
                className="shrink-0 w-12 h-12 rounded-xl flex items-center justify-center"
                style={{ background: "rgba(109,113,249,0.1)" }}
              >
                <Icon size={22} className="text-primary" aria-hidden="true" />
              </div>
              <div>
                <h3 className="font-display text-xl font-bold mb-3">{title}</h3>
                <p className="text-text-secondary leading-[1.8]">{body}</p>
                {note && (
                  <p
                    className="inline-block mt-4 px-3 py-1 rounded-full font-mono text-xs text-primary"
                    style={{ background: "rgba(109,113,249,0.08)", border: "1px solid rgba(109,113,249,0.2)" }}
                  >
                    {note}
                  </p>
                )}
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* ── Tech stack ───────────────────────────────────────────── */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-6">
          <span className="inline-block text-primary text-xs font-bold uppercase tracking-[0.2em] mb-4">
            How It&apos;s Built
          </span>
          <h2 className="font-display text-3xl sm:text-4xl font-bold mb-4">
            Self-hosted. No third-party database fees.
          </h2>
          <p className="text-text-secondary text-lg leading-relaxed mb-8">
            Deployed on a VPS with Docker Compose — RSN owns their data and their infrastructure costs are
            fixed.
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

      {/* ── Build status ─────────────────────────────────────────── */}
      <section className="pb-24">
        <div className="max-w-4xl mx-auto px-6">
          <div
            className="text-center p-8 sm:p-12"
            style={{
              background: "rgba(245,158,11,0.06)",
              border: "1px solid rgba(245,158,11,0.2)",
              borderRadius: 24,
            }}
          >
            <div className="mb-5">
              <StatusPill label="Active Build" />
            </div>
            <h2 className="font-display text-3xl sm:text-4xl font-bold mb-4">Currently in Milestone 1.</h2>
            <p className="text-text-secondary text-lg leading-relaxed max-w-xl mx-auto">
              Core loop — alias search, sale recording, last-price lookup, and basic invoicing — is in
              production build now. The full MVP (complete CRUD, PO tracking, accounts receivable, email
              delivery, and role-based access) follows in the next milestone.
            </p>
            <p className="text-text-secondary text-sm mt-8">
              Building something similar?{" "}
              <a href="mailto:hello@xpersivelabs.com" className="text-primary font-semibold hover:underline">
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
            href="/portfolio/velora"
            className="group inline-flex items-center gap-2 text-sm text-text-muted hover:text-text-primary transition-colors"
          >
            <ArrowLeft size={15} className="group-hover:-translate-x-1 transition-transform duration-200" aria-hidden="true" />
            <span>
              <span className="block text-xs uppercase tracking-widest mb-0.5">Previous</span>
              Velora
            </span>
          </Link>
          <span className="text-sm text-text-muted sm:text-right">
            <span className="block text-xs uppercase tracking-widest mb-0.5">Next</span>
            More coming soon
          </span>
        </div>
      </section>
    </div>
  );
}
