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
    default: "Xpersive Labs | Software Studio — Websites, Mobile, Automation",
    template: "%s | Xpersive Labs",
  },
  description:
    "Boutique software studio in Colombo, Sri Lanka. Websites, mobile apps, custom software, automation, and UI/UX design for businesses in AU, UK, US, and Europe. Direct engineer access - no handoffs.",
  keywords: [
    "Next.js development studio",
    "custom web application development",
    "mobile app development studio",
    "web development agency AU UK US",
    "boutique software studio",
    "automation development",
    "UI/UX design studio",
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
    title: "Xpersive Labs | Software Studio",
    description:
      "Websites, mobile apps, custom software, automation, and UI/UX design. Direct engineer access from brief to launch. Serving AU, UK, US, and Europe.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Xpersive Labs | Software Studio",
    description:
      "Websites, mobile apps, custom software, automation, and UI/UX design for businesses in AU, UK, US, and Europe.",
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
                "Boutique software studio building websites, mobile apps, custom software, automation, and UI/UX design for businesses in AU, UK, US, and Europe.",
              "address": {
                "@type": "PostalAddress",
                "addressLocality": "Colombo",
                "addressCountry": "LK"
              },
              "email": "hello@xpersivelabs.com",
              "areaServed": ["AU", "GB", "US", "EU"],
              "serviceType": [
                "Website Development",
                "Mobile Application Development",
                "Software Development",
                "Automation Development",
                "UI/UX Development"
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
