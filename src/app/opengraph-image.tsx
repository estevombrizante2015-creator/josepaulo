import { ImageResponse } from "next/og";
import { siteConfig } from "@/data/site";
import { brandColors, loadBrandFonts, loadPortraitDataUrl } from "@/lib/og";

export const alt = `${siteConfig.fullName} — Advocacia em ${siteConfig.location.city}/${siteConfig.location.state}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/** Imagem de compartilhamento (arquitetura.md §44), gerada no build. */
export default async function OpengraphImage() {
  const [fonts, portrait] = await Promise.all([loadBrandFonts(), loadPortraitDataUrl()]);
  const { ink, gold, paper, mist } = brandColors;

  return new ImageResponse(
    (
      <div style={{ display: "flex", width: "100%", height: "100%", position: "relative", background: ink, color: paper, fontFamily: "Manrope" }}>
        <div style={{ display: "flex", position: "absolute", top: 0, right: 0, width: 470, height: 630 }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={portrait} alt="" width={470} height={630} style={{ width: 470, height: 630, objectFit: "cover", objectPosition: "50% 30%" }} />
          <div style={{ display: "flex", position: "absolute", top: 0, left: 0, width: 470, height: 630, background: `linear-gradient(90deg, ${ink} 0%, rgba(11,13,15,0.35) 40%, rgba(11,13,15,0) 70%)` }} />
        </div>

        <div style={{ display: "flex", position: "absolute", left: 0, top: 500, width: 1200, height: 1, background: "rgba(247,247,245,0.16)" }} />
        <div style={{ display: "flex", position: "absolute", left: 729, top: 0, width: 1, height: 630, background: "rgba(247,247,245,0.12)" }} />
        <div style={{ display: "flex", position: "absolute", left: 723, top: 494, width: 13, height: 13, border: `1px solid ${gold}`, background: ink }} />

        <div style={{ display: "flex", flexDirection: "column", width: 730, height: "100%", padding: "60px 72px 0" }}>
          <div style={{ display: "flex", alignItems: "center" }}>
            <span style={{ fontFamily: "Cormorant", fontSize: 46, letterSpacing: 3 }}>JPG</span>
            <span style={{ display: "flex", width: 1, height: 34, background: gold, margin: "0 20px" }} />
            <span style={{ fontSize: 15, letterSpacing: 6, color: mist }}>ADVOCACIA</span>
          </div>

          <div style={{ display: "flex", flexDirection: "column", marginTop: 92 }}>
            <span style={{ fontSize: 16, letterSpacing: 5, color: gold }}>
              {`${siteConfig.location.city} — ${siteConfig.location.state}`.toUpperCase()}
            </span>
            <span style={{ fontFamily: "Cormorant", fontSize: 76, lineHeight: 1.02, marginTop: 22 }}>{siteConfig.fullName}</span>
            <span style={{ fontSize: 24, lineHeight: 1.4, color: mist, marginTop: 26 }}>
              Advocacia e orientação jurídica em {siteConfig.location.city}/{siteConfig.location.state}.
            </span>
          </div>

          <div style={{ display: "flex", position: "absolute", left: 72, top: 536, fontSize: 15, letterSpacing: 5, color: mist }}>
            {siteConfig.oab}
          </div>
        </div>
      </div>
    ),
    { ...size, fonts },
  );
}
