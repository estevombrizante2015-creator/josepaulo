import { ImageResponse } from "next/og";
import { brandColors, loadBrandFonts } from "@/lib/og";

export const size = { width: 48, height: 48 };
export const contentType = "image/png";

/** Favicon com o monograma "JPG" (arquitetura.md §6). */
export default async function Icon() {
  const fonts = await loadBrandFonts();

  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          width: "100%",
          height: "100%",
          alignItems: "center",
          justifyContent: "center",
          background: brandColors.ink,
          color: brandColors.gold,
          fontFamily: "Cormorant",
          fontSize: 23,
          letterSpacing: 0.5,
        }}
      >
        JPG
      </div>
    ),
    { ...size, fonts },
  );
}
