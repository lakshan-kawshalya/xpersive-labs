"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, Clock, ArrowRight, Tag } from "lucide-react";
import { format } from "date-fns";
import { fadeUp, staggerContainer } from "@/lib/animations";
import { useMotionSafe } from "@/hooks/useMotionSafe";
import type { PostMeta } from "@/lib/blog";

const ALL = "All";

interface BlogListProps {
  posts: PostMeta[];
  allTags: string[];
}

export default function BlogList({ posts, allTags }: BlogListProps) {
  const [activeTag, setActiveTag] = useState<string>(ALL);
  const { shouldAnimate } = useMotionSafe();

  const filtered = useMemo(
    () =>
      activeTag === ALL
        ? posts
        : posts.filter((p) => p.tags.includes(activeTag)),
    [activeTag, posts]
  );

  const showFilter = posts.length >= 6;

  return (
    <>
      {/* ── Tag filter ──────────────────────────────────────────── */}
      {showFilter && <div className="sticky top-16 z-30 bg-[rgba(248,249,255,0.85)] backdrop-blur-md border-b border-border-subtle py-4">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center gap-2 flex-wrap">
            {[ALL, ...allTags].map((tag) => (
              <button
                key={tag}
                onClick={() => setActiveTag(tag)}
                className={`relative px-5 py-2 rounded-full text-sm font-semibold transition-all duration-200 ${
                  activeTag === tag
                    ? "text-white"
                    : "text-text-muted hover:text-text-primary"
                }`}
              >
                {activeTag === tag && (
                  shouldAnimate ? (
                    <motion.span
                      layoutId="blog-pill"
                      className="absolute inset-0 rounded-full bg-primary"
                      transition={{ type: "spring", stiffness: 350, damping: 28 }}
                    />
                  ) : (
                    <span className="absolute inset-0 rounded-full bg-primary" />
                  )
                )}
                <span className="relative z-10">{tag}</span>
              </button>
            ))}

            <span className="ml-auto text-xs text-text-muted font-medium">
              {filtered.length} post{filtered.length !== 1 ? "s" : ""}
            </span>
          </div>
        </div>
      </div>}

      {/* ── Post grid ───────────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-6 py-14">
        <AnimatePresence mode="popLayout">
          <motion.div
            key={activeTag}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            {...(shouldAnimate ? {
              variants: staggerContainer,
              initial: "hidden",
              animate: "visible",
              exit: { opacity: 0, transition: { duration: 0.12 } },
            } : { initial: false, animate: false })}
          >
            {filtered.map((post) => (
              <PostCard key={post.slug} post={post} />
            ))}
          </motion.div>
        </AnimatePresence>

        {filtered.length === 0 && (
          <motion.p
            {...(shouldAnimate ? {
              initial: { opacity: 0 },
              animate: { opacity: 1 },
            } : { initial: false })}
            className="text-center py-24 text-text-muted text-lg font-medium"
          >
            No posts with this tag yet.
          </motion.p>
        )}
      </div>
    </>
  );
}

/* ─── PostCard ───────────────────────────────────────────────────────── */

function PostCard({ post }: { post: PostMeta }) {
  const formattedDate = format(new Date(post.date), "MMM d, yyyy");
  const { shouldAnimate } = useMotionSafe();

  return (
    <motion.article
      {...(shouldAnimate ? { variants: fadeUp, layout: true } : { initial: false })}
      className="group relative flex flex-col rounded-2xl border border-border-subtle bg-bg-card hover:border-primary/25 overflow-hidden transition-colors duration-300"
      style={{ boxShadow: "0 2px 12px rgba(109,113,249,0.06)" }}
    >
      {/* Top accent line */}
      <div className="h-px w-full bg-gradient-to-r from-primary via-accent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      <div className="p-7 flex flex-col flex-1">
        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-5">
          {post.tags.map((tag) => (
            <span
              key={tag}
              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-primary/10 border border-primary/15 text-primary text-xs font-semibold"
            >
              <Tag size={9} />
              {tag}
            </span>
          ))}
        </div>

        {/* Title */}
        <Link href={`/blog/${post.slug}`}>
          <h2 className="font-display text-lg font-bold leading-snug mb-3 text-text-primary group-hover:text-primary transition-colors duration-200 line-clamp-2">
            {post.title}
          </h2>
        </Link>

        {/* Description */}
        <p className="text-text-secondary text-sm leading-relaxed line-clamp-3 flex-1 mb-6">
          {post.description}
        </p>

        {/* Meta + CTA */}
        <div className="flex items-center justify-between pt-5 border-t border-border-subtle">
          <div className="flex items-center gap-4 text-text-muted text-xs">
            <span className="flex items-center gap-1.5">
              <Calendar size={11} />
              {formattedDate}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock size={11} />
              {post.readingTime} min read
            </span>
          </div>

          <Link
            href={`/blog/${post.slug}`}
            className="inline-flex items-center gap-1 text-xs font-semibold text-primary opacity-0 group-hover:opacity-100 transition-opacity duration-200"
          >
            Read
            <ArrowRight size={12} />
          </Link>
        </div>
      </div>
    </motion.article>
  );
}
