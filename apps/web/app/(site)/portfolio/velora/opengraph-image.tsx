import { renderOgImage } from "@/lib/ogImage";

export const alt = "Velora case study";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return renderOgImage({
    kicker: "CASE STUDY",
    headline: "Velora",
    accent: "fashion commerce platform.",
    subtext: "Multi-brand e-commerce, AI size advice and admin management, built in-house.",
    badge: "In-house demo build",
    path: "xpersivelabs.com/portfolio/velora",
  });
}
