import type { Metadata } from "next";
import Link from "next/link";
import {
  BadgeCheck,
  CheckCircle2,
  Eye,
  Gauge,
  Gavel,
  IdCard,
  Info,
  Lock,
  PenLine,
  RefreshCw,
  Route,
  Share2,
  Shield,
  Smartphone,
  Trash2,
  Undo2,
  UserX,
} from "lucide-react";
import { WhatsAppIcon } from "@/components/layout/WhatsAppWidget";
import { LegalContactCard } from "@/components/legal/LegalContactCard";
import { LegalIntroCallout } from "@/components/legal/LegalIntroCallout";
import { LegalNumberedCard } from "@/components/legal/LegalNumberedCard";
import { LegalPageHero } from "@/components/legal/LegalPageHero";
import { LegalTocSidebar } from "@/components/legal/LegalTocSidebar";
import { buildWhatsAppUrl } from "@/lib/whatsapp";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How Xpersive Labs collects, uses, and protects your personal information.",
  alternates: { canonical: "https://www.xpersivelabs.com/privacy-policy" },
  robots: { index: true, follow: true },
};

const EFFECTIVE_DATE = "September 8, 2026";

const sections = [
  { id: "information-we-collect", label: "Information We May Collect" },
  { id: "automatically-collected", label: "Automatically Collected" },
  { id: "how-we-use", label: "How We Use Your Info" },
  { id: "project-enquiries", label: "Project Enquiries" },
  { id: "communication", label: "Communication Channels" },
  { id: "cookies", label: "Cookies & Tracking" },
  { id: "how-we-share", label: "How We Share Info" },
  { id: "international-clients", label: "International Clients" },
  { id: "data-security", label: "Data Security" },
  { id: "data-retention", label: "Data Retention" },
  { id: "your-rights", label: "Your Rights & Access" },
  { id: "third-party-platforms", label: "Third-Party Platforms" },
  { id: "childrens-privacy", label: "Children's Privacy" },
  { id: "policy-modifications", label: "Policy Modifications" },
  { id: "contact", label: "Contact Us" },
];

const voluntaryInfo = [
  "Your name",
  "Your email address",
  "Your company name (optional)",
  "The service you are interested in",
  "Your project description and any other information you choose to share",
];

const contactChannels = [
  "Our website contact form",
  "Direct email (hello@xpersivelabs.com)",
  "WhatsApp",
];

const automaticData = [
  { icon: Route, label: "Pages Visited", detail: "Which pages you viewed" },
  { icon: Smartphone, label: "Device & Browser", detail: "General device and browser type" },
  { icon: Gauge, label: "Time on Page", detail: "How long you spent on a page" },
  { icon: Share2, label: "Referral Source", detail: "How you found us" },
];

const howWeUse = [
  "Respond to your enquiry and questions",
  "Prepare project proposals and quotes",
  "Manage our working relationship if you become a client",
  "Understand which pages are useful and improve the website",
];

const rights = [
  { icon: Eye, title: "Right to Access", detail: "Ask what personal data we hold about you." },
  { icon: PenLine, title: "Right to Rectify", detail: "Ask us to correct inaccurate data." },
  { icon: Trash2, title: "Right to Erasure", detail: "Ask us to delete your personal data." },
  { icon: UserX, title: "Right to Object", detail: "Object to our processing of your data." },
  { icon: RefreshCw, title: "Portability", detail: "Get a copy of your data in a machine-readable format." },
  { icon: Undo2, title: "Withdrawal", detail: "Withdraw previously given consent at any time." },
];

export default function PrivacyPolicyPage() {
  return (
    <div className="text-text-primary min-h-screen">
      <LegalPageHero
        eyebrow="Legal & Privacy"
        title="Privacy Policy"
        subtitle="This Privacy Policy explains how Xpersive Labs collects, uses, stores, and protects information when you visit our website, contact us, or enquire about our software development services."
        effectiveDate={EFFECTIVE_DATE}
      />

      <section className="pb-28">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            <LegalTocSidebar sections={sections} />

            <div className="lg:col-span-8 flex flex-col gap-10">
              <LegalIntroCallout icon={Gavel} title="Studio Commitment & Jurisdiction">
                Xpersive Labs (&quot;we&quot;, &quot;us&quot;, or &quot;our&quot;) respects your
                privacy and is committed to protecting the personal information you share with
                us. We are a Colombo-based software studio providing website development, mobile
                application development, custom software development, automation, and UI/UX
                development to clients in Sri Lanka and internationally. By using our website or
                contacting us, you acknowledge the practices described in this Privacy Policy.
              </LegalIntroCallout>

              <LegalNumberedCard number="01" id="information-we-collect" title="Information We May Collect">
                <p className="text-sm sm:text-base text-text-secondary leading-relaxed mb-4">
                  We may collect personal information that you voluntarily provide to us when you
                  contact us or submit a project enquiry.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div className="p-4 rounded-xl bg-[rgba(109,113,249,0.035)] border border-border-subtle">
                    <div className="flex items-center gap-2 text-primary mb-2.5">
                      <IdCard size={16} />
                      <h3 className="font-display font-bold text-sm text-text-primary">
                        Voluntary Information
                      </h3>
                    </div>
                    <ul className="flex flex-col gap-1.5 text-xs sm:text-sm text-text-secondary">
                      {voluntaryInfo.map((item) => (
                        <li key={item} className="flex items-start gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="p-4 rounded-xl bg-[rgba(109,113,249,0.035)] border border-border-subtle">
                    <div className="flex items-center gap-2 text-accent mb-2.5">
                      <Share2 size={16} />
                      <h3 className="font-display font-bold text-sm text-text-primary">
                        Contact Channels
                      </h3>
                    </div>
                    <ul className="flex flex-col gap-1.5 text-xs sm:text-sm text-text-secondary">
                      {contactChannels.map((item) => (
                        <li key={item} className="flex items-start gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-accent mt-1.5 shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </LegalNumberedCard>

              <LegalNumberedCard number="02" id="automatically-collected" title="Information Automatically Collected">
                <p className="text-sm sm:text-base text-text-secondary leading-relaxed mb-4">
                  When you visit our website, we collect anonymous usage data through Vercel
                  Analytics, including:
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 mb-4">
                  {automaticData.map(({ icon: Icon, label, detail }) => (
                    <div
                      key={label}
                      className="p-3 rounded-xl bg-[rgba(109,113,249,0.035)] border border-border-subtle text-center"
                    >
                      <Icon size={18} className="text-primary mx-auto mb-1.5" />
                      <p className="text-xs font-semibold text-text-primary">{label}</p>
                      <p className="text-[11px] text-text-muted">{detail}</p>
                    </div>
                  ))}
                </div>
                <div className="p-4 rounded-xl bg-primary/5 border border-primary/15 flex items-start gap-3">
                  <Info size={18} className="text-primary mt-0.5 shrink-0" />
                  <p className="text-xs sm:text-sm text-text-secondary">
                    This data is aggregated and anonymised. It cannot be used to identify you
                    personally. Vercel Analytics is cookieless — it sends anonymous page-view
                    beacons without setting a persistent tracking cookie.
                  </p>
                </div>
              </LegalNumberedCard>

              <LegalNumberedCard number="03" id="how-we-use" title="How We Use Your Information">
                <p className="text-sm sm:text-base text-text-secondary leading-relaxed mb-4">
                  We use the information we collect for the following purposes:
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mb-4">
                  {howWeUse.map((item) => (
                    <div
                      key={item}
                      className="flex items-start gap-2.5 p-3 rounded-lg bg-[rgba(109,113,249,0.035)] border border-border-subtle"
                    >
                      <CheckCircle2 size={16} className="text-primary shrink-0 mt-0.5" />
                      <span className="text-xs sm:text-sm text-text-secondary">{item}</span>
                    </div>
                  ))}
                </div>
                <div className="p-3.5 rounded-xl bg-[rgba(39,40,72,0.03)] border border-border-subtle">
                  <p className="text-xs sm:text-sm text-text-primary font-medium">
                    We do not add you to any marketing list without your explicit consent, and we
                    do not use your data for advertising profiling.
                  </p>
                </div>
              </LegalNumberedCard>

              <LegalNumberedCard number="04" id="project-enquiries" title="Project Enquiries">
                <div className="flex flex-col gap-3 text-sm sm:text-base text-text-secondary leading-relaxed">
                  <p>
                    Submitting a project enquiry through our website, email, or WhatsApp initiates
                    preliminary discovery. Submitting an enquiry does not independently create a
                    client relationship or guarantee that Xpersive Labs will accept or undertake a
                    project.
                  </p>
                  <div className="p-4 rounded-xl bg-[rgba(109,113,249,0.035)] border border-border-subtle">
                    <h3 className="font-display font-bold text-sm text-text-primary mb-1.5">
                      Contractual Boundary
                    </h3>
                    <p className="text-xs sm:text-sm">
                      Formal engagement — including scope, timeline, pricing, and any
                      confidentiality arrangements — is agreed separately with the client before a
                      project begins.
                    </p>
                  </div>
                </div>
              </LegalNumberedCard>

              <LegalNumberedCard number="05" id="communication" title="Communication Through Email & WhatsApp">
                <p className="text-sm sm:text-base text-text-secondary leading-relaxed mb-4">
                  We provide direct channels for client convenience, including email and
                  WhatsApp.
                </p>
                <div className="p-4 rounded-xl mb-4" style={{ background: "rgba(245,158,11,0.06)", border: "1px solid rgba(245,158,11,0.2)" }}>
                  <div className="flex items-center gap-2 mb-1.5" style={{ color: "#92610a" }}>
                    <Lock size={16} />
                    <span className="font-display font-bold text-xs uppercase tracking-wider">
                      Security Advisory
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm leading-relaxed" style={{ color: "#92610a" }}>
                    We recommend that you avoid sending sensitive credentials or confidential
                    financial information over informal instant messaging unless a dedicated
                    agreement has been established.
                  </p>
                </div>
                <p className="text-xs sm:text-sm text-text-secondary">
                  Communication over WhatsApp is additionally subject to the privacy policy of
                  WhatsApp&apos;s operator, Meta Platforms, Inc.
                </p>
              </LegalNumberedCard>

              <LegalNumberedCard number="06" id="cookies" title="Cookies & Similar Technologies">
                <p className="text-sm sm:text-base text-text-secondary leading-relaxed mb-4">
                  We use minimal cookies to maintain core functionality, remember your
                  preferences, and understand overall site usage.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 mb-4">
                  <div className="p-3.5 rounded-xl bg-[rgba(109,113,249,0.035)] border border-border-subtle">
                    <p className="font-display font-bold text-sm text-text-primary mb-1">Essential</p>
                    <p className="text-xs text-text-secondary">
                      Required for the website to function correctly.
                    </p>
                  </div>
                  <div className="p-3.5 rounded-xl bg-[rgba(109,113,249,0.035)] border border-border-subtle">
                    <p className="font-display font-bold text-sm text-text-primary mb-1">Preferences</p>
                    <p className="text-xs text-text-secondary">
                      Remembers your cookie consent choice.
                    </p>
                  </div>
                  <div className="p-3.5 rounded-xl bg-[rgba(109,113,249,0.035)] border border-border-subtle">
                    <p className="font-display font-bold text-sm text-text-primary mb-1">Analytics</p>
                    <p className="text-xs text-text-secondary">
                      Aggregated, cookieless traffic insight.
                    </p>
                  </div>
                </div>
                <p className="text-xs sm:text-sm text-text-secondary">
                  For full details on individual cookies and how to manage your preferences, see
                  our dedicated{" "}
                  <Link href="/cookie-policy" className="text-primary font-semibold hover:underline">
                    Cookie Policy
                  </Link>
                  .
                </p>
              </LegalNumberedCard>

              <LegalNumberedCard number="07" id="how-we-share" title="How We Share Information">
                <div className="p-4 sm:p-5 rounded-xl bg-primary text-white mb-4 flex items-center justify-between gap-4">
                  <div>
                    <p className="text-[11px] font-bold uppercase tracking-wider text-white/70 mb-1">
                      Strict Guarantee
                    </p>
                    <p className="font-display font-bold text-sm sm:text-base">
                      Xpersive Labs does not sell, rent, or monetize your personal information.
                    </p>
                  </div>
                  <BadgeCheck size={32} className="shrink-0 text-white/80" />
                </div>
                <p className="text-sm sm:text-base text-text-secondary leading-relaxed mb-4">
                  We only share information with trusted service providers that help us run our
                  website and business:
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="px-3.5 py-1.5 rounded-full bg-[rgba(39,40,72,0.05)] text-xs sm:text-sm font-medium text-text-primary">
                    Vercel — hosting &amp; analytics
                  </span>
                  <span className="px-3.5 py-1.5 rounded-full bg-[rgba(39,40,72,0.05)] text-xs sm:text-sm font-medium text-text-primary">
                    EmailJS — contact form delivery
                  </span>
                </div>
              </LegalNumberedCard>

              <LegalNumberedCard number="08" id="international-clients" title="International Clients & Data Transfers">
                <p className="text-sm sm:text-base text-text-secondary leading-relaxed mb-4">
                  As a Sri Lanka-based studio, we work with clients across several regions:
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 mb-4 text-center">
                  {["Australia", "United Kingdom", "United States", "European Union"].map((region) => (
                    <div
                      key={region}
                      className="p-3 rounded-xl bg-[rgba(109,113,249,0.035)] border border-border-subtle"
                    >
                      <span className="text-xs sm:text-sm font-semibold text-text-primary">{region}</span>
                    </div>
                  ))}
                </div>
                <p className="text-xs sm:text-sm text-text-secondary leading-relaxed">
                  Our website is hosted on Vercel, Inc. (USA). By using our website, your data may
                  be processed on servers in the United States and other countries where Vercel
                  operates.
                </p>
              </LegalNumberedCard>

              <LegalNumberedCard number="09" id="data-security" title="Data Security">
                <div className="flex flex-col gap-4 text-sm sm:text-base text-text-secondary leading-relaxed">
                  <p>
                    Our website is served entirely over HTTPS (TLS encryption in transit), and we
                    apply reasonable technical and organizational measures to protect the
                    information you share with us.
                  </p>
                  <div className="p-3.5 rounded-xl bg-[rgba(39,40,72,0.03)] border border-border-subtle flex items-start gap-2.5">
                    <Shield size={16} className="text-text-muted mt-0.5 shrink-0" />
                    <span className="text-xs sm:text-sm text-text-secondary">
                      No transmission over the internet can be guaranteed 100% secure. We encourage
                      good security practice on your own devices as well.
                    </span>
                  </div>
                </div>
              </LegalNumberedCard>

              <LegalNumberedCard number="10" id="data-retention" title="Data Retention">
                <p className="text-sm sm:text-base text-text-secondary leading-relaxed mb-4">
                  We retain personal information only for as long as necessary to fulfil the
                  purposes described in this policy.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div className="p-4 rounded-xl bg-[rgba(109,113,249,0.035)] border border-border-subtle">
                    <p className="font-display font-bold text-sm text-text-primary mb-1">Inquiry Records</p>
                    <p className="text-xs sm:text-sm text-text-secondary">
                      Retained for up to 12 months from your last contact if no engagement follows.
                    </p>
                  </div>
                  <div className="p-4 rounded-xl bg-[rgba(109,113,249,0.035)] border border-border-subtle">
                    <p className="font-display font-bold text-sm text-text-primary mb-1">Analytics Data</p>
                    <p className="text-xs sm:text-sm text-text-secondary">
                      Retained for up to 24 months in line with Vercel&apos;s data retention
                      policies.
                    </p>
                  </div>
                </div>
              </LegalNumberedCard>

              <LegalNumberedCard number="11" id="your-rights" title="Your Rights">
                <p className="text-sm sm:text-base text-text-secondary leading-relaxed mb-4">
                  Depending on where you are located, you may have the following rights over your
                  personal data — under GDPR if you are in the EU or UK, or the Privacy Act 1988
                  if you are in Australia:
                </p>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2.5 mb-4">
                  {rights.map(({ icon: Icon, title, detail }) => (
                    <div
                      key={title}
                      className="p-3.5 rounded-xl bg-[rgba(109,113,249,0.035)] border border-border-subtle"
                    >
                      <Icon size={16} className="text-primary mb-1.5" />
                      <p className="text-xs sm:text-sm font-semibold text-text-primary mb-0.5">{title}</p>
                      <p className="text-[11px] text-text-muted leading-relaxed">{detail}</p>
                    </div>
                  ))}
                </div>
                <p className="text-xs sm:text-sm text-text-secondary">
                  To exercise any of these rights, email{" "}
                  <a href="mailto:hello@xpersivelabs.com" className="text-primary font-medium hover:underline">
                    hello@xpersivelabs.com
                  </a>
                  . We will respond within 30 days.
                </p>
              </LegalNumberedCard>

              <LegalNumberedCard number="12" id="third-party-platforms" title="Third-Party Websites & Services">
                <p className="text-sm sm:text-base text-text-secondary leading-relaxed">
                  Our website may contain links to external websites. Xpersive Labs has no control
                  over the content or privacy practices of those sites and recommends reviewing
                  their privacy policies. We do not use Google Analytics, Facebook Pixel, or any
                  advertising networks on this website.
                </p>
              </LegalNumberedCard>

              <LegalNumberedCard number="13" id="childrens-privacy" title="Children's Privacy">
                <p className="text-sm sm:text-base text-text-secondary leading-relaxed">
                  Our services are directed at businesses and professionals, not individual
                  consumers. We do not knowingly collect personal data from individuals under 18
                  years of age.
                </p>
              </LegalNumberedCard>

              <LegalNumberedCard number="14" id="policy-modifications" title="Changes to This Privacy Policy">
                <p className="text-sm sm:text-base text-text-secondary leading-relaxed">
                  We may update this Privacy Policy from time to time. We will update the
                  &quot;Current Effective Date&quot; at the top of this page when we do.
                  Significant changes will be communicated via a notice on the website.
                </p>
              </LegalNumberedCard>

              <LegalContactCard
                number="15"
                intro="If you have questions about this Privacy Policy or how we handle your personal data, contact us:"
              />

              <div className="flex items-center gap-2 text-sm">
                <WhatsAppIcon size={16} />
                <a
                  href={buildWhatsAppUrl("Hi Xpersive Labs! I have a question about your Privacy Policy.")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary font-semibold hover:underline"
                >
                  Message us on WhatsApp
                </a>
              </div>

              <p className="text-sm">
                <Link href="/cookie-policy" className="text-primary font-semibold hover:underline">
                  Read our Cookie Policy →
                </Link>
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
