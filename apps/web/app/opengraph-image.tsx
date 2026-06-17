import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Xpersive Labs - White-Label Data Pipelines for Agencies";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "1200px",
          height: "630px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "#272848",
          fontFamily: "sans-serif",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Background gradient orbs */}
        <div
          style={{
            position: "absolute",
            width: "600px",
            height: "600px",
            background: "radial-gradient(circle, rgba(109,113,249,0.3) 0%, transparent 70%)",
            top: "-200px",
            left: "-100px",
            borderRadius: "50%",
          }}
        />
        <div
          style={{
            position: "absolute",
            width: "400px",
            height: "400px",
            background: "radial-gradient(circle, rgba(84,193,251,0.2) 0%, transparent 70%)",
            bottom: "-100px",
            right: "-50px",
            borderRadius: "50%",
          }}
        />

        {/* Content */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "16px",
            position: "relative",
          }}
        >
          <div
            style={{
              fontSize: "72px",
              fontWeight: "800",
              color: "white",
              letterSpacing: "-2px",
            }}
          >
            Xpersive Labs
          </div>

          <div
            style={{
              fontSize: "28px",
              fontWeight: "400",
              color: "#8b8ffa",
            }}
          >
            We Scrape. You Deliver.
          </div>

          <div
            style={{
              width: "80px",
              height: "2px",
              background: "linear-gradient(90deg, #6D71F9, #54C1FB)",
              borderRadius: "1px",
              marginTop: "8px",
            }}
          />

          <div
            style={{
              fontSize: "20px",
              color: "rgba(255,255,255,0.5)",
              marginTop: "8px",
              letterSpacing: "0.05em",
            }}
          >
            Web Dev · Data Pipelines · Automation
          </div>

          <div
            style={{
              fontSize: "18px",
              color: "rgba(109,113,249,0.8)",
              marginTop: "4px",
            }}
          >
            xpersivelabs.com
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
