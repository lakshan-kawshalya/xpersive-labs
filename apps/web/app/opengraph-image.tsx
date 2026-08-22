import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Xpersive Labs — Web Development Studio";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#12122A",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          fontFamily: "sans-serif",
          position: "relative",
        }}
      >
        {/* Background glow */}
        <div
          style={{
            position: "absolute",
            top: -100,
            right: -100,
            width: 500,
            height: 500,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(109,113,249,0.3) 0%, transparent 70%)",
          }}
        />

        {/* Logo / brand */}
        <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 40 }}>
          <div
            style={{
              width: 48,
              height: 48,
              borderRadius: 12,
              background: "linear-gradient(135deg, #6D71F9, #54C1FB)",
            }}
          />
          <span style={{ color: "rgba(255,255,255,0.7)", fontSize: 24, fontWeight: 600 }}>
            Xpersive Labs
          </span>
        </div>

        {/* Headline */}
        <div
          style={{
            fontSize: 72,
            fontWeight: 800,
            color: "white",
            lineHeight: 1.05,
            marginBottom: 24,
          }}
        >
          We Build.{" "}
          <span style={{ color: "#6D71F9" }}>You Scale.</span>
        </div>

        {/* Subtext */}
        <div style={{ fontSize: 28, color: "rgba(255,255,255,0.55)", marginBottom: 48 }}>
          Web Development · Automation · AI Workflows
        </div>

        {/* Badge */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            padding: "10px 20px",
            borderRadius: 999,
            background: "rgba(109,113,249,0.15)",
            border: "1px solid rgba(109,113,249,0.3)",
            width: "fit-content",
          }}
        >
          <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#10B981" }} />
          <span style={{ color: "rgba(255,255,255,0.7)", fontSize: 18 }}>
            Available for projects · Colombo, Sri Lanka
          </span>
        </div>
      </div>
    ),
    { ...size }
  );
}
