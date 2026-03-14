import { ImageResponse } from "next/og";
import { getPostBySlug, getAllSlugs } from "@/lib/blog";

export const runtime = "nodejs";

export const alt = "VeloCalls Blog Post";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export async function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

function getTitleFontSize(title: string): number {
  if (title.length <= 40) return 56;
  if (title.length <= 80) return 44;
  return 36;
}

export default async function OGImage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  const title = post?.title ?? "VeloCalls Blog";
  const category = post?.category ?? "Blog";
  const authorName = post?.author?.name ?? "VeloCalls Team";
  const titleFontSize = getTitleFontSize(title);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
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
            top: "-80px",
            right: "-80px",
            width: "300px",
            height: "300px",
            borderRadius: "50%",
            background: "rgba(255, 255, 255, 0.08)",
            display: "flex",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "-120px",
            left: "-60px",
            width: "400px",
            height: "400px",
            borderRadius: "50%",
            background: "rgba(255, 255, 255, 0.05)",
            display: "flex",
          }}
        />

        {/* Top section: Logo + Category */}
        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
            }}
          >
            {/* Logo square */}
            <div
              style={{
                width: "40px",
                height: "40px",
                borderRadius: "8px",
                background: "rgba(255, 255, 255, 0.2)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "22px",
                fontWeight: 800,
                color: "white",
              }}
            >
              V
            </div>
            <span
              style={{
                fontSize: "26px",
                fontWeight: 700,
                color: "white",
                letterSpacing: "-0.5px",
              }}
            >
              VeloCalls
            </span>
          </div>

          {/* Category badge */}
          <div style={{ display: "flex" }}>
            <div
              style={{
                display: "flex",
                padding: "6px 18px",
                borderRadius: "9999px",
                background: "rgba(255, 255, 255, 0.15)",
                fontSize: "16px",
                fontWeight: 600,
                color: "white",
              }}
            >
              {category}
            </div>
          </div>
        </div>

        {/* Title */}
        <div
          style={{
            display: "flex",
            flex: 1,
            alignItems: "center",
            paddingTop: "10px",
            paddingBottom: "10px",
          }}
        >
          <div
            style={{
              fontSize: `${titleFontSize}px`,
              fontWeight: 800,
              color: "white",
              lineHeight: 1.2,
              letterSpacing: "-1px",
              maxWidth: "1000px",
              overflow: "hidden",
              display: "flex",
            }}
          >
            {title}
          </div>
        </div>

        {/* Bottom: Author + URL */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <span
            style={{
              fontSize: "20px",
              color: "rgba(255, 255, 255, 0.8)",
              fontWeight: 500,
            }}
          >
            By {authorName}
          </span>
          <span
            style={{
              fontSize: "20px",
              color: "rgba(255, 255, 255, 0.6)",
              fontWeight: 500,
            }}
          >
            velocalls.com
          </span>
        </div>
      </div>
    ),
    { ...size }
  );
}
