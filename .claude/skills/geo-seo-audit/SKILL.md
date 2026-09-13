---
name: geo-seo-audit
description: Audit apps/web for traditional SEO, Answer Engine Optimization (AEO), and Generative Engine Optimization (GEO) — how discoverable and citable the site is in Google search, and in AI answer surfaces like ChatGPT, Perplexity, and Google AI Overviews. Use when asked to audit, improve, or check SEO/AEO/GEO, or before publishing new pages/blog posts.
---

# SEO / AEO / GEO audit — Xpersive Labs marketing site

Three related but distinct goals. Check all three — they reinforce each other,
but optimizing only for one (usually classic SEO) leaves real ground on the
table for the other two.

- **SEO** — rank in traditional search results.
- **AEO (Answer Engine Optimization)** — get pulled into a direct-answer box
  (Google's featured snippets, voice assistants) by structuring content as
  clear question → direct answer.
- **GEO (Generative Engine Optimization)** — get cited or paraphrased by
  generative AI systems (ChatGPT, Perplexity, Claude, Google AI Overviews)
  when they answer a user's question. This is closer to "would an LLM want to
  quote this paragraph verbatim" than to keyword density.

## 1. Traditional SEO checklist

Repo already has the bones — verify they stay correct as pages are added:

- `app/sitemap.ts` — every public route present, no orphaned pages, no stale
  entries for removed routes.
- `app/robots.ts` — correctly allows public routes, disallows `/keystatic`
  and `/api/*` (the CMS admin surface should never be crawlable, on top of
  being auth-gated — see the `security-audit` skill).
- Every page under `app/(site)/` exports `metadata` (or `generateMetadata`
  for dynamic routes like `blog/[slug]`, `portfolio/[slug]`) with a unique
  `title`, `description`, and `alternates.canonical`. Grep for pages missing
  this: `grep -L "generateMetadata\|export const metadata" app/(site)/**/*.tsx`.
- `app/opengraph-image.tsx` — OG image renders correctly per-route where it
  matters (blog posts, portfolio case studies should have distinct OG images,
  not just the site default).
- Internal linking: does every new page get linked from somewhere crawlable
  (nav, footer, a related-content block), not just reachable via the sitemap?
- Core Web Vitals feed into SEO ranking directly — cross-check with the
  `performance-reviewer` subagent rather than treating this as a separate
  concern.

## 2. AEO — structuring for direct-answer extraction

For each page, especially blog posts and service pages:

- Does the page answer its core question in the **first 1-2 sentences** of
  the relevant section, before elaboration? Answer engines extract the most
  direct nearby text, not the most eloquent.
- Are FAQs marked up with `FAQPage` JSON-LD where they exist? Check
  `components/seo/JsonLd.tsx` usages — currently used for `Organization` /
  `Article` schema; consider whether a given page's content warrants
  `FAQPage` or `HowTo` schema too.
- Headings (`h1`/`h2`/`h3`) should read as the actual questions a prospect
  would ask ("How much does a Next.js site cost?" beats "Our Pricing
  Philosophy") — this is what both classic snippet extraction and AEO
  crawlers pattern-match against.
- Lists and tables extract better than prose for comparison content (pricing
  tiers, service comparisons, process steps) — the existing `nextSteps` /
  service-option patterns in `app/(site)/contact/page.tsx` are a good
  template for this.

## 3. GEO — citability by generative AI

This is newer ground and less tooled than SEO — apply judgment, not a
mechanical checklist:

- **Self-contained paragraphs.** An LLM quoting a snippet needs it to make
  sense without surrounding context. Avoid "as mentioned above" / "see the
  next section" — each paragraph should stand alone as a citable claim.
- **Specific, checkable claims over vague marketing language.** "We reduced
  manual research time by 8-10 hours/week" (see the Alibaba case study
  content) is far more likely to get cited than "we deliver exceptional
  results." Concrete numbers, named technologies, and named outcomes are
  what generative engines pull into synthesized answers.
- **`llms.txt`** — a plain-text file at the site root (`public/llms.txt`)
  summarizing what the company does, its key pages, and how to contact it,
  written for an LLM to ingest directly. This repo doesn't have one yet —
  worth adding since it's a near-zero-cost, directly-targeted GEO signal.
  Structure: company one-liner, list of key pages with one-sentence
  descriptions, contact info, canonical URL.
- **Structured data completeness.** GEO systems lean on schema.org markup
  more heavily than classic SEO does as a disambiguation signal — the
  existing `Organization` schema in `app/layout.tsx` and per-page `Article`
  schema are good; consider whether `Service` schema on `app/(site)/services`
  and `Review`/`AggregateRating` on the portfolio case studies would help.
- **Authoritative attribution.** Author bylines, publish dates, and update
  dates on blog content (already present per `PostMeta.date`) help generative
  engines weight recency and trust — verify these are actually rendered
  visibly on the page, not just in metadata.

## Live verification

Use the Playwright MCP server to actually load pages and check:
- Rendered `<title>`/meta description match what was intended (not truncated,
  not templated wrong).
- JSON-LD blocks are present and valid (paste into
  [Google's Rich Results Test](https://search.google.com/test/rich-results)
  or validate the JSON structurally).
- No console errors that would prevent a crawler's JS-rendering pass from
  completing.

Use `context7` for current guidance on Next.js 16's metadata API and
structured-data helpers if anything here conflicts with what's actually
available in the installed version.

## Report format

When auditing, report findings grouped by SEO / AEO / GEO (not by page), each
with the specific page/file, what's missing or wrong, and the concrete fix —
matching the severity-ranked style used by the `security-audit` skill's
findings reports.
