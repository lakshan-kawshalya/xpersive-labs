import { renderOgImage } from "@/lib/ogImage";

export const alt = "Xpersive Labs portfolio";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return renderOgImage({
    headline: "Selected work",
    accent: "from our studio.",
    subtext: "Web applications, automation pipelines and ecommerce builds.",
    badge: "Case studies",
    path: "xpersivelabs.com/portfolio",
  });
}
