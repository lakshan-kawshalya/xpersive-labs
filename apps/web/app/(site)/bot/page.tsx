import type { Metadata } from "next";
import { Bot, Check, Mail } from "lucide-react";
import { LegalIntroCallout } from "@/components/legal/LegalIntroCallout";
import { LegalNumberedCard } from "@/components/legal/LegalNumberedCard";
import { LegalPageHero } from "@/components/legal/LegalPageHero";
import { LegalTocSidebar } from "@/components/legal/LegalTocSidebar";

export const metadata: Metadata = {
  title: "XpersiveLabsBot",
  description:
    "About XpersiveLabsBot, the crawler operated by Xpersive Labs: what it does, how it behaves, and how to block it.",
  alternates: { canonical: "https://www.xpersivelabs.com/bot" },
  robots: { index: true, follow: true },
};

const EFFECTIVE_DATE = "October 7, 2026";
const BOT_EMAIL = "bot@xpersivelabs.com";

const sections = [
  { id: "what-it-is", label: "What It Is" },
  { id: "what-it-does", label: "What It Does" },
  { id: "how-to-block", label: "How to Block It" },
  { id: "contact", label: "Contact Us" },
];

const behaviours = [
  "Reads robots.txt first and follows it.",
  "Visits at most 6 pages per site, only pages linked from the homepage.",
  "Waits at least 3 seconds between requests to the same site.",
  "Collects only business information published on the site.",
  "Does not log in, submit forms or bypass any blocking.",
];

const robotsSnippet = `User-agent: XpersiveLabsBot
Disallow: /`;

export default function BotPage() {
  return (
    <div className="text-text-primary min-h-screen">
      <LegalPageHero
        eyebrow="Crawler Information"
        title="XpersiveLabsBot"
        subtitle="XpersiveLabsBot is operated by Xpersive Labs, a software studio based in Sri Lanka. This page explains what it does and how to opt out."
        effectiveDate={EFFECTIVE_DATE}
      />

      <section className="pb-28">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            <LegalTocSidebar sections={sections} />

            <div className="lg:col-span-8 flex flex-col gap-10">
              <LegalIntroCallout icon={Bot} title="A Polite, Limited Crawler">
                XpersiveLabsBot reads publicly available pages on business websites to learn what
                services a company offers, so we can decide whether to contact that business about our
                development services.
              </LegalIntroCallout>

              <LegalNumberedCard number="01" id="what-it-is" title="What It Is">
                <div className="flex flex-col gap-4 text-sm sm:text-base text-text-secondary leading-relaxed">
                  <p>
                    XpersiveLabsBot is a small crawler run by Xpersive Labs, based in Colombo, Sri
                    Lanka. It only reads pages that are publicly available on business websites.
                  </p>
                  <p>
                    The information it collects is used to decide whether we should get in touch with
                    a business about our development services.
                  </p>
                </div>
              </LegalNumberedCard>

              <LegalNumberedCard number="02" id="what-it-does" title="What It Does">
                <ul className="flex flex-col gap-2.5">
                  {behaviours.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-2.5 text-sm sm:text-base text-text-secondary leading-relaxed"
                    >
                      <Check size={16} className="text-primary mt-1 shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </LegalNumberedCard>

              <LegalNumberedCard number="03" id="how-to-block" title="How to Block It">
                <div className="flex flex-col gap-4 text-sm sm:text-base text-text-secondary leading-relaxed">
                  <p>Add this to your robots.txt:</p>
                  <pre className="p-4 rounded-xl bg-[rgba(39,40,72,0.05)] border border-border-subtle overflow-x-auto font-mono text-xs sm:text-sm text-text-primary">
                    {robotsSnippet}
                  </pre>
                  <p>
                    Or email{" "}
                    <a href={`mailto:${BOT_EMAIL}`} className="text-primary font-semibold hover:underline">
                      {BOT_EMAIL}
                    </a>{" "}
                    and we will remove your site from our list and not visit it again.
                  </p>
                </div>
              </LegalNumberedCard>

              <LegalNumberedCard number="04" id="contact" title="Contact Us" tinted>
                <p className="text-sm sm:text-base text-text-secondary leading-relaxed mb-6">
                  Questions or concerns about XpersiveLabsBot? Get in touch:
                </p>
                <div className="bg-bg-card rounded-xl p-5 border border-border-subtle flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <span className="text-xs uppercase tracking-wider font-semibold text-text-muted block mb-1">
                      Crawler Inquiries
                    </span>
                    <p className="font-display font-bold text-base text-text-primary">Xpersive Labs</p>
                    <p className="text-sm text-text-secondary">Colombo, Sri Lanka</p>
                  </div>
                  <a
                    href={`mailto:${BOT_EMAIL}`}
                    className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-primary/10 text-primary hover:bg-primary hover:text-white transition-all text-xs font-semibold border border-primary/20"
                  >
                    <Mail size={16} />
                    {BOT_EMAIL}
                  </a>
                </div>
              </LegalNumberedCard>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
