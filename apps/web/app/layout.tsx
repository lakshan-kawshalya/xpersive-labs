import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "../styles/globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.xpersivelabs.com"),
  title: {
    default: "Xpersive Labs | E-Commerce Data Tools and Web Development",
    template: "%s | Xpersive Labs",
  },
  description:
    "Xpersive Labs builds custom Alibaba supplier intelligence tools, FBA product research automation, and web applications for Amazon sellers, importers, and digital agencies. Based in Colombo, serving AU, UK, and US.",
  keywords: [
    "Alibaba supplier tools",
    "FBA product research automation",
    "Amazon seller tools",
    "e-commerce data automation",
    "web scraping Alibaba",
    "FBA research tool",
    "white-label web development",
    "e-commerce automation Sri Lanka",
    "supplier intelligence tool",
    "Amazon FBA automation",
    "Alibaba scraper",
    "FBA seller tools AU UK US",
  ],
  authors: [{ name: "Lakshan Kawshalya", url: "https://www.xpersivelabs.com" }],
  creator: "Xpersive Labs",
  publisher: "Xpersive Labs",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://www.xpersivelabs.com",
    siteName: "Xpersive Labs",
    title: "Xpersive Labs | E-Commerce Data Tools and Web Development",
    description:
      "Custom Alibaba data tools, FBA product research automation, and web development for Amazon sellers and digital agencies. Built in Sri Lanka, serving AU, UK, and US.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Xpersive Labs - E-Commerce Data Tools and Web Development",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Xpersive Labs | E-Commerce Data Tools and Web Development",
    description:
      "Custom Alibaba supplier tools, FBA product research automation, and white-label web development for agencies in AU, UK, and US.",
    images: ["/og-image.png"],
  },
  alternates: {
    canonical: "https://www.xpersivelabs.com",
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
  },
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
          rel="preload"
          href="https://fonts.gstatic.com/s/syne/v22/8vIS7w4qzmVxsWxjBZRjr0FKM_04uQ.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700&family=Syne:wght@700;800&family=JetBrains+Mono&display=swap"
        />
      </head>
      <body className="min-h-screen bg-dark text-white font-sans antialiased flex flex-col">
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
