import { ImageResponse } from "next/og";
import { brandColors, loadBrandFonts } from "@/lib/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default async function AppleIcon() {
  const fonts = await loadBrandFonts();
  const { ink, gold, paper } = brandColors;

  return new ImageResponse(
    (
      <div style={{ display: "flex", width: "100%", height: "100%", alignItems: "center", justifyContent: "center", background: ink }}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            width: 140,
            height: 140,
            border: `1px solid ${gold}`,
          }}
        >
          <span style={{ fontFamily: "Cormorant", fontSize: 58, letterSpacing: 2, color: paper }}>JPG</span>
          <span style={{ display: "flex", width: 28, height: 1, background: gold, marginTop: 6 }} />
        </div>
      </div>
    ),
    { ...size, fonts },
  );
}
