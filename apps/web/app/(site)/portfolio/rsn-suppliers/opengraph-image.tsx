import { renderOgImage } from "@/lib/ogImage";

export const alt = "RSN Suppliers case study";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return renderOgImage({
    kicker: "CASE STUDY",
    headline: "RSN Suppliers",
    accent: "operations system.",
    subtext: "Replacing paper-based workflows with alias search, per-client pricing and PO-to-invoice tracking.",
    badge: "Business management system",
    path: "xpersivelabs.com/portfolio/rsn-suppliers",
  });
}
