import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { getPost } from "@/lib/blog";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPost(slug);

  let photoDataUri = "";
  if (post) {
    try {
      const bytes = await readFile(join(process.cwd(), "public", post.image));
      photoDataUri = `data:image/jpeg;base64,${bytes.toString("base64")}`;
    } catch {
      // fall back to text-only card if the file can't be read
    }
  }

  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", background: "#0d1511", color: "#fff", fontFamily: "sans-serif" }}>
        <div style={{ width: "58%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", padding: "64px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <div style={{ width: 44, height: 44, borderRadius: "50%", background: "#c9ff36", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22, fontWeight: 700, color: "#101613" }}>Z</div>
            <div style={{ fontSize: 28, fontWeight: 700, letterSpacing: "-0.02em" }}>ZenTech Labs</div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            <div style={{ display: "flex", fontSize: 22, textTransform: "uppercase", letterSpacing: 3, color: "#c9ff36" }}>{post?.category ?? "ZenTech Labs Blog"}</div>
            <div style={{ display: "flex", fontSize: 48, fontWeight: 600, lineHeight: 1.15, color: "#fff" }}>{post?.title ?? "Ideas worth building on."}</div>
          </div>
        </div>
        <div style={{ width: "42%", height: "100%", display: "flex", position: "relative" }}>
          {photoDataUri
            ? <img src={photoDataUri} width={size.width * 0.42} height={size.height} style={{ objectFit: "cover", width: "100%", height: "100%" }} />
            : <div style={{ width: "100%", height: "100%", background: "#15231b" }} />}
        </div>
      </div>
    ),
    { ...size }
  );
}
