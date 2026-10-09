import { renderOgImage, type OgContent } from "@/lib/ogImage";

export const alt = "Xpersive Labs case study";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Only slugs without their own static route (see portfolio/alibaba-scraper, rsn-suppliers, velora).
const CARDS: Record<string, OgContent> = {
  "raj-ceylon": {
    kicker: "CASE STUDY",
    headline: "Raj Ceylon Tours",
    accent: "luxury tourism site.",
    subtext: "Built for an international, high-intent audience across three languages.",
    badge: "Live in production",
    path: "xpersivelabs.com/portfolio/raj-ceylon",
  },
};

export function generateStaticParams() {
  return Object.keys(CARDS).map((slug) => ({ slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return renderOgImage(CARDS[slug]);
}
