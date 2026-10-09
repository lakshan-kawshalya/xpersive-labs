import type { Metadata } from "next";
import {
  ArrowRight,
  ChevronDown,
  Clock,
  Code2,
  Eye,
  Globe,
  LayoutDashboard,
  Lock,
  MapPin,
  MessageCircle,
  MessageSquare,
  PackageX,
  Ruler,
  RotateCcw,
  ShieldCheck,
  Tag,
  UserX,
  Wrench,
} from "lucide-react";
import EarlyAccessLink from "@/components/ai/EarlyAccessLink";
import IconBox from "@/components/ai/IconBox";
import InfoCard, { CARD_CLASSES } from "@/components/ai/InfoCard";
import ModuleCard from "@/components/ai/ModuleCard";
import Reveal from "@/components/ai/Reveal";
import SectionHeader from "@/components/ai/SectionHeader";

export const metadata: Metadata = {
  title: "Xpersive AI Platform | AI tools for online stores in Sri Lanka",
  description:
    "Add AI features to your online store with one line of code. Size advice, WhatsApp order confirmation and more, built for Sri Lankan and South Asian brands.",
  alternates: { canonical: "https://www.xpersivelabs.com/ai" },
  openGraph: {
    type: "website",
    title: "Xpersive AI Platform | AI tools for online stores in Sri Lanka",
    description: "Add AI features to your online store with one line of code.",
    url: "https://www.xpersivelabs.com/ai",
  },
};

const PROBLEMS = [
  {
    icon: RotateCcw,
    title: "Wrong sizes",
    body: "Customers guess their size, the item comes back, and you pay delivery both ways.",
  },
  {
    icon: PackageX,
    title: "Fake and refused COD orders",
    body: "Parcels go out and come back unpaid, costing courier fees and stock time.",
  },
  {
    icon: MessageCircle,
    title: "Endless size questions",
    body: "Non-stop messages on WhatsApp and Instagram asking what size to take.",
  },
  {
    icon: Globe,
    title: "Tools made for other markets",
    body: "Global tools do not understand local bodies, local couriers, cash on delivery, or how Sri Lankans shop.",
  },
];

const STEPS = [
  { number: "01", title: "Choose your modules", body: "Start with one, add more anytime." },
  {
    number: "02",
    title: "Add one line of code",
    body: "We install it for you, or your developer does it in minutes with our guide.",
  },
  { number: "03", title: "Watch it work", body: "Track results in your Xpersive dashboard." },
];

const COMING_SOON = [
  {
    name: "Atelier Copy",
    body: "Writes product descriptions that sell and rank on Google, in your brand's voice",
  },
  {
    name: "Xpersive Search",
    body: "Smart product search that understands what shoppers mean, including Sinhala and Singlish searches",
  },
  {
    name: "Xpersive Assist",
    body: "An AI shopping assistant that answers customer questions about your products 24/7",
  },
  {
    name: "Atelier Try-On",
    body: "Lets shoppers see how clothes look on them before they buy",
  },
  {
    name: "Xpersive Ship",
    body: "Automatic courier label printing and delivery status updates for your customers",
  },
];

const LOCAL_TILES = [
  {
    icon: MapPin,
    title: "Made for Sri Lanka",
    body: "Cash on delivery, WhatsApp-first customers, local couriers and local body shapes.",
  },
  {
    icon: Code2,
    title: "Works with your current website",
    body: "No rebuild needed. One line of code.",
  },
  {
    icon: Wrench,
    title: "Done for you, or do it yourself",
    body: "We install it, or your developer uses our step-by-step guide.",
  },
  {
    icon: LayoutDashboard,
    title: "One dashboard",
    body: "Every module and every result in one place.",
  },
];

const SECURITY_POINTS = [
  {
    icon: Lock,
    title: "Separated by brand",
    body: "Each brand's data is fully separated from every other brand.",
  },
  {
    icon: ShieldCheck,
    title: "Locked to your website",
    body: "Your access keys only work on the domains you approve.",
  },
  {
    icon: UserX,
    title: "Minimal shopper data",
    body: "We only use what a feature needs. Size advice stores no personal details.",
  },
  {
    icon: Eye,
    title: "Privacy-first by design",
    body: "Built with Sri Lanka's Personal Data Protection Act in mind.",
  },
  {
    icon: Tag,
    title: "Transparent to your shoppers",
    body: "Every module shows a small Powered by Xpersive Labs badge.",
  },
];

const BENEFITS = [
  "Priority access to new modules",
  "Direct support from our team",
  "Founding-brand pricing locked in",
  "Help shape what we build next",
];

const FAQS = [
  { q: "Do I need a new website?", a: "No. It works on your existing site with one line of code." },
  {
    q: "Is it hard to set up?",
    a: "We can install it for you. If you have a developer, it takes minutes with our guide.",
  },
  {
    q: "Does the size advisor need customer photos?",
    a: "No. Shoppers answer a few questions. Photos are not required.",
  },
  {
    q: "Will WhatsApp confirmation annoy my customers?",
    a: "Only risky COD orders get a message, and customers agree to WhatsApp updates at checkout.",
  },
  {
    q: "Which modules can I use now?",
    a: "Atelier Fit and Xpersive Confirm are available through our Early Access program. Others are coming soon.",
  },
  {
    q: "How much does it cost?",
    a: "Pricing depends on the modules and your order volume. Early Access brands get founding pricing. Contact us for details.",
  },
];

const CODE_SNIPPET = `<script src="https://embed.xpersivelabs.com/v1/loader.js"
  data-key="your-key" async></script>
<div data-xpersive="fashion.fit" data-product="YOUR-SKU"></div>`;

const TINT = "bg-[rgba(109,113,249,0.035)]";

export default function AiPlatformPage() {
  return (
    <div className="text-text-primary">
      {/* A. Hero */}
      <section className="relative overflow-hidden pt-40 pb-24">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-32 right-0 h-[500px] w-[500px] rounded-full blur-[130px]"
          style={{ background: "radial-gradient(circle, rgba(109,113,249,0.12) 0%, transparent 70%)" }}
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -left-24 top-1/2 h-[400px] w-[400px] rounded-full blur-[120px]"
          style={{ background: "radial-gradient(circle, rgba(84,193,251,0.14) 0%, transparent 70%)" }}
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-[0.05]"
          style={{
            backgroundImage: "radial-gradient(circle, #6D71F9 1px, transparent 1px)",
            backgroundSize: "36px 36px",
          }}
        />
        <Reveal className="relative z-10 mx-auto flex max-w-4xl flex-col items-center px-6 text-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-[rgba(109,113,249,0.08)] px-4 py-1.5 text-xs font-bold uppercase tracking-[0.2em] text-primary">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-primary" aria-hidden="true" />
            Now accepting pilot brands
          </span>
          <h1 className="mt-6 font-display text-5xl font-bold leading-[1.05] text-text-primary sm:text-6xl lg:text-7xl">
            AI that sells for you.
            <span className="mt-2 block text-gradient">Built for Sri Lankan online stores.</span>
          </h1>
          <p className="mt-6 max-w-[600px] text-lg leading-relaxed text-text-secondary">
            Add smart features to your website with one line of code: size advice that cuts wrong-size orders, and
            WhatsApp confirmation that stops fake cash-on-delivery orders. No new website needed.
          </p>
          <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row">
            <EarlyAccessLink variant="gradient">
              Join Early Access
              <ArrowRight size={17} className="transition-transform duration-200 group-hover:translate-x-1" aria-hidden="true" />
            </EarlyAccessLink>
            <a
              href="#how-it-works"
              className="inline-flex items-center gap-2.5 rounded-full bg-[rgba(109,113,249,0.05)] px-6 py-[14px] text-base font-semibold text-text-primary transition-all hover:bg-[rgba(109,113,249,0.1)] hover:text-primary"
            >
              See how it works
            </a>
          </div>
          <p className="mt-6 text-[13px] text-text-muted">Now accepting a limited number of pilot brands.</p>
        </Reveal>
      </section>

      {/* B. Problem */}
      <section className={`py-24 ${TINT}`}>
        <Reveal className="mx-auto max-w-7xl px-6">
          <SectionHeader
            label="The Problem"
            heading="Selling online in Sri Lanka comes with problems global tools were never built for."
          />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {PROBLEMS.map((problem) => (
              <InfoCard key={problem.title} {...problem} />
            ))}
          </div>
        </Reveal>
      </section>

      {/* C. Solution */}
      <section className="py-24">
        <Reveal className="px-6">
          <SectionHeader label="The Solution" heading="Xpersive AI Platform">
            A set of AI modules your website can use instantly. Pick the ones you need, add one line of code, and
            they work inside your existing site, whether we built it or someone else did.
          </SectionHeader>
        </Reveal>
      </section>

      {/* D. How it works */}
      <section id="how-it-works" className={`scroll-mt-24 py-24 ${TINT}`}>
        <Reveal className="mx-auto max-w-7xl px-6">
          <SectionHeader label="How It Works" heading="Three steps to your first AI feature." />
          <ol className="relative grid gap-6 md:grid-cols-3">
            <div
              aria-hidden="true"
              className="absolute left-[16%] right-[16%] top-14 hidden h-px bg-gradient-to-r from-primary/30 via-accent/40 to-primary/30 md:block"
            />
            {STEPS.map(({ number, title, body }) => (
              <li key={number} className={`relative flex flex-col items-center text-center ${CARD_CLASSES}`}>
                <span className="relative z-10 flex h-12 w-12 items-center justify-center rounded-full bg-gradient-brand font-display text-base font-bold text-white shadow-[0_8px_24px_rgba(109,113,249,0.3)]">
                  {number}
                </span>
                <h3 className="mt-6 font-display text-xl font-bold text-text-primary">{title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-text-secondary">{body}</p>
              </li>
            ))}
          </ol>
        </Reveal>
      </section>

      {/* E. Early access modules */}
      <section className="py-24">
        <Reveal className="mx-auto max-w-7xl px-6">
          <SectionHeader label="Early Access" heading="Available now for pilot brands." />
          <div className="grid gap-6 lg:grid-cols-2">
            <ModuleCard
              icon={Ruler}
              title="Atelier Fit"
              subtitle="AI Size Advisor"
              body="Shoppers answer a few quick questions (height, weight, preferred fit) and get the size that matches your brand's own size chart."
              features={[
                "Works with your existing size charts",
                "Shows two sizes when a shopper is between sizes",
                'Explains the fit, for example "snug at chest"',
                "Being tuned for Sri Lankan and South Asian body shapes",
                "No photos needed, and no personal details stored",
              ]}
              bestFor="Best for: clothing brands that lose money on size exchanges and returns."
            />
            <ModuleCard
              icon={MessageSquare}
              title="Atelier Confirm"
              subtitle="WhatsApp Order Confirmation"
              body="Stop shipping orders that never get paid for. Atelier Confirm checks every cash-on-delivery order for risk and asks risky ones to confirm on WhatsApp before you dispatch."
              features={[
                "Scores each COD order for risk automatically",
                "Only risky orders wait for confirmation",
                "Customers confirm or cancel with one tap on WhatsApp",
                "Customers opt in at checkout, so messages are always welcome",
                "Works for any online store, not just clothing",
              ]}
              bestFor="Best for: any store selling with cash on delivery."
            />
          </div>
        </Reveal>
      </section>

      {/* F. Coming soon */}
      <section className={`py-24 ${TINT}`}>
        <Reveal className="mx-auto max-w-4xl px-6">
          <SectionHeader label="Coming Soon" heading="More modules on the way." />
          <ul className="flex flex-col gap-4">
            {COMING_SOON.map(({ name, body }) => (
              <li key={name} className="flex items-start gap-4 rounded-2xl border border-border-subtle bg-bg-card p-5 shadow-[0_2px_12px_rgba(109,113,249,0.06)] sm:items-center">
                <Clock size={20} className="mt-0.5 shrink-0 text-text-muted sm:mt-0" aria-hidden="true" />
                <div className="grid flex-1 gap-1 sm:grid-cols-[200px_1fr] sm:gap-6">
                  <h3 className="font-display text-base font-bold text-text-primary">{name}</h3>
                  <p className="text-sm leading-relaxed text-text-secondary">{body}</p>
                </div>
              </li>
            ))}
          </ul>
          <p className="mt-8 text-center font-mono text-[13px] text-text-muted">
            Want one of these sooner? <EarlyAccessLink variant="inline">Tell us</EarlyAccessLink>. Pilot brands help
            decide what we build next.
          </p>
        </Reveal>
      </section>

      {/* G. Built for local selling */}
      <section className="py-24">
        <Reveal className="mx-auto max-w-5xl px-6">
          <div className="grid gap-6 sm:grid-cols-2">
            {LOCAL_TILES.map((tile) => (
              <InfoCard key={tile.title} {...tile} />
            ))}
          </div>
        </Reveal>
      </section>

      {/* H. Security and privacy */}
      <section className={`py-24 ${TINT}`}>
        <Reveal className="mx-auto max-w-5xl px-6">
          <SectionHeader label="Security and Privacy" heading="Your data stays yours." />
          <div className="grid gap-6 md:grid-cols-2">
            {SECURITY_POINTS.map(({ icon, title, body }) => (
              <div key={title} className={`flex gap-5 ${CARD_CLASSES}`}>
                <IconBox icon={icon} />
                <div>
                  <h3 className="font-display text-lg font-bold text-text-primary">{title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-text-secondary">{body}</p>
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </section>

      {/* I. For developers */}
      <section className="py-24">
        <Reveal className="mx-auto max-w-3xl px-6">
          <SectionHeader label="For Developers" heading="Add it in minutes.">
            Copy two lines into your site. Your developer can have it running before lunch.
          </SectionHeader>
          <pre
            aria-label="Illustrative embed snippet"
            className="overflow-x-auto rounded-3xl bg-dark-elevated p-6 font-mono text-[13px] leading-relaxed text-accent shadow-[0_8px_40px_rgba(109,113,249,0.12)]"
          >
            <code>{CODE_SNIPPET}</code>
          </pre>
          <p className="mt-4 text-center text-[13px] text-text-muted">
            Use your own product codes. A REST API is available for custom setups. Full documentation provided to
            Early Access brands.
          </p>
        </Reveal>
      </section>

      {/* J. Early access program */}
      <section className={`py-24 ${TINT}`}>
        <Reveal className="mx-auto max-w-4xl px-6">
          <div
            className="relative overflow-hidden rounded-3xl border border-border-subtle p-10 text-center sm:p-16"
            style={{
              background: "linear-gradient(135deg, #FFFFFF 0%, #F1F0FF 55%, #E8E6FF 100%)",
              boxShadow: "0 8px 40px rgba(109,113,249,0.12)",
            }}
          >
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -left-16 -top-16 h-72 w-72 rounded-full blur-[90px]"
              style={{ background: "rgba(84,193,251,0.22)" }}
            />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -bottom-16 -right-16 h-72 w-72 rounded-full blur-[90px]"
              style={{ background: "rgba(109,113,249,0.18)" }}
            />
            <div className="relative z-10">
              <SectionHeader label="Early Access Program" heading="Work with us to shape it.">
                We&apos;re working with a small group of pilot brands to fine-tune each module on real customers.
              </SectionHeader>
              <ul className="mx-auto grid max-w-2xl gap-4 sm:grid-cols-2">
                {BENEFITS.map((benefit) => (
                  <li
                    key={benefit}
                    className="rounded-2xl border border-border-subtle bg-bg-card/80 p-5 text-sm font-semibold text-text-primary backdrop-blur-sm"
                  >
                    {benefit}
                  </li>
                ))}
              </ul>
              <EarlyAccessLink variant="gradient" className="mt-10">
                Apply for Early Access
                <ArrowRight size={17} className="transition-transform duration-200 group-hover:translate-x-1" aria-hidden="true" />
              </EarlyAccessLink>
            </div>
          </div>
        </Reveal>
      </section>

      {/* K. Not just fashion */}
      <section className="py-24">
        <Reveal className="mx-auto max-w-2xl px-6 text-center">
          <h2 className="font-display text-3xl font-bold text-text-primary sm:text-4xl lg:text-5xl">
            Starting with fashion. Built for more.
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-text-secondary">
            We&apos;re starting with fashion and online retail. The platform is built to serve other industries next.
          </p>
          <p className="mt-4 text-sm text-text-secondary">
            Interested in a different industry? <EarlyAccessLink variant="inline">Get in touch.</EarlyAccessLink>
          </p>
        </Reveal>
      </section>

      {/* L. FAQ */}
      <section className={`py-24 ${TINT}`}>
        <Reveal className="mx-auto max-w-3xl px-6">
          <SectionHeader label="FAQ" heading="Common questions." />
          <div className="flex flex-col gap-4">
            {FAQS.map(({ q, a }) => (
              <details
                key={q}
                className="group overflow-hidden rounded-2xl border border-border-subtle bg-bg-card shadow-sm transition-colors duration-300 open:border-primary/35 hover:border-primary/20"
              >
                <summary className="flex cursor-pointer list-none items-center justify-between gap-3 p-6 font-display text-lg font-bold text-text-primary sm:p-8 [&::-webkit-details-marker]:hidden">
                  {q}
                  <ChevronDown
                    size={20}
                    className="shrink-0 text-text-muted transition-transform duration-200 group-open:rotate-180 group-open:text-primary"
                    aria-hidden="true"
                  />
                </summary>
                <p className="px-6 pb-6 leading-relaxed text-text-secondary sm:px-8 sm:pb-8">{a}</p>
              </details>
            ))}
          </div>
        </Reveal>
      </section>

      {/* M. Final CTA */}
      <section className="py-24">
        <Reveal className="mx-auto max-w-4xl px-6">
          <div
            className="relative flex flex-col items-center overflow-hidden rounded-3xl border border-border-subtle p-12 text-center sm:p-20"
            style={{
              background: "linear-gradient(135deg, #FFFFFF 0%, #F1F0FF 55%, #E8E6FF 100%)",
              boxShadow: "0 8px 40px rgba(109,113,249,0.12)",
            }}
          >
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -left-16 -top-16 h-72 w-72 rounded-full blur-[90px]"
              style={{ background: "rgba(84,193,251,0.22)" }}
            />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -bottom-16 -right-16 h-72 w-72 rounded-full blur-[90px]"
              style={{ background: "rgba(109,113,249,0.18)" }}
            />
            <div className="relative z-10 flex flex-col items-center">
              <h2 className="mb-4 font-display text-4xl font-extrabold leading-[1.05] text-text-primary sm:text-5xl">
                Ready to add AI to your store?
              </h2>
              <p className="mb-10 max-w-xl text-lg leading-relaxed text-text-secondary">
                Join a small group of Sri Lankan brands using AI to sell smarter.
              </p>
              <EarlyAccessLink variant="gradient" className="px-10 py-4">
                Join Early Access
                <ArrowRight size={17} className="transition-transform duration-200 group-hover:translate-x-1" aria-hidden="true" />
              </EarlyAccessLink>
              <p className="mt-6 text-sm text-text-muted">
                Or email us at{" "}
                <a href="mailto:hello@xpersivelabs.com" className="underline underline-offset-4 transition-colors hover:text-primary">
                  hello@xpersivelabs.com
                </a>
              </p>
            </div>
          </div>
        </Reveal>
      </section>
    </div>
  );
}
