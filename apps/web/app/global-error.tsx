"use client";

import { useEffect } from "react";

interface GlobalErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function GlobalError({ error, reset }: GlobalErrorProps) {
  useEffect(() => {
    console.error(error);
  }, [error]);

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
          <p
            style={{
              fontSize: "8rem",
              fontWeight: 700,
              lineHeight: 1,
              background: "linear-gradient(135deg, #6D71F9, #54C1FB)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              margin: 0,
            }}
          >
            500
          </p>

          <h1 style={{ fontSize: "1.75rem", fontWeight: 700, marginTop: "1rem", marginBottom: "0.5rem" }}>
            Critical Error
          </h1>

          <p style={{ color: "rgba(255,255,255,0.5)", marginBottom: "2rem" }}>
            The application encountered a critical error. Please reload to continue.
          </p>

          <button
            type="button"
            onClick={reset}
            style={{
              display: "inline-flex",
              alignItems: "center",
              padding: "0.875rem 1.75rem",
              borderRadius: "9999px",
              fontWeight: 600,
              fontSize: "0.875rem",
              color: "#fff",
              background: "linear-gradient(135deg, #6D71F9, #54C1FB)",
              border: "none",
              cursor: "pointer",
            }}
          >
            Reload
          </button>
        </div>
      </body>
    </html>
  );
}
