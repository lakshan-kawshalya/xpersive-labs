import { renderOgImage } from "@/lib/ogImage";

export const alt = "Xpersive AI Platform";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return renderOgImage({
    kicker: "XPERSIVE AI PLATFORM",
    headline: "AI that sells",
    accent: "for you.",
    subtext: "Size advice and WhatsApp order confirmation for Sri Lankan stores.",
    badge: "Now accepting pilot brands",
    path: "xpersivelabs.com/ai",
  });
}
