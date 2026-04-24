import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, ExternalLink, Calendar, Tag } from "lucide-react";

/* ─── Types ─────────────────────────────────────────────────────────── */

interface ProjectDetail {
  slug: string;
  title: string;
  category: string;
  tags: string[];
  year: string;
  gradient: string;
  summary: string;
  challenge: string;
  solution: string;
  result: string;
  tech: string[];
  liveUrl?: string;
}

/* ─── Data ──────────────────────────────────────────────────────────── */

const projects: ProjectDetail[] = [
  {
    slug: "healthsync",
    title: "HealthSync Platform",
    category: "Web",
    tags: ["Web App", "React", "Next.js", "PostgreSQL"],
    year: "2024",
    gradient: "from-[#6D71F9] via-violet-500 to-[#54C1FB]",
    summary:
      "A comprehensive healthcare management platform serving clinics and hospitals with real-time data sync, AI-powered diagnostics, and a patient-facing portal.",
    challenge:
      "The client — a growing healthcare network — was managing patient records across three disconnected systems. Staff spent hours reconciling data, errors were common, and patients had no visibility into their own care. They needed a unified platform that could handle HIPAA-compliant data, real-time collaboration between clinicians, and a consumer-grade patient experience.",
    solution:
      "We architected a multi-tenant Next.js application with a PostgreSQL database managed through Prisma, deployed on AWS with row-level security policies enforcing data isolation between clinic accounts. A real-time sync layer using WebSockets keeps clinician dashboards live. The patient portal is a separate Next.js app sharing the same API, with a clean, accessible UI designed for low-tech-literacy users.",
    result:
      "Onboarded 3 clinic locations within the first month. Staff data-entry time dropped by 60%. Patient portal adoption hit 78% within 8 weeks of launch. Zero data incidents in the first year of operation.",
    tech: ["Next.js", "React", "TypeScript", "PostgreSQL", "Prisma", "AWS RDS", "WebSockets", "Tailwind CSS", "Vercel"],
  },
  {
    slug: "tradeflow",
    title: "TradeFlow Mobile",
    category: "Mobile",
    tags: ["Mobile", "React Native", "TypeScript", "Firebase"],
    year: "2024",
    gradient: "from-[#54C1FB] via-sky-400 to-cyan-300",
    summary:
      "Cross-platform trading app for retail investors with live market feeds, portfolio analytics, real-time push alerts, and an intuitive trade execution flow.",
    challenge:
      "An early-stage fintech startup had a web-only product that was losing mobile users to competitors. Their existing web experience was not designed for thumb-first navigation, and the performance on mobile browsers was poor. They needed a native-feeling app shipped simultaneously for iOS and Android within a tight timeline.",
    solution:
      "We built a React Native application with Expo for the development workflow and OTA update capability. Market data is streamed via WebSocket from their existing API. We used React Query for server state with optimistic updates on trade execution, giving the UI instant feedback. Firebase handles push notifications with topic-based subscriptions for watchlist alerts.",
    result:
      "Shipped to both app stores within 10 weeks. Within 3 months, 65% of active users migrated from web to mobile. App Store rating: 4.7★. Average session time 2.4× longer than the web equivalent.",
    tech: ["React Native", "Expo", "TypeScript", "React Query", "Firebase", "Redux Toolkit", "Reanimated 3", "WebSockets"],
  },
  {
    slug: "lumina-ds",
    title: "Lumina Design System",
    category: "Design",
    tags: ["Design System", "Figma", "UI/UX", "Accessibility"],
    year: "2023",
    gradient: "from-purple-600 via-[#6D71F9] to-pink-500",
    summary:
      "A cohesive, accessible design language powering 5+ enterprise products, with a Figma library and a React component library published to npm.",
    challenge:
      "The client's product suite had grown organically over 4 years, leaving them with 5 products that each had their own visual language, inconsistent spacing systems, and untested accessibility. New feature development was slow because designers and engineers were solving the same UI problems repeatedly in each product.",
    solution:
      "We ran a 2-week design audit across all 5 products, cataloguing every unique component, spacing value, and colour usage. From that foundation we built a token-based Figma library — starting from colour and typography primitives — then composed those into a full component library. Each component was built in React with Storybook, tested to WCAG 2.1 AA, and published as a versioned npm package.",
    result:
      "New feature UI time cut by 45% in the first quarter post-adoption. Accessibility compliance went from partial to full WCAG 2.1 AA across all products. Design–dev handoff time reduced from days to hours.",
    tech: ["Figma", "React", "TypeScript", "Storybook", "Chromatic", "Radix UI", "CSS Modules", "npm"],
  },
  {
    slug: "edunest",
    title: "EduNest LMS",
    category: "Web",
    tags: ["Web App", "Next.js", "Prisma", "AWS"],
    year: "2024",
    gradient: "from-emerald-500 via-teal-500 to-[#54C1FB]",
    summary:
      "Full-featured learning management system with video streaming, adaptive quizzes, certificate generation, and instructor analytics dashboards.",
    challenge:
      "An EdTech startup needed to launch an LMS that could handle video-heavy courses, support hundreds of concurrent learners, and give instructors rich analytics — without breaking their seed-round budget on infrastructure.",
    solution:
      "We built a Next.js App Router application with a multi-role auth system (learner, instructor, admin). Video delivery uses AWS CloudFront + S3 with adaptive bitrate streaming. Quizzes are stored as JSON in PostgreSQL, graded server-side. PDF certificates are generated on-demand using a Puppeteer Lambda function. Instructor dashboards use real-time aggregations with incremental static regeneration for performance.",
    result:
      "Launched with 400+ enrolled learners on day one. Video load time under 2 seconds globally. Instructor NPS score of 72 after first cohort. Infrastructure costs 60% below initial estimates.",
    tech: ["Next.js", "TypeScript", "PostgreSQL", "Prisma", "AWS S3", "CloudFront", "Lambda", "Puppeteer", "Tailwind CSS"],
  },
  {
    slug: "wanderly",
    title: "Wanderly Travel App",
    category: "Mobile",
    tags: ["Mobile", "React Native", "Expo", "AI"],
    year: "2025",
    gradient: "from-orange-500 via-amber-400 to-yellow-300",
    summary:
      "AI-assisted travel planner with offline maps, drag-and-drop itinerary builder, local recommendations, and real-time flight and hotel prices.",
    challenge:
      "The founder had a clear vision: a travel app that felt like a knowledgeable local friend, not a booking engine. The core challenge was making AI suggestions feel contextual and personal — not generic — while keeping the app fast and functional in regions with poor connectivity.",
    solution:
      "Itinerary data is stored locally using SQLite via Expo SQLite, with selective sync to the server. Map tiles for popular regions are bundled at install time. AI recommendations are generated via a fine-tuned model on the backend, with results cached per-destination so repeat queries feel instant. The drag-and-drop itinerary UI uses Reanimated 3 gestures for fluid, native-feeling interactions.",
    result:
      "4.8★ on App Store at launch. Featured by Apple in the Travel category for 2 weeks. Offline mode used by 34% of sessions. Average trip planned: 7.2 days of detailed itinerary.",
    tech: ["React Native", "Expo", "TypeScript", "SQLite", "Reanimated 3", "OpenAI API", "MapLibre", "Supabase"],
  },
  {
    slug: "nova-brand",
    title: "Nova Brand Identity",
    category: "Design",
    tags: ["Branding", "UI/UX", "Figma", "Product Design"],
    year: "2023",
    gradient: "from-rose-500 via-pink-500 to-[#6D71F9]",
    summary:
      "End-to-end brand identity and product design for a B2B fintech startup — logo, brand guidelines, and a complete product design system delivered over 6 weeks.",
    challenge:
      "Nova was preparing for their Series A raise and needed to look the part. They had a product but no brand. Their target buyers — CFOs at mid-market companies — needed to trust them instantly. The design had to be sophisticated without being cold, modern without being trendy.",
    solution:
      "We started with positioning workshops to align the team on brand personality. The visual identity — wordmark, icon, colour system, and type scale — was developed over 3 rounds of refinement with stakeholder input at each gate. We then extended the brand into a full product UI, designing the core flows in Figma with a component library ready for engineering handoff.",
    result:
      "Pitch deck featuring the new brand received strong investor feedback during the Series A round. Engineering team built the product UI in 40% less time than estimated, citing the quality of the Figma handoff. Brand recognised at a regional fintech showcase.",
    tech: ["Figma", "Adobe Illustrator", "Framer", "Notion", "Zeplin", "Maze", "Lottie"],
  },
];

/* ─── Helpers ────────────────────────────────────────────────────────── */

function getProject(slug: string): ProjectDetail | undefined {
  return projects.find((p) => p.slug === slug);
}

function getAllSlugs(): string[] {
  return projects.map((p) => p.slug);
}

/* ─── Static params (SSG) ────────────────────────────────────────────── */

export function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

/* ─── Page ──────────────────────────────────────────────────────────── */

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProject(slug);

  if (!project) notFound();

  const allSlugs = getAllSlugs();
  const currentIndex = allSlugs.indexOf(slug);
  const nextSlug = allSlugs[currentIndex + 1] ?? null;
  const prevSlug = allSlugs[currentIndex - 1] ?? null;
  const nextProject = nextSlug ? getProject(nextSlug) : null;

  return (
    <div className="bg-dark text-white">
      {/* ── Hero image area ──────────────────────────────────────── */}
      <section className="relative pt-24 overflow-hidden">
        <div
          className={`w-full h-[55vh] min-h-[380px] max-h-[600px] bg-gradient-to-br ${project.gradient} relative overflow-hidden`}
        >
          {/* Texture */}
          <div
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,0.3) 1px, transparent 1px), linear-gradient(to right, rgba(255,255,255,0.3) 1px, transparent 1px)",
              backgroundSize: "32px 32px",
            }}
          />
          <div
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage:
                "radial-gradient(circle at 30% 70%, rgba(255,255,255,0.3) 0%, transparent 50%), radial-gradient(circle at 70% 20%, rgba(255,255,255,0.2) 0%, transparent 45%)",
            }}
          />
          {/* Gradient fade to dark at bottom */}
          <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-dark to-transparent" />
        </div>
      </section>

      {/* ── Content ──────────────────────────────────────────────── */}
      <section className="relative z-10 -mt-16 pb-24">
        <div className="max-w-4xl mx-auto px-6">
          {/* Back link */}
          <Link
            href="/portfolio"
            className="inline-flex items-center gap-2 text-sm text-white/40 hover:text-white/80 transition-colors mb-10"
          >
            <ArrowLeft size={15} />
            Back to Portfolio
          </Link>

          {/* Title + meta */}
          <div className="mb-12">
            <div className="flex flex-wrap items-center gap-3 mb-5">
              <span className="px-3 py-1 rounded-full bg-primary/15 border border-primary/20 text-primary text-xs font-bold uppercase tracking-wider">
                {project.category}
              </span>
              <span className="flex items-center gap-1.5 text-white/35 text-xs font-medium">
                <Calendar size={12} />
                {project.year}
              </span>
            </div>

            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6">
              {project.title}
            </h1>

            <p className="text-white/60 text-lg leading-relaxed mb-7">
              {project.summary}
            </p>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-7">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/[0.05] border border-white/10 text-xs text-white/55 font-medium"
                >
                  <Tag size={10} />
                  {tag}
                </span>
              ))}
            </div>

            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline"
              >
                <ExternalLink size={14} />
                View Live Site
              </a>
            )}
          </div>

          {/* Divider */}
          <div className="border-t border-white/[0.07] mb-12" />

          {/* Challenge / Solution / Result */}
          <div className="space-y-12">
            <CaseBlock
              number="01"
              label="The Challenge"
              color="text-rose-400"
              bg="bg-rose-500/10"
              body={project.challenge}
            />
            <CaseBlock
              number="02"
              label="Our Solution"
              color="text-primary"
              bg="bg-primary/10"
              body={project.solution}
            />
            <CaseBlock
              number="03"
              label="The Result"
              color="text-accent"
              bg="bg-accent/10"
              body={project.result}
            />
          </div>

          {/* Divider */}
          <div className="border-t border-white/[0.07] my-12" />

          {/* Tech stack */}
          <div>
            <p className="text-xs text-white/30 uppercase tracking-widest font-semibold mb-5">
              Tech Stack
            </p>
            <div className="flex flex-wrap gap-2.5">
              {project.tech.map((t) => (
                <span
                  key={t}
                  className="px-4 py-2 rounded-xl bg-white/[0.04] border border-white/10 text-sm text-white/70 font-medium hover:border-primary/30 hover:text-white transition-colors duration-200"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Next project + CTA ───────────────────────────────────── */}
      <section className="border-t border-white/[0.07] py-16">
        <div className="max-w-4xl mx-auto px-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-8">
            {/* Prev */}
            <div>
              {prevSlug && getProject(prevSlug) && (
                <Link
                  href={`/portfolio/${prevSlug}`}
                  className="group inline-flex items-center gap-2 text-sm text-white/40 hover:text-white transition-colors"
                >
                  <ArrowLeft
                    size={15}
                    className="group-hover:-translate-x-1 transition-transform duration-200"
                  />
                  <span>
                    <span className="block text-xs text-white/25 uppercase tracking-widest mb-0.5">
                      Previous
                    </span>
                    {getProject(prevSlug)!.title}
                  </span>
                </Link>
              )}
            </div>

            {/* CTA */}
            <Link
              href="/contact"
              className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full font-bold text-white text-sm transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-primary/25"
              style={{ background: "linear-gradient(135deg, #6D71F9, #54C1FB)" }}
            >
              Start Your Project
              <ArrowRight size={15} />
            </Link>

            {/* Next */}
            <div className="text-right">
              {nextProject && (
                <Link
                  href={`/portfolio/${nextSlug}`}
                  className="group inline-flex items-center gap-2 text-sm text-white/40 hover:text-white transition-colors"
                >
                  <span>
                    <span className="block text-xs text-white/25 uppercase tracking-widest mb-0.5">
                      Next
                    </span>
                    {nextProject.title}
                  </span>
                  <ArrowRight
                    size={15}
                    className="group-hover:translate-x-1 transition-transform duration-200"
                  />
                </Link>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

/* ─── CaseBlock ──────────────────────────────────────────────────────── */

function CaseBlock({
  number,
  label,
  color,
  bg,
  body,
}: {
  number: string;
  label: string;
  color: string;
  bg: string;
  body: string;
}) {
  return (
    <div className="flex gap-6">
      <div className="flex-shrink-0">
        <div
          className={`w-10 h-10 rounded-xl ${bg} flex items-center justify-center`}
        >
          <span className={`font-display text-xs font-bold ${color}`}>{number}</span>
        </div>
      </div>
      <div className="flex-1 pt-1.5">
        <p className={`text-xs font-bold uppercase tracking-[0.2em] ${color} mb-3`}>
          {label}
        </p>
        <p className="text-white/60 leading-[1.85] text-base">{body}</p>
      </div>
    </div>
  );
}
