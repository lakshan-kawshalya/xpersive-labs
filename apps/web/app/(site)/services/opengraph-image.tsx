import { renderOgImage } from "@/lib/ogImage";

export const alt = "Xpersive Labs Services";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return renderOgImage({
    headline: "Our services,",
    accent: "built end-to-end.",
    subtext: "Websites, mobile apps, custom software, automation and UI/UX. No handoffs.",
    badge: "Five focused services",
    path: "xpersivelabs.com/services",
  });
}
