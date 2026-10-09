import { getAllSlugs, getPostBySlug } from "@/lib/blog";
import { renderOgImage } from "@/lib/ogImage";

export const alt = "Xpersive Labs blog post";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const MAX_SUBTEXT_CHARS = 85;

function truncate(text: string, max: number): string {
  if (text.length <= max) return text;
  const cut = text.slice(0, max);
  const lastSpace = cut.lastIndexOf(" ");
  return `${cut.slice(0, lastSpace > 0 ? lastSpace : max).trimEnd()}…`;
}

export async function generateStaticParams() {
  const slugs = await getAllSlugs();
  return slugs.map((slug) => ({ slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  return renderOgImage({
    kicker: "BLOG",
    headline: post?.title ?? "Xpersive Labs blog",
    subtext: truncate(post?.description ?? "Insights from the Xpersive Labs team.", MAX_SUBTEXT_CHARS),
    badge: post?.tags[0] ?? "Insights",
    path: `xpersivelabs.com/blog/${slug}`,
  });
}
