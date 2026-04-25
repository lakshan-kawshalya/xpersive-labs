import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Admin Panel — Xpersive Labs",
    template: "%s | Xpersive Labs Admin",
  },
  description: "Internal admin panel for managing clients, projects, and team.",
  robots: { index: false, follow: false },
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
      <body className="min-h-screen bg-dark text-white font-sans antialiased">
        {children}
      </body>
    </html>
  );
}
