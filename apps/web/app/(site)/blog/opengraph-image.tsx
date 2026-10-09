import { renderOgImage } from "@/lib/ogImage";

export const alt = "Xpersive Labs blog";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return renderOgImage({
    headline: "Insights on",
    accent: "e-commerce and automation.",
    subtext: "From the Xpersive Labs team in Colombo, Sri Lanka.",
    badge: "The Xpersive blog",
    path: "xpersivelabs.com/blog",
  });
}
