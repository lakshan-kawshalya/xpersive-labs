import Link from "next/link";

const quickLinks = [
  { href: "/services", label: "Services" },
  { href: "/about", label: "About" },
  { href: "/portfolio", label: "Recent Work" },
];

export default function RootNotFound() {
  return (
    <html lang="en">
      <body style={{ margin: 0, background: "#272848" }}>
        <div
          style={{
            minHeight: "100vh",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
            padding: "0 1.5rem",
            fontFamily: "sans-serif",
            color: "#fff",
          }}
        >
          <span
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem",
              padding: "0.4rem 0.9rem",
              borderRadius: "9999px",
              background: "rgba(109,113,249,0.15)",
              border: "1px solid rgba(109,113,249,0.35)",
              marginBottom: "1.5rem",
            }}
          >
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#6D71F9" }} />
            <span
              style={{
                fontSize: "0.75rem",
                fontWeight: 700,
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                color: "#A5A8FC",
              }}
            >
              404 — Page Not Found
            </span>
          </span>

          <p
            style={{
              fontSize: "6rem",
              fontWeight: 700,
              lineHeight: 1,
              background: "linear-gradient(135deg, #6D71F9, #54C1FB)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              margin: 0,
            }}
          >
            404
          </p>

          <h1 style={{ fontSize: "1.75rem", fontWeight: 700, marginTop: "1rem", marginBottom: "0.75rem" }}>
            Looks like this page took a wrong turn.
          </h1>

          <p style={{ color: "rgba(255,255,255,0.5)", maxWidth: 420, lineHeight: 1.6, marginBottom: "2rem" }}>
            The page you&apos;re looking for doesn&apos;t exist or has been moved. Let&apos;s get you back on
            track.
          </p>

          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "0.875rem",
              justifyContent: "center",
              marginBottom: "2rem",
            }}
          >
            <Link
              href="/"
              style={{
                display: "inline-flex",
                alignItems: "center",
                padding: "0.875rem 1.75rem",
                borderRadius: "9999px",
                fontWeight: 600,
                fontSize: "0.875rem",
                color: "#fff",
                background: "linear-gradient(135deg, #6D71F9, #54C1FB)",
                textDecoration: "none",
              }}
            >
              Go Back Home
            </Link>
            <Link
              href="/contact"
              style={{
                display: "inline-flex",
                alignItems: "center",
                padding: "0.875rem 1.75rem",
                borderRadius: "9999px",
                fontWeight: 600,
                fontSize: "0.875rem",
                color: "#fff",
                border: "1.5px solid rgba(255,255,255,0.2)",
                textDecoration: "none",
              }}
            >
              Contact Us
            </Link>
          </div>

          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              alignItems: "center",
              justifyContent: "center",
              gap: "0.5rem",
              fontSize: "0.75rem",
              color: "rgba(255,255,255,0.4)",
            }}
          >
            <span>Or quick jump to:</span>
            {quickLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                style={{
                  padding: "0.3rem 0.75rem",
                  borderRadius: "9999px",
                  border: "1px solid rgba(255,255,255,0.12)",
                  color: "rgba(255,255,255,0.6)",
                  textDecoration: "none",
                }}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </body>
    </html>
  );
}
