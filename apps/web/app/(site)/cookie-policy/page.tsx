import type { Metadata } from "next";
import Link from "next/link";
import { AlertTriangle, Check, Cookie, Settings2, ShieldCheck } from "lucide-react";
import { CookiePreferencesButton } from "@/components/layout/CookiePreferencesButton";
import { LegalContactCard } from "@/components/legal/LegalContactCard";
import { LegalIntroCallout } from "@/components/legal/LegalIntroCallout";
import { LegalNumberedCard } from "@/components/legal/LegalNumberedCard";
import { LegalPageHero } from "@/components/legal/LegalPageHero";
import { LegalTocSidebar } from "@/components/legal/LegalTocSidebar";

export const metadata: Metadata = {
  title: "Cookie Policy",
  description: "Information about the cookies used on xpersivelabs.com.",
  alternates: { canonical: "https://www.xpersivelabs.com/cookie-policy" },
  robots: { index: true, follow: true },
};

const EFFECTIVE_DATE = "September 8, 2026";

const sections = [
  { id: "what-are-cookies", label: "What Are Cookies?" },
  { id: "how-we-use-cookies", label: "How We Use Cookies" },
  { id: "managing-preferences", label: "Managing Preferences" },
  { id: "consent", label: "Consent" },
  { id: "changes-to-this-policy", label: "Changes to This Policy" },
  { id: "contact", label: "Contact Us" },
];

const essentialCookieUses = [
  "Enable essential website functionality.",
  "Remember your cookie preferences.",
  "Maintain security and functionality.",
];

const analyticsInfo = [
  "Pages visited",
  "Time spent on pages",
  "General device or browser information",
  "General interaction with the website",
];

const thirdPartyPurposes = ["Analytics", "Communication", "Embedded content", "Website functionality"];

function CookieCategoryCard({
  color,
  name,
  badge,
  badgeClassName,
  children,
}: {
  color: string;
  name: string;
  badge: string;
  badgeClassName: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className="p-5 rounded-xl bg-bg-card border border-border-subtle"
      style={{ boxShadow: "0 2px 12px rgba(109,113,249,0.05)" }}
    >
      <div className="flex items-center justify-between mb-3 gap-3">
        <div className="flex items-center gap-2.5">
          <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ background: color }} />
          <h3 className="font-display font-bold text-base text-text-primary">{name}</h3>
        </div>
        <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-semibold shrink-0 ${badgeClassName}`}>
          {badge}
        </span>
      </div>
      {children}
    </div>
  );
}

export default function CookiePolicyPage() {
  return (
    <div className="text-text-primary min-h-screen">
      <LegalPageHero
        eyebrow="Legal & Privacy"
        title="Cookie Policy"
        subtitle="This Cookie Policy explains how Xpersive Labs uses cookies and similar technologies when you visit our website."
        effectiveDate={EFFECTIVE_DATE}
      />

      <section className="pb-28">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            <LegalTocSidebar sections={sections} />

            <div className="lg:col-span-8 flex flex-col gap-10">
              <LegalIntroCallout icon={Cookie} title="Transparency & Data Dignity">
                This Cookie Policy explains how Xpersive Labs uses cookies and similar technologies
                when you visit our website. We believe in minimal data footprint, clear controls, and
                complete operational transparency.
              </LegalIntroCallout>

              <LegalNumberedCard number="01" id="what-are-cookies" title="What Are Cookies?">
                <div className="flex flex-col gap-4 text-sm sm:text-base text-text-secondary leading-relaxed">
                  <p>Cookies are small text files stored on your device when you visit a website.</p>
                  <p>
                    They are commonly used to help websites function correctly, remember user
                    preferences, improve performance, and understand how visitors interact with a
                    website.
                  </p>
                  <div className="p-4 rounded-xl bg-[rgba(109,113,249,0.035)] border border-border-subtle flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-bg-card border border-border-subtle flex items-center justify-center text-primary shrink-0">
                      <ShieldCheck size={16} />
                    </div>
                    <p className="text-xs sm:text-sm text-text-secondary">
                      Cookies help ensure security, session continuity, and optimal browsing
                      performance across modern web platforms.
                    </p>
                  </div>
                </div>
              </LegalNumberedCard>

              <LegalNumberedCard number="02" id="how-we-use-cookies" title="How We Use Cookies">
                <p className="text-sm sm:text-base text-text-secondary leading-relaxed mb-5">
                  Xpersive Labs may use cookies and similar technologies for the following purposes:
                </p>

                <div className="flex flex-col gap-5">
                  <CookieCategoryCard
                    color="#6D71F9"
                    name="Essential Cookies"
                    badge="Required"
                    badgeClassName="bg-primary/10 text-primary"
                  >
                    <p className="text-sm text-text-secondary mb-3 leading-relaxed">
                      These cookies are necessary for the proper operation of our website. They may be
                      used to:
                    </p>
                    <ul className="flex flex-col gap-2 mb-4">
                      {essentialCookieUses.map((item) => (
                        <li key={item} className="flex items-start gap-2.5 text-xs sm:text-sm text-text-secondary">
                          <Check size={16} className="text-primary mt-0.5 shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="p-3 rounded-lg bg-[rgba(109,113,249,0.035)] border border-border-subtle text-xs text-text-secondary font-medium">
                      These cookies generally cannot be disabled through our website because they are
                      required for the website to function properly.
                    </div>
                  </CookieCategoryCard>

                  <CookieCategoryCard
                    color="#54C1FB"
                    name="Preference Cookies"
                    badge="Configurable"
                    badgeClassName="bg-accent/10 text-accent"
                  >
                    <p className="text-sm text-text-secondary mb-2 leading-relaxed">
                      Preference cookies help us remember choices you make when using our website.
                    </p>
                    <p className="text-xs sm:text-sm text-text-secondary">
                      For example, they may remember your cookie consent preferences.
                    </p>
                  </CookieCategoryCard>

                  <CookieCategoryCard
                    color="#6D71F9"
                    name="Analytics Cookies"
                    badge="Consent-Based"
                    badgeClassName="bg-[rgba(39,40,72,0.05)] text-text-secondary"
                  >
                    <p className="text-sm text-text-secondary mb-3 leading-relaxed">
                      We may use analytics technologies to understand how visitors use our website.
                      This information may include:
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mb-4">
                      {analyticsInfo.map((item) => (
                        <div
                          key={item}
                          className="p-3 rounded-lg bg-[rgba(109,113,249,0.035)] border border-border-subtle flex items-center gap-2 text-xs text-text-secondary"
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                    <p className="text-xs sm:text-sm text-text-secondary mb-2 leading-relaxed">
                      Analytics information is used to help us improve our website and services.
                    </p>
                    <p className="text-xs text-primary font-medium">
                      Where required, analytics cookies will only be used with your consent.
                    </p>
                  </CookieCategoryCard>

                  <CookieCategoryCard
                    color="#272848"
                    name="Third-Party Cookies"
                    badge="External Providers"
                    badgeClassName="bg-[rgba(39,40,72,0.05)] text-text-primary"
                  >
                    <p className="text-sm text-text-secondary mb-3 leading-relaxed">
                      Some third-party services integrated into our website may place their own
                      cookies on your device. These third parties may include services used for:
                    </p>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-4">
                      {thirdPartyPurposes.map((purpose) => (
                        <div
                          key={purpose}
                          className="p-2.5 rounded-lg bg-[rgba(109,113,249,0.035)] border border-border-subtle text-center text-xs font-medium text-text-primary"
                        >
                          {purpose}
                        </div>
                      ))}
                    </div>
                    <p className="text-xs text-text-secondary leading-relaxed">
                      The use of these cookies may be governed by the privacy policies of the relevant
                      third-party providers.
                    </p>
                  </CookieCategoryCard>
                </div>
              </LegalNumberedCard>

              <LegalNumberedCard number="03" id="managing-preferences" title="Managing Your Cookie Preferences">
                <div className="flex flex-col gap-4 text-sm sm:text-base text-text-secondary leading-relaxed mb-5">
                  <p>
                    You can manage your cookie preferences at any time using the button below.
                  </p>
                  <p>You can also control cookies through your browser settings.</p>
                </div>

                <CookiePreferencesButton className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-primary/10 text-primary hover:bg-primary hover:text-white transition-all text-sm font-semibold border border-primary/20 mb-5">
                  <Settings2 size={16} />
                  Manage Cookie Preferences
                </CookiePreferencesButton>

                <div
                  className="p-4 rounded-xl flex items-start gap-3"
                  style={{ background: "rgba(245,158,11,0.06)", border: "1px solid rgba(245,158,11,0.2)" }}
                >
                  <AlertTriangle size={18} className="mt-0.5 shrink-0" style={{ color: "#92610a" }} />
                  <p className="text-xs sm:text-sm leading-relaxed" style={{ color: "#92610a" }}>
                    Please note that disabling certain cookies may affect the functionality and
                    performance of our website.
                  </p>
                </div>
              </LegalNumberedCard>

              <LegalNumberedCard number="04" id="consent" title="Consent">
                <div className="flex flex-col gap-3 text-sm sm:text-base text-text-secondary leading-relaxed">
                  <p>
                    Where required by applicable law, we will request your consent before placing
                    non-essential cookies on your device.
                  </p>
                  <p>
                    You may withdraw or change your consent at any time through our cookie
                    preferences settings, where available.
                  </p>
                </div>
              </LegalNumberedCard>

              <LegalNumberedCard number="05" id="changes-to-this-policy" title="Changes to This Cookie Policy">
                <div className="flex flex-col gap-3 text-sm sm:text-base text-text-secondary leading-relaxed">
                  <p>We may update this Cookie Policy from time to time.</p>
                  <p>Any updates will be published on this page with a revised &quot;Last updated&quot; date.</p>
                </div>
              </LegalNumberedCard>

              <LegalContactCard
                number="06"
                intro="If you have questions about our use of cookies, please contact us:"
              />

              <p className="text-sm">
                <Link href="/privacy-policy" className="text-primary font-semibold hover:underline">
                  Read our Privacy Policy →
                </Link>
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
