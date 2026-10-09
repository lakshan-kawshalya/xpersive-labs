import { renderOgImage } from "@/lib/ogImage";

export const alt = "About Xpersive Labs";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return renderOgImage({
    headline: "Meet the studio",
    accent: "behind the work.",
    subtext: "A software studio founded in 2024 in Colombo, Sri Lanka.",
    badge: "Founded 2024 · Colombo, Sri Lanka",
    path: "xpersivelabs.com/about",
  });
}
