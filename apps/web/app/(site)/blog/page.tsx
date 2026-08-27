import { getAllPosts } from "@/lib/blog";
import BlogList from "@/components/blog/BlogList";
import OpenBookIllustration from "@/components/illustrations/OpenBookIllustration";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "E-Commerce and Automation Insights",
  description:
    "Insights on Alibaba data tools, FBA automation, web development, and UI/UX design from the Xpersive Labs team in Colombo, Sri Lanka.",
  alternates: { canonical: "https://www.xpersivelabs.com/blog" },
  openGraph: { type: "website", url: "https://www.xpersivelabs.com/blog" },
};

export default async function BlogPage() {
  const posts = await getAllPosts();
  const allTags = Array.from(new Set(posts.flatMap((p) => p.tags))).sort();

  return (
    <div className="text-text-primary min-h-screen">
      {/* ── Hero ────────────────────────────────────────────────── */}
      <section className="relative pt-40 pb-16 overflow-hidden">
        {/* Orbs */}
        <div
          className="absolute -top-24 right-1/4 w-[420px] h-[420px] rounded-full blur-[120px] pointer-events-none"
          style={{
            background:
              "radial-gradient(circle, rgba(109,113,249,0.1) 0%, transparent 70%)",
          }}
        />
        <div
          className="absolute bottom-0 left-0 w-[300px] h-[300px] rounded-full blur-[100px] pointer-events-none"
          style={{
            background:
              "radial-gradient(circle, rgba(84,193,251,0.08) 0%, transparent 70%)",
          }}
        />
        <div
          className="absolute inset-0 opacity-[0.05] pointer-events-none"
          style={{
            backgroundImage:
              "radial-gradient(circle, #6D71F9 1px, transparent 1px)",
            backgroundSize: "36px 36px",
          }}
        />

        <OpenBookIllustration className="hidden lg:block absolute top-36 right-10 w-[120px] h-[90px] pointer-events-none" />

        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <span className="inline-block text-primary text-xs font-bold uppercase tracking-[0.2em] mb-5">
            Insights &amp; Ideas
          </span>
          <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl font-bold leading-[1.05] mb-6 text-text-primary">
            Our <span className="text-gradient">Blog</span>
          </h1>
          <p className="text-text-secondary text-lg sm:text-xl leading-relaxed max-w-2xl">
            Practical writing on web development, mobile engineering, design
            systems, and the craft of building software that lasts.
          </p>
        </div>
      </section>

      {/* ── Client: filter + grid ───────────────────────────────── */}
      <BlogList posts={posts} allTags={allTags} />
    </div>
  );
}
