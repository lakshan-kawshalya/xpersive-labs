import { readFile } from "node:fs/promises";
import path from "node:path";
import { ImageResponse } from "next/og";

const SYNE_BOLD_URL = "https://fonts.gstatic.com/s/syne/v24/8vIS7w4qzmVxsWxjBZRjr0FKM_3fvj6k.ttf";
const OG_SIZE = { width: 1200, height: 630 };
const LOGO_PATH = path.join(process.cwd(), "public", "logo", "brandmark.svg");
const LOGO_SIZE = 60;

async function loadLogoDataUri(): Promise<string> {
  const svg = await readFile(LOGO_PATH);
  return `data:image/svg+xml;base64,${svg.toString("base64")}`;
}

export interface OgContent {
  /** Small outlined tag next to the brand name, e.g. "PARTNER PROGRAM". */
  kicker?: string;
  headline: string;
  accent: string;
  subtext: string;
  badge: string;
  path: string;
}

/** Shared 1200x630 brand card for every page-level Open Graph image. */
export async function renderOgImage({ kicker, headline, accent, subtext, badge, path }: OgContent) {
  const [syneBold, logoSrc] = await Promise.all([
    fetch(SYNE_BOLD_URL).then((res) => res.arrayBuffer()),
    loadLogoDataUri(),
  ]);

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
        <div
          style={{
            position: "absolute",
            top: -100,
            right: -100,
            width: 560,
            height: 560,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(109,113,249,0.32) 0%, transparent 70%)",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: -180,
            left: -120,
            width: 520,
            height: 520,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(84,193,251,0.18) 0%, transparent 70%)",
          }}
        />

        <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 36 }}>
          {/* eslint-disable-next-line @next/next/no-img-element -- ImageResponse renders plain <img> */}
          <img src={logoSrc} width={LOGO_SIZE} height={LOGO_SIZE} alt="" />
          <span style={{ color: "rgba(255,255,255,0.75)", fontSize: 26, fontWeight: 600 }}>Xpersive Labs</span>
          {kicker && (
            <span
              style={{
                marginLeft: 12,
                padding: "6px 16px",
                borderRadius: 999,
                border: "1px solid rgba(84,193,251,0.5)",
                color: "#54C1FB",
                fontSize: 18,
                letterSpacing: 3,
              }}
            >
              {kicker}
            </span>
          )}
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            fontFamily: "Syne",
            fontSize: 84,
            fontWeight: 800,
            lineHeight: 1.05,
            marginBottom: 28,
          }}
        >
          <span style={{ color: "white" }}>{headline}</span>
          <span style={{ color: "#6D71F9" }}>{accent}</span>
        </div>

        <div style={{ fontSize: 32, lineHeight: 1.35, color: "rgba(255,255,255,0.7)", maxWidth: 1040, marginBottom: 44 }}>
          {subtext}
        </div>

        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              padding: "12px 24px",
              borderRadius: 999,
              background: "rgba(109,113,249,0.15)",
              border: "1px solid rgba(109,113,249,0.35)",
            }}
          >
            <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#10B981" }} />
            <span style={{ color: "rgba(255,255,255,0.85)", fontSize: 22 }}>{badge}</span>
          </div>
          <span style={{ color: "rgba(255,255,255,0.5)", fontSize: 22 }}>{path}</span>
        </div>
      </div>
    ),
    {
      ...OG_SIZE,
      fonts: [{ name: "Syne", data: syneBold, weight: 700 }],
    },
  );
}
