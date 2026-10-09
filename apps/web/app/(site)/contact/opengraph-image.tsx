import { renderOgImage } from "@/lib/ogImage";

export const alt = "Start a project with Xpersive Labs";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return renderOgImage({
    headline: "Let's build something",
    accent: "that matters.",
    subtext: "Tell us what you need. No commitment, no sales pitch.",
    badge: "Start a project",
    path: "xpersivelabs.com/contact",
  });
}
