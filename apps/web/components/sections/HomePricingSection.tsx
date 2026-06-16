"use client";

import { fadeUp, staggerContainer } from "@/lib/animations";
import { useMotionSafe } from "@/hooks/useMotionSafe";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

const TIERS = [
  {
    name: "Starter",
    plan: "starter",
    price: "$650",
    description: "1 scraper, maintained and monitored. 48-hour fix guarantee.",
    highlighted: false,
  },
  {
    name: "Growth",
    plan: "growth",
    price: "$1,800",
    description: "Up to 3 scrapers with priority support.",
    highlighted: true,
  },
  {
    name: "Agency Partner",
    plan: "agency",
    price: "$4,200",
    description:
      "Unlimited scrapers, dedicated pipeline, weekly client reports.",
    highlighted: false,
  },
];

export default function HomePricingSection() {
  const { shouldAnimate } = useMotionSafe();

  const scrollProps = shouldAnimate
    ? {
        variants: staggerContainer,
        initial: "hidden",
        whileInView: "visible" as const,
        viewport: { once: true, margin: "-80px" },
      }
    : { initial: false };

  const childProps = shouldAnimate ? { variants: fadeUp } : { initial: false };

  return (
    <section className="py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div className="text-center mb-14" {...scrollProps}>
          <motion.span
            {...childProps}
            className="inline-block text-primary text-xs font-bold uppercase tracking-[0.2em] mb-4"
          >
            Pricing
          </motion.span>
          <motion.h2
            {...childProps}
            className="font-display text-4xl sm:text-5xl font-bold mb-5"
          >
            Simple,{" "}
            <span className="text-gradient">transparent pricing</span>
          </motion.h2>
          <motion.p
            {...childProps}
            className="text-white/50 text-lg max-w-lg mx-auto leading-relaxed"
          >
            Monthly retainers with no lock-in. Scrapers built, maintained, and
            monitored by us.
          </motion.p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-5"
          {...scrollProps}
        >
          {TIERS.map((tier, i) => (
            <motion.div
              key={tier.name}
              {...(shouldAnimate
                ? { variants: fadeUp, transition: { delay: i * 0.1 } }
                : { initial: false })}
              className="relative flex flex-col rounded-2xl p-8"
              style={
                tier.highlighted
                  ? {
                      background:
                        "linear-gradient(135deg, rgba(109,113,249,0.12), rgba(84,193,251,0.06))",
                      border: "1px solid rgba(109,113,249,0.35)",
                    }
                  : {
                      background: "rgba(255,255,255,0.02)",
                      border: "1px solid rgba(255,255,255,0.08)",
                    }
              }
            >
              {tier.highlighted && (
                <span
                  className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-xs font-bold text-white whitespace-nowrap"
                  style={{
                    background: "linear-gradient(135deg, #6D71F9, #54C1FB)",
                  }}
                >
                  Most Popular
                </span>
              )}

              <p
                className="text-xs font-bold uppercase tracking-[0.2em] mb-3"
                style={{
                  color: tier.highlighted
                    ? "#6D71F9"
                    : "rgba(255,255,255,0.4)",
                }}
              >
                {tier.name}
              </p>

              <div className="flex items-end gap-1 mb-3">
                <span className="font-display text-4xl font-extrabold text-white">
                  {tier.price}
                </span>
                <span className="text-white/40 text-sm mb-1.5">/month</span>
              </div>

              <p className="text-white/55 text-sm leading-relaxed mb-8 flex-1">
                {tier.description}
              </p>

              <Link
                href={`/contact?plan=${tier.plan}`}
                className="group inline-flex items-center justify-center gap-2 w-full py-3 rounded-full font-semibold text-sm transition-all duration-300"
                style={
                  tier.highlighted
                    ? {
                        background:
                          "linear-gradient(135deg, #6D71F9, #54C1FB)",
                        color: "#ffffff",
                      }
                    : {
                        background: "rgba(109,113,249,0.1)",
                        border: "1px solid rgba(109,113,249,0.25)",
                        color: "rgba(255,255,255,0.8)",
                      }
                }
              >
                Get Started
                <ArrowRight
                  size={14}
                  className="group-hover:translate-x-0.5 transition-transform duration-200"
                />
              </Link>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          className="text-center mt-8"
          {...(shouldAnimate
            ? {
                initial: { opacity: 0 },
                whileInView: { opacity: 1 },
                viewport: { once: true },
                transition: { delay: 0.4 },
              }
            : { initial: false })}
        >
          <Link
            href="/services"
            className="text-sm font-medium transition-colors duration-200 hover:text-primary"
            style={{ color: "rgba(255,255,255,0.4)" }}
          >
            See full details →
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
