"use client";

import { fadeUp, staggerContainer } from "@/lib/animations";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useState } from "react";
import { useMotionSafe } from "@/hooks/useMotionSafe";
import { useSectionReveal } from "@/hooks/useSectionReveal";

const faqs = [
  {
    question: "How much does a project cost?",
    answer: "It depends on scope. Most projects range from $1,500 to $10,000. We'll give you an exact number after a quick call.",
  },
  {
    question: "How long does it take?",
    answer: "Most projects are live within 2-6 weeks depending on complexity.",
  },
  {
    question: "How do we communicate given the time difference?",
    answer: "We overlap with AU, UK, and US working hours and respond within 48 hours, usually faster.",
  },
  {
    question: "Do you sign contracts?",
    answer: "Yes, every project starts with a clear scope and agreement before work begins.",
  },
  {
    question: "What happens after launch?",
    answer: "We offer 30 days of post-launch support, plus ongoing maintenance plans if you need them.",
  },
];

function FAQItem({ faq, isOpen, onToggle }: { faq: (typeof faqs)[number]; isOpen: boolean; onToggle: () => void }) {
  const { shouldAnimate } = useMotionSafe();

  return (
    <motion.div
      {...(shouldAnimate ? { variants: fadeUp } : { initial: false })}
      className={`rounded-2xl border bg-bg-card shadow-sm overflow-hidden transition-colors duration-300 ${
        isOpen ? "border-primary/35" : "border-border-subtle hover:border-primary/20"
      }`}
    >
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        className="w-full flex items-center justify-center gap-3 text-center p-6 sm:p-8"
      >
        <h3 className="font-display text-lg font-bold text-text-primary">{faq.question}</h3>
        <motion.span
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          className={`shrink-0 rounded-full p-1 ${isOpen ? "text-primary" : "text-text-muted"}`}
        >
          <ChevronDown size={20} aria-hidden="true" />
        </motion.span>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.215, 0.61, 0.355, 1.0] }}
            className="overflow-hidden"
          >
            <p className="text-text-secondary leading-relaxed text-center px-6 sm:px-8 pb-6 sm:pb-8">{faq.answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function FAQSection() {
  const { shouldAnimate } = useMotionSafe();
  const { ref, inView } = useSectionReveal();
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const scrollProps = shouldAnimate ? {
    variants: staggerContainer,
    initial: "hidden",
    whileInView: "visible" as const,
    viewport: { once: true, margin: "-80px" },
  } : { initial: false };

  const childProps = shouldAnimate ? { variants: fadeUp } : { initial: false };

  return (
    <section ref={ref} className="py-28 relative overflow-hidden bg-[rgba(109,113,249,0.035)]">
      <motion.div
        className="max-w-7xl mx-auto px-6"
        {...(shouldAnimate
          ? {
              initial: { opacity: 0, y: 10 },
              animate: inView ? { opacity: 1, y: 0 } : {},
              transition: { duration: 0.5, delay: 0.1, ease: [0.215, 0.61, 0.355, 1.0] },
            }
          : { initial: false })}
      >
        <motion.div className="max-w-2xl mx-auto text-center mb-14" {...scrollProps}>
          <motion.span {...childProps} className="inline-block text-primary text-xs font-bold uppercase tracking-[0.2em] mb-3">
            Clarity &amp; Transparency
          </motion.span>
          <motion.h2 {...childProps} className="font-display text-4xl sm:text-5xl font-bold text-text-primary">
            Common questions
          </motion.h2>
        </motion.div>

        <motion.div className="max-w-3xl mx-auto flex flex-col gap-4" {...scrollProps}>
          {faqs.map((faq, i) => (
            <FAQItem
              key={faq.question}
              faq={faq}
              isOpen={openIndex === i}
              onToggle={() => setOpenIndex((current) => (current === i ? null : i))}
            />
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}
