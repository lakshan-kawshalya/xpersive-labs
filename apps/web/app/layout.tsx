import type { Metadata } from "next";
import "../styles/globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import CustomCursor from "@/components/layout/CustomCursor";

export const metadata: Metadata = {
  title: {
    default: "Xpersive Labs — Innovation for a Better Tomorrow",
    template: "%s | Xpersive Labs",
  },
  description:
    "Xpersive Labs is a Sri Lankan-based software startup focused on immersive tech experiences. We build cutting-edge web, mobile, and design solutions.",
  keywords: ["software", "web development", "mobile development", "UI/UX design", "Sri Lanka", "Colombo", "immersive tech"],
  authors: [{ name: "Xpersive Labs", url: "https://xpersivelabs.com" }],
  creator: "Xpersive Labs",
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Xpersive Labs",
    title: "Xpersive Labs — Innovation for a Better Tomorrow",
    description:
      "We build cutting-edge web, mobile, and design solutions that drive progress and enhance human experience.",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Xpersive Labs" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Xpersive Labs — Innovation for a Better Tomorrow",
    description: "Sri Lanka's immersive tech studio. We build cutting-edge digital experiences.",
    images: ["/og-image.png"],
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700&family=Syne:wght@700;800&family=JetBrains+Mono&display=swap"
        />
      </head>
      <body className="min-h-screen bg-dark text-white font-sans antialiased flex flex-col">
        <CustomCursor />
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
