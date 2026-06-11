"use client";

import { fadeUp, staggerContainer } from "@/lib/animations";
import { useMotionSafe } from "@/hooks/useMotionSafe";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Camera,
  FileText,
  Globe,
  RefreshCw,
  Search,
  Shield,
  Store,
  Zap,
} from "lucide-react";
import Link from "next/link";

/* ─── Small reusable pieces ──────────────────────────────────────────── */

function SectionLabel({ text }: { text: string }) {
  return (
    <span
      className="inline-block text-xs font-bold uppercase tracking-[0.2em] mb-4"
      style={{ color: "#6D71F9" }}
    >
      {text}
    </span>
  );
}

function StatCard({ value, label }: { value: string; label: string }) {
  return (
    <div
      className="flex flex-col items-center text-center p-6 rounded-2xl"
      style={{
        background: "rgba(255,255,255,0.03)",
        border: "1px solid rgba(255,255,255,0.08)",
        borderRadius: 16,
      }}
    >
      <span
        className="font-display font-extrabold mb-2"
        style={{
          fontSize: 36,
          background: "linear-gradient(135deg, #6D71F9, #54C1FB)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
        }}
      >
        {value}
      </span>
      <span
        className="uppercase tracking-[0.1em] font-medium"
        style={{ fontSize: 13, color: "rgba(255,255,255,0.45)" }}
      >
        {label}
      </span>
    </div>
  );
}

function FieldBadge({ name }: { name: string }) {
  return (
    <span
      className="px-2.5 py-1 rounded-full font-mono"
      style={{
        fontSize: 11,
        background: "rgba(109,113,249,0.08)",
        border: "1px solid rgba(109,113,249,0.2)",
        color: "rgba(255,255,255,0.6)",
      }}
    >
      {name}
    </span>
  );
}

function TechBadge({ name }: { name: string }) {
  return (
    <span
      className="px-4 py-2 rounded-full font-mono text-sm font-medium"
      style={{
        background: "rgba(109,113,249,0.08)",
        border: "1px solid rgba(109,113,249,0.2)",
        color: "rgba(255,255,255,0.75)",
      }}
    >
      {name}
    </span>
  );
}

/* ─── Function card (01-04) ──────────────────────────────────────────── */

interface FunctionCardProps {
  num: string;
  icon: React.ReactNode;
  title: string;
  body: string;
  fields: string[];
  tag: string;
  tagAccent?: boolean;
  accentStat?: string;
  shouldAnimate: boolean;
}

function FunctionCard({
  num,
  icon,
  title,
  body,
  fields,
  tag,
  tagAccent,
  accentStat,
  shouldAnimate,
}: FunctionCardProps) {
  return (
    <motion.div
      {...(shouldAnimate ? { variants: fadeUp } : { initial: false })}
      className="relative rounded-[20px] p-8 overflow-hidden"
      style={{
        background: "rgba(255,255,255,0.02)",
        border: "1px solid rgba(255,255,255,0.06)",
      }}
      {...(shouldAnimate
        ? {
            whileHover: {
              borderColor: "rgba(109,113,249,0.25)",
              y: -4,
              transition: { duration: 0.2 },
            },
          }
        : {})}
    >
      <span
        className="absolute top-4 right-6 font-display font-extrabold select-none pointer-events-none"
        style={{ fontSize: 80, color: "rgba(109,113,249,0.06)", lineHeight: 1 }}
      >
        {num}
      </span>

      <div className="relative z-10">
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center mb-4"
          style={{
            background: "rgba(109,113,249,0.12)",
            border: "1px solid rgba(109,113,249,0.25)",
          }}
        >
          {icon}
        </div>

        <h3 className="font-display font-bold text-white text-xl mb-3">
          {title}
        </h3>

        {accentStat && (
          <div
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold mb-3"
            style={{
              background: "rgba(109,113,249,0.15)",
              border: "1px solid rgba(109,113,249,0.3)",
              color: "#6D71F9",
            }}
          >
            {accentStat}
          </div>
        )}

        <p className="text-white/55 text-sm leading-relaxed mb-5">{body}</p>

        <div className="flex flex-wrap gap-1.5 mb-4">
          {fields.map((f) => (
            <FieldBadge key={f} name={f} />
          ))}
        </div>

        <span
          className="inline-block px-3 py-1 rounded-full text-xs font-semibold"
          style={
            tagAccent
              ? {
                  background: "rgba(84,193,251,0.12)",
                  border: "1px solid rgba(84,193,251,0.3)",
                  color: "#54C1FB",
                }
              : {
                  background: "rgba(255,255,255,0.05)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  color: "rgba(255,255,255,0.5)",
                }
          }
        >
          {tag}
        </span>
      </div>
    </motion.div>
  );
}

/* ─── Function 05 card (visual search — featured) ────────────────────── */

function Function05Card({ shouldAnimate }: { shouldAnimate: boolean }) {
  return (
    <motion.div
      {...(shouldAnimate ? { variants: fadeUp } : { initial: false })}
      className="relative rounded-[20px] p-8 overflow-hidden"
      style={{
        background: "rgba(109,113,249,0.04)",
        border: "1px solid rgba(109,113,249,0.25)",
      }}
      {...(shouldAnimate
        ? { whileHover: { y: -4, transition: { duration: 0.2 } } }
        : {})}
    >
      <span
        className="absolute top-4 right-6 font-display font-extrabold select-none pointer-events-none"
        style={{ fontSize: 80, color: "rgba(109,113,249,0.06)", lineHeight: 1 }}
      >
        05
      </span>

      <div className="absolute top-6 right-20 z-20">
        <span
          className="px-2.5 py-1 rounded-full text-xs font-bold text-white"
          style={{ background: "#6D71F9" }}
        >
          New
        </span>
      </div>

      <div className="relative z-10">
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center mb-4"
          style={{
            background: "rgba(109,113,249,0.12)",
            border: "1px solid rgba(109,113,249,0.25)",
          }}
        >
          <Camera size={22} className="text-primary" />
        </div>

        <h3 className="font-display font-bold text-white text-xl mb-1">
          Visual Product Search
        </h3>
        <p className="text-xs font-medium mb-4" style={{ color: "#6D71F9" }}>
          Powered by reverse-engineered Alibaba visual search API
        </p>

        <p className="text-white/55 text-sm leading-relaxed mb-4">
          The fifth function enables product discovery through visual search
          rather than keyword queries. Instead of a text search, the function
          accepts any Alibaba CDN image URL and returns the products Alibaba
          considers visually similar - up to 1,584 results per query across 33
          pages.
        </p>
        <p className="text-white/55 text-sm leading-relaxed mb-5">
          The implementation required reverse-engineering two undocumented
          internal Alibaba endpoints. Both operate via pure curl_cffi with no
          Playwright dependency - making this the fastest and most lightweight
          function in the module.
        </p>

        <div
          className="p-4 mb-5"
          style={{
            borderLeft: "2px solid #6D71F9",
            borderRadius: "0 8px 8px 0",
            background: "rgba(109,113,249,0.04)",
          }}
        >
          <p
            className="text-sm leading-relaxed italic"
            style={{ color: "rgba(255,255,255,0.6)" }}
          >
            The key advantage: visual search bypasses keyword ambiguity
            entirely. A product image returns exact or near-exact matches
            regardless of how the supplier titled the listing.
          </p>
        </div>

        <div className="flex flex-wrap gap-1.5 mb-4">
          {[
            "product_id",
            "product_url",
            "title",
            "price",
            "currency",
            "moq",
            "company_name",
            "company_id",
            "country_code",
            "gold_supplier_years",
            "review_score",
            "review_count",
            "supplier_service",
            "shipping_score",
            "product_score",
            "images",
            "certifications",
            "is_paid",
            "selling_points",
            "page_number",
            "page_position",
          ].map((f) => (
            <FieldBadge key={f} name={f} />
          ))}
        </div>

        <span
          className="inline-block px-3 py-1 rounded-full text-xs font-semibold"
          style={{
            background: "rgba(84,193,251,0.12)",
            border: "1px solid rgba(84,193,251,0.3)",
            color: "#54C1FB",
          }}
        >
          21 fields + summary
        </span>
      </div>
    </motion.div>
  );
}

/* ─── Main page component ────────────────────────────────────────────── */

export default function AlibabaCaseStudy() {
  const { shouldAnimate } = useMotionSafe();

  const scrollProps = shouldAnimate
    ? {
        variants: staggerContainer,
        initial: "hidden" as const,
        whileInView: "visible" as const,
        viewport: { once: true, margin: "-80px" },
      }
    : { initial: false as const };

  const childProps = shouldAnimate
    ? { variants: fadeUp }
    : { initial: false as const };

  return (
    <div className="bg-dark text-white min-h-screen">
      {/* ── HERO ─────────────────────────────────────────────────── */}
      <section
        className="relative pt-32 pb-20 overflow-hidden"
        style={{
          background:
            "radial-gradient(ellipse at 50% 60%, rgba(55,58,90,0.85) 0%, #272848 70%)",
        }}
      >
        <div
          className="absolute inset-0 opacity-[0.04] pointer-events-none"
          style={{
            backgroundImage:
              "radial-gradient(circle, #6D71F9 1px, transparent 1px)",
            backgroundSize: "36px 36px",
          }}
        />
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] rounded-full blur-[120px] pointer-events-none"
          style={{ background: "rgba(109,113,249,0.14)" }}
        />

        <div className="relative z-10 max-w-5xl mx-auto px-6">
          {/* Breadcrumb */}
          <Link
            href="/portfolio"
            className="inline-flex items-center gap-1.5 mb-10 transition-colors duration-200 hover:text-white"
            style={{ color: "rgba(255,255,255,0.45)", fontSize: 14 }}
          >
            ← Back to Portfolio
          </Link>

          <motion.div {...scrollProps}>
            <motion.div {...childProps}>
              <span
                className="inline-block uppercase font-semibold mb-5"
                style={{
                  fontSize: 11,
                  color: "#6D71F9",
                  letterSpacing: "0.12em",
                }}
              >
                Case Study · Automation &amp; Web Scraping
              </span>
            </motion.div>

            <motion.h1
              {...childProps}
              className="font-display font-extrabold leading-[1.2] mb-7 text-white"
              style={{ fontSize: "clamp(28px, 5vw, 40px)" }}
            >
              How We Replaced Hours of Manual Alibaba Research With a Fully
              Automated Supplier Intelligence System
            </motion.h1>

            <motion.div
              {...childProps}
              className="flex flex-wrap items-center gap-x-3 gap-y-2 mb-12"
              style={{ color: "rgba(255,255,255,0.45)", fontSize: 14 }}
            >
              {[
                "Australian Importer",
                "E-Commerce Automation",
                "Live in Production",
                "May 2026",
              ].map((item, i, arr) => (
                <span key={item} className="flex items-center gap-3">
                  {item}
                  {i < arr.length - 1 && (
                    <span style={{ color: "rgba(255,255,255,0.2)" }}>·</span>
                  )}
                </span>
              ))}
            </motion.div>

            <motion.div
              {...childProps}
              className="grid grid-cols-2 md:grid-cols-4 gap-4"
            >
              <StatCard value="8–10 hrs/wk" label="Manual research replaced" />
              <StatCard value="60+" label="Products captured per run" />
              <StatCard value="47" label="Unique data fields" />
              <StatCard value="5" label="Automated functions" />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── PROBLEM ──────────────────────────────────────────────── */}
      <section className="py-20">
        <div className="max-w-5xl mx-auto px-6">
          <motion.div {...scrollProps}>
            <motion.div {...childProps}>
              <SectionLabel text="The Problem" />
            </motion.div>

            <motion.h2
              {...childProps}
              className="font-display font-bold text-white mb-8"
              style={{ fontSize: "clamp(24px, 4vw, 32px)" }}
            >
              Hours wasted. Opportunities missed. Every week.
            </motion.h2>

            <motion.div
              {...childProps}
              className="space-y-5 text-white/60 leading-[1.8] text-base mb-8"
            >
              <p>
                Most importers are still doing product research the same way
                they did ten years ago — manually, slowly, and reactively.
              </p>
              <p>
                Our client is an Australian business importing and reselling
                products sourced from Chinese suppliers on Alibaba. Their
                sourcing workflow was entirely manual. Team members visited
                individual supplier storefronts one by one, copied product
                names, prices, and MOQs into spreadsheets by hand, and
                periodically checked Alibaba&apos;s new listings to spot emerging
                products.
              </p>
              <p>
                New product launches slipped through the gaps. Price changes
                were only caught during the next manual check. As the business
                grew, the problem compounded - more suppliers to monitor, more
                categories to track, more opportunities to miss.
              </p>
            </motion.div>

            <motion.div
              {...childProps}
              style={{
                background: "rgba(109,113,249,0.06)",
                borderLeft: "3px solid #6D71F9",
                borderRadius: "0 12px 12px 0",
                padding: "20px 24px",
              }}
            >
              <p
                style={{
                  color: "rgba(255,255,255,0.75)",
                  fontSize: 17,
                  lineHeight: 1.7,
                }}
              >
                What they needed was not more staff hours. They needed the whole
                process to run itself - every day, automatically - and deliver
                clean, structured data they could act on immediately.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── SOLUTION ─────────────────────────────────────────────── */}
      <section className="py-20 border-t border-white/[0.06]">
        <div className="max-w-5xl mx-auto px-6">
          <motion.div {...scrollProps} className="mb-14">
            <motion.div {...childProps}>
              <SectionLabel text="The Solution" />
            </motion.div>
            <motion.h2
              {...childProps}
              className="font-display font-bold text-white mb-4"
              style={{ fontSize: "clamp(24px, 4vw, 32px)" }}
            >
              A five-function supplier intelligence platform
            </motion.h2>
            <motion.p
              {...childProps}
              className="text-white/55 text-base leading-relaxed max-w-3xl"
            >
              Not a generic scraping tool. Built function by function against
              Alibaba&apos;s actual behaviour - evolving from 10 fields per function
              at initial build to 47 unique data fields across the full module.
            </motion.p>
          </motion.div>

          <motion.div {...scrollProps} className="space-y-5">
            <FunctionCard
              num="01"
              icon={<Store size={22} className="text-primary" />}
              title="Supplier Store Monitoring"
              body="Automatically tracks the full product catalogues of the client's key suppliers - spotting new additions and capturing complete product data every day without anyone visiting a single page."
              fields={[
                "product_id",
                "title",
                "price",
                "currency",
                "moq",
                "image_url",
                "product_url",
                "store_url",
                "company_name",
                "page_position",
              ]}
              tag="10 fields + price_tiers"
              shouldAnimate={shouldAnimate}
            />

            <FunctionCard
              num="02"
              icon={<Zap size={22} className="text-primary" />}
              title="New Product Launch Detection"
              body="Every day the system monitors Alibaba's new listings by product category, capturing 60+ new products per run. The client now knows what is entering the market before most competitors have noticed."
              fields={[
                "product_id",
                "title",
                "price",
                "currency",
                "moq",
                "image_url",
                "product_url",
                "store_url",
                "company_name",
                "page_position",
              ]}
              tag="10 fields + price_tiers"
              accentStat="60+ products per run"
              shouldAnimate={shouldAnimate}
            />

            <FunctionCard
              num="03"
              icon={<Search size={22} className="text-primary" />}
              title="Keyword-Based Product Search"
              body="Automated searches run across Alibaba based on the client's sourcing criteria. The most data-rich function in the module - returning 27 structured fields per product."
              fields={[
                "product_id",
                "title",
                "price",
                "currency",
                "moq",
                "image_url",
                "product_url",
                "store_url",
                "company_name",
                "page_position",
                "soldOrder",
                "reviewCount",
                "reviewScore",
                "discount",
                "badges",
                "certifications",
                "goldSupplierYears",
                "shippingScore",
                "supplierServiceScore",
                "productScore",
              ]}
              tag="27 fields + price_tiers"
              tagAccent
              shouldAnimate={shouldAnimate}
            />

            <FunctionCard
              num="04"
              icon={<FileText size={22} className="text-primary" />}
              title="Full Product Detail Extraction"
              body="For products of interest, the system pulls complete details in a single automated request - title, full description, all product images, quantity-based pricing tiers, full specifications, and supplier information. Everything needed to make a sourcing decision, without opening a browser tab."
              fields={[
                "title",
                "description",
                "all_images",
                "specifications",
                "price",
                "moq",
                "company_name",
                "store_url",
                "product_url",
                "product_id",
              ]}
              tag="11 fields + multi-tier pricing"
              shouldAnimate={shouldAnimate}
            />

            <Function05Card shouldAnimate={shouldAnimate} />
          </motion.div>
        </div>
      </section>

      {/* ── TECHNICAL CHALLENGE ──────────────────────────────────── */}
      <section className="py-20 border-t border-white/[0.06]">
        <div className="max-w-5xl mx-auto px-6">
          <motion.div {...scrollProps} className="mb-12">
            <motion.div {...childProps}>
              <SectionLabel text="The Technical Challenge" />
            </motion.div>
            <motion.h2
              {...childProps}
              className="font-display font-bold text-white mb-6"
              style={{ fontSize: "clamp(24px, 4vw, 32px)" }}
            >
              Alibaba actively blocks automated access
            </motion.h2>
            <motion.div
              {...childProps}
              className="space-y-4 text-white/60 leading-[1.8] max-w-3xl"
            >
              <p>
                Bot detection, CAPTCHAs, and IP-based blocking stop most tools
                immediately. Off-the-shelf scraping libraries fail on Alibaba
                without significant customisation.
              </p>
              <p>
                We built a custom anti-detection layer across all five functions
                - the reason the platform runs reliably every day where generic
                solutions do not.
              </p>
            </motion.div>
          </motion.div>

          <motion.div
            {...scrollProps}
            className="grid grid-cols-1 sm:grid-cols-2 gap-4"
          >
            {[
              {
                icon: <Shield size={20} className="text-primary" />,
                title: "Browser Fingerprint Spoofing",
                body: "Playwright-based automation configured to mimic real browser signatures — headers, viewport, user agent, and timing patterns.",
              },
              {
                icon: <Globe size={20} className="text-primary" />,
                title: "Residential Proxy Rotation",
                body: "IP rotation via residential proxies ensures requests originate from real addresses across geographies, avoiding IP-based blocks.",
              },
              {
                icon: <Zap size={20} className="text-primary" />,
                title: "CAPTCHA Resolution",
                body: "Automated CAPTCHA solving via CapSolver handles challenge pages without human intervention - keeping the daily schedule uninterrupted.",
              },
              {
                icon: <RefreshCw size={20} className="text-primary" />,
                title: "Retry Logic & Deduplication",
                body: "Exponential backoff retry logic, per-run deduplication, and full summary reporting ensure data integrity across every scheduled run.",
              },
            ].map((card) => (
              <motion.div
                key={card.title}
                {...childProps}
                className="p-6 rounded-xl"
                style={{
                  background: "rgba(255,255,255,0.02)",
                  border: "1px solid rgba(255,255,255,0.07)",
                }}
              >
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center mb-4"
                  style={{
                    background: "rgba(109,113,249,0.12)",
                    border: "1px solid rgba(109,113,249,0.25)",
                  }}
                >
                  {card.icon}
                </div>
                <h4 className="font-display font-bold text-white text-base mb-2">
                  {card.title}
                </h4>
                <p className="text-white/55 text-sm leading-relaxed">
                  {card.body}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── DATA ARCHITECTURE ────────────────────────────────────── */}
      <section className="py-20 border-t border-white/[0.06]">
        <div className="max-w-5xl mx-auto px-6">
          <motion.div {...scrollProps} className="mb-10">
            <motion.div {...childProps}>
              <SectionLabel text="Data Architecture" />
            </motion.div>
            <motion.h2
              {...childProps}
              className="font-display font-bold text-white mb-4"
              style={{ fontSize: "clamp(24px, 4vw, 32px)" }}
            >
              47 unique fields across the module
            </motion.h2>
            <motion.p
              {...childProps}
              className="text-white/55 text-base leading-relaxed max-w-3xl"
            >
              The module grew from ~10 fields per function at initial build to
              47 unique fields — the result of QA cycles, client feedback, and
              proactive additions identified during production use.
            </motion.p>
          </motion.div>

          <motion.div
            {...childProps}
            className="overflow-x-auto rounded-xl"
            style={{ border: "1px solid rgba(255,255,255,0.07)" }}
          >
            <table
              className="w-full text-sm"
              style={{ background: "rgba(255,255,255,0.01)" }}
            >
              <thead>
                <tr
                  style={{ borderBottom: "1px solid rgba(255,255,255,0.07)" }}
                >
                  {["Function", "Fields", "Key Additional Fields"].map((h) => (
                    <th
                      key={h}
                      className="text-left px-5 py-4 font-bold uppercase"
                      style={{
                        fontSize: 11,
                        letterSpacing: "0.15em",
                        color: "rgba(255,255,255,0.35)",
                      }}
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[
                  {
                    fn: "scrape_store",
                    fields: "10 + price_tiers",
                    extra:
                      "product_id, title, price, currency, moq, image_url, product_url, store_url, company_name, page_position",
                  },
                  {
                    fn: "scrape_new_launches",
                    fields: "10 + price_tiers",
                    extra:
                      "Same structure as store — enables direct comparison",
                  },
                  {
                    fn: "scrape_search",
                    fields: "27 + price_tiers",
                    extra:
                      "soldOrder, reviewCount, reviewScore, discount, badges, certifications, goldSupplierYears, shippingScore, supplierServiceScore, productScore",
                  },
                  {
                    fn: "scrape_product_detail",
                    fields: "11 + price_tiers",
                    extra:
                      "Full description, all_images, specifications, multi-tier quantity pricing",
                  },
                  {
                    fn: "scrape_image_search",
                    fields: "21 + summary",
                    extra:
                      "company_id, countryCode, goldSupplierYears, reviewScore, supplierService, shippingScore, certifications, isPaid, sellingPoints",
                  },
                ].map((row, i) => (
                  <tr
                    key={row.fn}
                    style={{
                      borderBottom:
                        i < 4
                          ? "1px solid rgba(255,255,255,0.05)"
                          : undefined,
                    }}
                  >
                    <td className="px-5 py-4">
                      <code
                        className="text-xs"
                        style={{ color: "#54C1FB" }}
                      >
                        {row.fn}
                      </code>
                    </td>
                    <td
                      className="px-5 py-4 text-xs font-medium"
                      style={{ color: "rgba(255,255,255,0.7)" }}
                    >
                      {row.fields}
                    </td>
                    <td
                      className="px-5 py-4 text-xs"
                      style={{ color: "rgba(255,255,255,0.45)" }}
                    >
                      {row.extra}
                    </td>
                  </tr>
                ))}
                <tr
                  style={{
                    borderTop: "1px solid rgba(109,113,249,0.2)",
                    background: "rgba(109,113,249,0.04)",
                  }}
                >
                  <td colSpan={3} className="px-5 py-4">
                    <span
                      className="font-display font-bold text-sm"
                      style={{
                        background:
                          "linear-gradient(135deg, #6D71F9, #54C1FB)",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                        backgroundClip: "text",
                      }}
                    >
                      Total unique fields: 47
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </motion.div>
        </div>
      </section>

      {/* ── TECH STACK ───────────────────────────────────────────── */}
      <section className="py-20 border-t border-white/[0.06]">
        <div className="max-w-5xl mx-auto px-6">
          <motion.div {...scrollProps}>
            <motion.div
              {...childProps}
              className="flex flex-wrap gap-3 mb-4"
            >
              {[
                "Python",
                "Playwright",
                "curl_cffi",
                "Residential Proxies",
                "CapSolver",
                "CSV Export",
              ].map((t) => (
                <TechBadge key={t} name={t} />
              ))}
            </motion.div>
            <motion.p
              {...childProps}
              className="leading-relaxed"
              style={{ color: "rgba(255,255,255,0.35)", fontSize: 12 }}
            >
              Functions 1-4: Playwright for JS-rendered pages.
              <br />
              Function 5: curl_cffi only — no browser dependency.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* ── OUTCOME ──────────────────────────────────────────────── */}
      <section className="py-20 border-t border-white/[0.06]">
        <div className="max-w-5xl mx-auto px-6">
          <motion.div {...scrollProps}>
            <motion.div {...childProps}>
              <SectionLabel text="The Outcome" />
            </motion.div>
            <motion.h2
              {...childProps}
              className="font-display font-bold text-white mb-10"
              style={{ fontSize: "clamp(24px, 4vw, 32px)" }}
            >
              Research that used to take hours now happens before 8am.
            </motion.h2>

            {/* Quote block */}
            <motion.div
              {...childProps}
              className="text-center rounded-[20px] p-12 mb-10"
              style={{
                background: "rgba(109,113,249,0.05)",
                border: "1px solid rgba(109,113,249,0.15)",
              }}
            >
              <span
                className="font-display font-bold block mb-4"
                style={{ fontSize: 80, color: "#6D71F9", lineHeight: 1 }}
              >
                &ldquo;
              </span>
              <p
                className="italic mb-5"
                style={{ color: "#ffffff", fontSize: 22, lineHeight: 1.6 }}
              >
                The system runs every morning and the sourcing research is just
                there. We don&apos;t touch it.
              </p>
              <p
                className="text-sm"
                style={{ color: "rgba(255,255,255,0.45)" }}
              >
                — Australian Importer, Alibaba Intelligence Platform
              </p>
            </motion.div>

            {/* Results row */}
            <motion.div
              {...childProps}
              className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10"
            >
              {[
                "8–10 hrs/wk replaced by automation",
                "60+ products detected per category run",
                "v1.3.0 live since May 2026",
              ].map((r) => (
                <div
                  key={r}
                  className="p-4 rounded-xl text-center text-sm font-semibold"
                  style={{
                    background: "rgba(109,113,249,0.06)",
                    border: "1px solid rgba(109,113,249,0.15)",
                    color: "rgba(255,255,255,0.8)",
                  }}
                >
                  {r}
                </div>
              ))}
            </motion.div>

            <motion.div
              {...childProps}
              className="space-y-4 text-white/60 leading-[1.8]"
            >
              <p>
                Since deployment in May 2026, the platform replaced
                approximately 8-10 hours of manual research per week. The
                client now receives a daily automated feed covering 4 monitored
                supplier stores, 60+ new product launches per category run, and
                hundreds of structured product records - delivered automatically
                before the work day begins.
              </p>
              <p>
                The relationship did not end at delivery. Since going live, the
                client has commissioned additional features - including the
                visual search function - a clear signal of the trust built and
                the ongoing value the platform delivers.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────────── */}
      <section className="py-20 border-t border-white/[0.06]">
        <div className="max-w-5xl mx-auto px-6">
          <motion.div
            {...scrollProps}
            className="text-center rounded-3xl p-12"
            style={{
              background: "rgba(109,113,249,0.06)",
              border: "1px solid rgba(109,113,249,0.15)",
            }}
          >
            <motion.p
              {...childProps}
              className="text-white/70 text-lg leading-relaxed mb-8 max-w-xl mx-auto"
            >
              If you&apos;re sourcing from Alibaba and still doing this manually,
              we&apos;d like to show you what this looks like for your operation.
            </motion.p>
            <motion.div {...childProps} className="mb-4">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2.5 px-8 py-4 rounded-full font-bold text-white text-base transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-primary/25"
                style={{
                  background: "linear-gradient(135deg, #6D71F9, #54C1FB)",
                }}
              >
                Get in Touch
                <ArrowRight size={17} />
              </Link>
            </motion.div>
            <motion.p
              {...childProps}
              className="text-sm"
              style={{ color: "rgba(255,255,255,0.3)" }}
            >
              Or email us directly at hello@xpersivelabs.com
            </motion.p>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
