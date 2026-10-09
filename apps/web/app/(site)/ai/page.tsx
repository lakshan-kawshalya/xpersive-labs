import type { Metadata } from "next";
import {
  ArrowRight,
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
import InfoCard from "@/components/ai/InfoCard";
import ModuleCard from "@/components/ai/ModuleCard";
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

export default function AiPlatformPage() {
  return (
    <>
      {/* A. Hero */}
      <section className="relative overflow-hidden bg-dark px-6 pb-24 pt-36 text-center sm:pt-44">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -left-32 -top-24 h-[480px] w-[480px] rounded-full bg-primary/30 blur-[100px]"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-24 top-1/3 h-[420px] w-[420px] rounded-full bg-accent/20 blur-[100px]"
        />
        <div className="relative z-10 mx-auto max-w-4xl">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-accent px-3 py-1 text-[11px] font-medium text-accent">
            <span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden="true" />
            Now accepting pilot brands
          </span>
          <h1 className="mt-8 font-display text-4xl font-bold leading-[1.1] text-white sm:text-6xl lg:text-7xl">
            AI that sells for you.
            <span className="mt-2 block text-gradient">Built for Sri Lankan online stores.</span>
          </h1>
          <p className="mx-auto mt-6 max-w-[600px] text-base leading-relaxed text-white/70 sm:text-lg">
            Add smart features to your website with one line of code: size advice that cuts wrong-size orders, and
            WhatsApp confirmation that stops fake cash-on-delivery orders. No new website needed.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <EarlyAccessLink variant="gradient">
              Join Early Access <ArrowRight size={16} aria-hidden="true" />
            </EarlyAccessLink>
            <a
              href="#how-it-works"
              className="inline-flex items-center justify-center rounded-full border border-white/30 px-7 py-3.5 text-sm font-semibold text-white transition-colors duration-200 hover:border-white/60 hover:bg-white/10"
            >
              See how it works
            </a>
          </div>
          <p className="mt-6 text-[13px] text-white/55">Now accepting a limited number of pilot brands.</p>
        </div>
      </section>

      {/* B. Problem */}
      <section className="bg-bg px-6 py-24">
        <div className="mx-auto max-w-6xl">
          <SectionHeader
            label="The Problem"
            heading="Selling online in Sri Lanka comes with problems global tools were never built for."
          />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {PROBLEMS.map(({ icon: Icon, title, body }) => (
              <div key={title} className="rounded-2xl border border-border-subtle bg-bg-card p-6 shadow-sm">
                <span className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <Icon size={22} aria-hidden="true" />
                </span>
                <h3 className="font-display text-lg font-bold text-text-primary">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-text-secondary">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* C. Solution */}
      <section className="bg-bg px-6 pb-24">
        <SectionHeader label="The Solution" heading="Xpersive AI Platform">
          A set of AI modules your website can use instantly. Pick the ones you need, add one line of code, and they
          work inside your existing site, whether we built it or someone else did.
        </SectionHeader>
      </section>

      {/* D. How it works */}
      <section id="how-it-works" className="scroll-mt-24 bg-bg px-6 pb-24">
        <div className="mx-auto max-w-6xl">
          <SectionHeader label="How It Works" heading="Three steps to your first AI feature." />
          <ol className="relative grid gap-8 md:grid-cols-3">
            <div
              aria-hidden="true"
              className="absolute left-[16%] right-[16%] top-7 hidden h-px bg-gradient-to-r from-primary/40 via-accent/40 to-primary/40 md:block"
            />
            {STEPS.map(({ number, title, body }) => (
              <li key={number} className="relative flex flex-col items-center text-center">
                <span className="relative z-10 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-brand font-display text-lg font-bold text-white shadow-[0_8px_24px_rgba(109,113,249,0.3)]">
                  {number}
                </span>
                <h3 className="mt-5 font-display text-xl font-bold text-text-primary">{title}</h3>
                <p className="mt-2 max-w-xs text-sm leading-relaxed text-text-secondary">{body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* E. Early access modules */}
      <section className="bg-dark px-6 py-24">
        <div className="mx-auto max-w-6xl">
          <SectionHeader label="Early Access" heading="Available now for pilot brands." tone="dark" />
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
              title="Xpersive Confirm"
              subtitle="WhatsApp Order Confirmation"
              body="Stop shipping orders that never get paid for. Xpersive Confirm checks every cash-on-delivery order for risk and asks risky ones to confirm on WhatsApp before you dispatch."
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
        </div>
      </section>

      {/* F. Coming soon */}
      <section className="bg-bg px-6 py-24">
        <div className="mx-auto max-w-4xl">
          <SectionHeader label="Coming Soon" heading="More modules on the way." />
          <ul className="flex flex-col gap-3">
            {COMING_SOON.map(({ name, body }) => (
              <li
                key={name}
                className="flex items-start gap-4 rounded-2xl border border-border-subtle bg-bg-card p-5 shadow-sm sm:items-center"
              >
                <Clock size={20} className="mt-0.5 shrink-0 text-text-muted sm:mt-0" aria-hidden="true" />
                <div className="grid flex-1 gap-1 sm:grid-cols-[200px_1fr] sm:gap-6">
                  <h3 className="font-display text-base font-bold text-text-primary">{name}</h3>
                  <p className="text-sm leading-relaxed text-text-secondary">{body}</p>
                </div>
              </li>
            ))}
          </ul>
          <p className="mt-8 text-center text-sm text-text-secondary">
            Want one of these sooner? <EarlyAccessLink variant="inline">Tell us</EarlyAccessLink>. Pilot brands help
            decide what we build next.
          </p>
        </div>
      </section>

      {/* G. Built for local selling */}
      <section className="bg-bg px-6 pb-24">
        <div className="mx-auto grid max-w-4xl gap-5 sm:grid-cols-2">
          {LOCAL_TILES.map((tile) => (
            <InfoCard key={tile.title} {...tile} />
          ))}
        </div>
      </section>

      {/* H. Security and privacy */}
      <section className="bg-dark px-6 py-24">
        <div className="mx-auto max-w-5xl">
          <SectionHeader label="Security and Privacy" heading="Your data stays yours." tone="dark" />
          <div className="grid gap-5 md:grid-cols-2">
            {SECURITY_POINTS.map((point) => (
              <InfoCard key={point.title} tone="dark" {...point} />
            ))}
          </div>
        </div>
      </section>

      {/* I. For developers */}
      <section className="bg-bg px-6 py-24">
        <div className="mx-auto max-w-3xl">
          <SectionHeader label="For Developers" heading="Add it in minutes.">
            Copy two lines into your site. Your developer can have it running before lunch.
          </SectionHeader>
          <pre
            aria-label="Illustrative embed snippet"
            className="overflow-x-auto rounded-2xl bg-dark-elevated p-6 font-mono text-[13px] leading-relaxed text-accent shadow-lg"
          >
            <code>{CODE_SNIPPET}</code>
          </pre>
          <p className="mt-4 text-center text-[13px] text-text-muted">
            Use your own product codes. A REST API is available for custom setups. Full documentation provided to
            Early Access brands.
          </p>
        </div>
      </section>

      {/* J. Early access program */}
      <section className="bg-gradient-brand px-6 py-24 text-center">
        <div className="mx-auto max-w-4xl">
          <SectionHeader label="Early Access Program" heading="Work with us to shape it." tone="onGradient">
            We&apos;re working with a small group of pilot brands to fine-tune each module on real customers.
          </SectionHeader>
          <ul className="mx-auto grid max-w-2xl gap-4 sm:grid-cols-2">
            {BENEFITS.map((benefit) => (
              <li
                key={benefit}
                className="rounded-2xl border border-white/25 bg-white/15 p-5 text-sm font-semibold text-white backdrop-blur-md"
              >
                {benefit}
              </li>
            ))}
          </ul>
          <EarlyAccessLink variant="white" className="mt-10">
            Apply for Early Access <ArrowRight size={16} aria-hidden="true" />
          </EarlyAccessLink>
        </div>
      </section>

      {/* K. Not just fashion */}
      <section className="bg-bg px-6 py-20 text-center">
        <div className="mx-auto max-w-2xl">
          <h2 className="font-display text-3xl font-bold text-text-primary sm:text-4xl">
            Starting with fashion. Built for more.
          </h2>
          <p className="mt-4 text-base leading-relaxed text-text-secondary">
            We&apos;re starting with fashion and online retail. The platform is built to serve other industries next.
          </p>
          <p className="mt-4 text-sm text-text-secondary">
            Interested in a different industry? <EarlyAccessLink variant="inline">Get in touch.</EarlyAccessLink>
          </p>
        </div>
      </section>

      {/* L. FAQ */}
      <section className="bg-bg px-6 pb-24">
        <div className="mx-auto max-w-3xl">
          <SectionHeader label="FAQ" heading="Common questions." />
          <div className="flex flex-col gap-4">
            {FAQS.map(({ q, a }) => (
              <details
                key={q}
                className="group rounded-2xl border border-border-subtle bg-bg-card shadow-sm transition-colors open:border-primary/35"
              >
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 p-6 font-display text-lg font-bold text-text-primary [&::-webkit-details-marker]:hidden">
                  {q}
                  <span
                    aria-hidden="true"
                    className="text-xl font-normal text-primary transition-transform duration-200 group-open:rotate-45"
                  >
                    +
                  </span>
                </summary>
                <p className="px-6 pb-6 leading-relaxed text-text-secondary">{a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* M. Final CTA */}
      <section className="bg-dark px-6 py-24 text-center">
        <div className="mx-auto max-w-2xl">
          <h2 className="font-display text-4xl font-bold text-white sm:text-5xl">Ready to add AI to your store?</h2>
          <p className="mt-5 text-base leading-relaxed text-white/70 sm:text-lg">
            Join a small group of Sri Lankan brands using AI to sell smarter.
          </p>
          <EarlyAccessLink variant="gradient" className="mt-10">
            Join Early Access <ArrowRight size={16} aria-hidden="true" />
          </EarlyAccessLink>
          <p className="mt-6 text-sm text-white/55">
            Or email us at{" "}
            <a href="mailto:hello@xpersivelabs.com" className="underline underline-offset-4 hover:text-white">
              hello@xpersivelabs.com
            </a>
          </p>
        </div>
      </section>
    </>
  );
}
