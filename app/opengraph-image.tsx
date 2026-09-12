import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", background: "#0d1511", color: "#fff", padding: "80px", fontFamily: "sans-serif" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div style={{ width: 52, height: 52, borderRadius: "50%", background: "#c9ff36", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 28, fontWeight: 700, color: "#101613" }}>Z</div>
          <div style={{ fontSize: 34, fontWeight: 700, letterSpacing: "-0.02em" }}>ZenTech Labs</div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div style={{ display: "flex", fontSize: 24, textTransform: "uppercase", letterSpacing: 4, color: "#c9ff36" }}>AI · Software · Cloud · Data</div>
          <div style={{ display: "flex", fontSize: 66, fontWeight: 600, lineHeight: 1.1, maxWidth: 1000 }}>We engineer what matters next.</div>
        </div>
      </div>
    ),
    { ...size }
  );
}
