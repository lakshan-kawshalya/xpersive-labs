import { createReader } from "@keystatic/core/reader";
import Markdoc from "@markdoc/markdoc";
import keystaticConfig from "../keystatic.config";

const reader = createReader(process.cwd(), keystaticConfig);

export interface PostMeta {
  slug: string;
  title: string;
  date: string;
  description: string;
  tags: string[];
  readingTime: number;
}

export interface Post extends PostMeta {
  contentHtml: string;
}

function wordCount(html: string): number {
  return html.replace(/<[^>]+>/g, " ").split(/\s+/).filter(Boolean).length;
}

export async function getAllPosts(): Promise<PostMeta[]> {
  const entries = await reader.collections.posts.all();
  return entries
    .filter((e) => e.entry.publishedDate !== null)
    .map((e) => ({
      slug: e.slug,
      title: e.entry.title,
      date: e.entry.publishedDate as string,
      description: e.entry.description ?? "",
      tags: (e.entry.tags as string[]) ?? [],
      readingTime: 3,
    }))
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  const entry = await reader.collections.posts.read(slug);
  if (!entry) return null;

  const { node } = await entry.content();
  const transformed = Markdoc.transform(node, {});
  const contentHtml = Markdoc.renderers.html(transformed);

  return {
    slug,
    title: entry.title,
    date: entry.publishedDate ?? "",
    description: entry.description ?? "",
    tags: (entry.tags as string[]) ?? [],
    readingTime: Math.max(1, Math.ceil(wordCount(contentHtml) / 200)),
    contentHtml,
  };
}

export async function getAllSlugs(): Promise<string[]> {
  return reader.collections.posts.list();
}
