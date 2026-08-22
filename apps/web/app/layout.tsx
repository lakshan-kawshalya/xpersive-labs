import type { Metadata } from "next";
import { DM_Sans, Syne, JetBrains_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import Script from "next/script";
import "../styles/globals.css";

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  display: "swap",
});

const syne = Syne({
  subsets: ["latin"],
  weight: ["700", "800"],
  variable: "--font-syne",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.xpersivelabs.com"),
  title: {
    default: "Xpersive Labs | White-Label Scraping Pipelines for Digital Agencies",
    template: "%s | Xpersive Labs",
  },
  description:
    "White-label scraping pipelines built for digital marketing and SEO agencies. Managed data delivery with a 48-hour fix guarantee. Serving agencies in AU, UK, and US.",
  keywords: [
    "white-label web scraping",
    "SEO agency automation",
    "digital marketing agency scraping",
    "custom scraping pipeline",
    "agency white-label automation",
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
    title: "Xpersive Labs | White-Label Scraping Pipelines for Digital Agencies",
    description:
      "White-label scraping pipelines and managed data delivery for digital marketing and SEO agencies. 48-hour fix guarantee. Serving agencies in AU, UK, and US.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Xpersive Labs | White-Label Scraping Pipelines for Digital Agencies",
    description:
      "White-label scraping pipelines for digital agencies. Managed data delivery, 48-hour fix guarantee, serving AU, UK, and US.",
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
    <html lang="en" className={`${dmSans.variable} ${syne.variable} ${jetbrainsMono.variable}`}>
      <body className="min-h-screen bg-dark text-white font-sans antialiased flex flex-col">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-9999 focus:px-4 focus:py-2 focus:rounded-full focus:bg-primary focus:text-white focus:text-sm focus:font-semibold"
        >
          Skip to main content
        </a>
        <Script
          id="schema-org"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "ProfessionalService",
              "name": "Xpersive Labs",
              "url": "https://www.xpersivelabs.com",
              "logo": "https://www.xpersivelabs.com/logo/brandmark.svg",
              "description":
                "Boutique software studio building web applications, automation pipelines, and AI workflows for businesses in AU, UK, and US.",
              "address": {
                "@type": "PostalAddress",
                "addressLocality": "Colombo",
                "addressCountry": "LK"
              },
              "email": "hello@xpersivelabs.com",
              "areaServed": ["AU", "GB", "US"],
              "serviceType": [
                "Web Application Development",
                "Ecommerce Development",
                "Automation & Data Pipelines",
                "AI Workflow Integration"
              ],
              "sameAs": [
                "https://github.com/Xpersive-Labs",
                "https://www.linkedin.com/in/xpersive-labs/"
              ]
            }),
          }}
        />
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
