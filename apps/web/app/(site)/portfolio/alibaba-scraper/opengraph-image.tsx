import { renderOgImage } from "@/lib/ogImage";

export const alt = "Alibaba supplier intelligence platform case study";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return renderOgImage({
    kicker: "CASE STUDY",
    headline: "Alibaba supplier",
    accent: "intelligence platform.",
    subtext: "Replaced 8 to 10 hours of manual weekly research with a daily automated pipeline.",
    badge: "Automation",
    path: "xpersivelabs.com/portfolio/alibaba-scraper",
  });
}
