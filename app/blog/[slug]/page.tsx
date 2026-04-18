import { notFound } from "next/navigation";
import Link from "next/link";
import { MDXRemote } from "next-mdx-remote/rsc";
import { format } from "date-fns";
import { ArrowLeft, ArrowRight, Calendar, Clock, Tag } from "lucide-react";
import { getPostBySlug, getAllSlugs, getAllPosts } from "@/lib/blog";
import type { Metadata } from "next";

/* ─── Static params (SSG) ────────────────────────────────────────────── */

export function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

/* ─── Metadata ───────────────────────────────────────────────────────── */

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};
  return {
    title: `${post.title} — Xpersive Labs Blog`,
    description: post.description,
  };
}

/* ─── Page ──────────────────────────────────────────────────────────── */

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const formattedDate = format(new Date(post.date), "MMMM d, yyyy");

  /* Adjacent posts for prev/next nav */
  const allPosts = getAllPosts();
  const idx = allPosts.findIndex((p) => p.slug === slug);
  const prevPost = idx < allPosts.length - 1 ? allPosts[idx + 1] : null;
  const nextPost = idx > 0 ? allPosts[idx - 1] : null;

  return (
    <div className="bg-dark text-white min-h-screen">
      {/* ── Header band ──────────────────────────────────────────── */}
      <section className="relative pt-36 pb-14 overflow-hidden border-b border-white/[0.07]">
        {/* Orb */}
        <div
          className="absolute -top-20 left-1/2 -translate-x-1/2 w-[500px] h-[300px] rounded-full blur-[100px] pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse, rgba(109,113,249,0.22) 0%, transparent 70%)",
          }}
        />
        <div
          className="absolute inset-0 opacity-[0.04] pointer-events-none"
          style={{
            backgroundImage:
              "radial-gradient(circle, #6D71F9 1px, transparent 1px)",
            backgroundSize: "36px 36px",
          }}
        />

        <div className="relative z-10 max-w-3xl mx-auto px-6">
          {/* Back link */}
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm text-white/40 hover:text-white/75 transition-colors mb-9"
          >
            <ArrowLeft size={14} />
            Back to Blog
          </Link>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-6">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold"
              >
                <Tag size={9} />
                {tag}
              </span>
            ))}
          </div>

          {/* Title */}
          <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight mb-6">
            {post.title}
          </h1>

          {/* Description */}
          <p className="text-white/55 text-lg leading-relaxed mb-8">
            {post.description}
          </p>

          {/* Meta */}
          <div className="flex items-center gap-5 text-white/35 text-sm">
            <span className="flex items-center gap-1.5">
              <Calendar size={13} />
              {formattedDate}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock size={13} />
              {post.readingTime} min read
            </span>
          </div>
        </div>
      </section>

      {/* ── MDX body ─────────────────────────────────────────────── */}
      <section className="py-14">
        <div className="max-w-3xl mx-auto px-6">
          <div className="mdx-prose">
            <MDXRemote source={post.content} />
          </div>
        </div>
      </section>

      {/* ── Prev / Next nav ──────────────────────────────────────── */}
      <section className="border-t border-white/[0.07] py-12">
        <div className="max-w-3xl mx-auto px-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            {prevPost ? (
              <Link
                href={`/blog/${prevPost.slug}`}
                className="group flex items-center gap-3 text-white/40 hover:text-white transition-colors max-w-xs"
              >
                <ArrowLeft
                  size={16}
                  className="flex-shrink-0 group-hover:-translate-x-1 transition-transform duration-200"
                />
                <span>
                  <span className="block text-xs text-white/25 uppercase tracking-widest mb-0.5">
                    Older
                  </span>
                  <span className="text-sm font-medium line-clamp-1">
                    {prevPost.title}
                  </span>
                </span>
              </Link>
            ) : (
              <div />
            )}

            {nextPost && (
              <Link
                href={`/blog/${nextPost.slug}`}
                className="group flex items-center gap-3 text-white/40 hover:text-white transition-colors text-right max-w-xs ml-auto"
              >
                <span>
                  <span className="block text-xs text-white/25 uppercase tracking-widest mb-0.5">
                    Newer
                  </span>
                  <span className="text-sm font-medium line-clamp-1">
                    {nextPost.title}
                  </span>
                </span>
                <ArrowRight
                  size={16}
                  className="flex-shrink-0 group-hover:translate-x-1 transition-transform duration-200"
                />
              </Link>
            )}
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────────── */}
      <section className="border-t border-white/[0.07] py-16">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <p className="text-white/35 text-sm mb-2 uppercase tracking-widest font-semibold">
            Like what you read?
          </p>
          <h2 className="font-display text-2xl sm:text-3xl font-bold mb-6">
            Let&apos;s build something together.
          </h2>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2.5 px-8 py-4 rounded-full font-bold text-white transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-primary/25"
            style={{ background: "linear-gradient(135deg, #6D71F9, #54C1FB)" }}
          >
            Start a Project
            <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </div>
  );
}
