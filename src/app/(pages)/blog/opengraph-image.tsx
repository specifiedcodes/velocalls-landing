import { ImageResponse } from "next/og";

export const runtime = "nodejs";

export const alt = "VeloCalls Blog";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          padding: "60px",
          background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
          fontFamily: "Inter, sans-serif",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Decorative circles */}
        <div
          style={{
            position: "absolute",
            top: "-100px",
            right: "-100px",
            width: "350px",
            height: "350px",
            borderRadius: "50%",
            background: "rgba(255, 255, 255, 0.08)",
            display: "flex",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "-140px",
            left: "-80px",
            width: "450px",
            height: "450px",
            borderRadius: "50%",
            background: "rgba(255, 255, 255, 0.05)",
            display: "flex",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: "200px",
            right: "100px",
            width: "150px",
            height: "150px",
            borderRadius: "50%",
            background: "rgba(255, 255, 255, 0.04)",
            display: "flex",
          }}
        />

        {/* Logo */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "14px",
            marginBottom: "40px",
          }}
        >
          <div
            style={{
              width: "52px",
              height: "52px",
              borderRadius: "12px",
              background: "rgba(255, 255, 255, 0.2)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "28px",
              fontWeight: 800,
              color: "white",
            }}
          >
            V
          </div>
          <span
            style={{
              fontSize: "36px",
              fontWeight: 700,
              color: "white",
              letterSpacing: "-0.5px",
            }}
          >
            VeloCalls
          </span>
        </div>

        {/* Title */}
        <div
          style={{
            fontSize: "60px",
            fontWeight: 800,
            color: "white",
            letterSpacing: "-1.5px",
            marginBottom: "20px",
            display: "flex",
          }}
        >
          VeloCalls Blog
        </div>

        {/* Tagline */}
        <div
          style={{
            fontSize: "24px",
            color: "rgba(255, 255, 255, 0.75)",
            textAlign: "center",
            maxWidth: "700px",
            lineHeight: 1.4,
            fontWeight: 400,
            display: "flex",
          }}
        >
          {"Insights, guides, and industry news on call tracking & pay-per-call"}
        </div>

        {/* Bottom URL */}
        <div
          style={{
            position: "absolute",
            bottom: "40px",
            fontSize: "20px",
            color: "rgba(255, 255, 255, 0.5)",
            fontWeight: 500,
            display: "flex",
          }}
        >
          velocalls.com
        </div>
      </div>
    ),
    { ...size }
  );
}
