import { renderOgImage } from "@/lib/ogImage";

export const alt = "Xpersive Labs: Web Development Studio";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return renderOgImage({
    headline: "We Build.",
    accent: "You Scale.",
    subtext: "Web Development · Automation · AI Workflows",
    badge: "Available for projects · Colombo, Sri Lanka",
    path: "xpersivelabs.com",
  });
}
