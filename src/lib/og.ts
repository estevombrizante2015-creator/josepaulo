import { readFile } from "node:fs/promises";
import { join } from "node:path";

const assetsDir = join(process.cwd(), "src/assets");

/** Fontes da identidade para imagens geradas (Open Graph e ícones). O `next/og` não aceita woff2. */
export async function loadBrandFonts() {
  const [serif, serifItalic, sans] = await Promise.all([
    readFile(join(assetsDir, "fonts/cormorant-garamond-latin-500-normal.woff")),
    readFile(join(assetsDir, "fonts/cormorant-garamond-latin-500-italic.woff")),
    readFile(join(assetsDir, "fonts/manrope-latin-600-normal.woff")),
  ]);

  return [
    { name: "Cormorant", data: serif, style: "normal" as const, weight: 500 as const },
    { name: "Cormorant", data: serifItalic, style: "italic" as const, weight: 500 as const },
    { name: "Manrope", data: sans, style: "normal" as const, weight: 600 as const },
  ];
}

export async function loadPortraitDataUrl() {
  const data = await readFile(join(assetsDir, "images/fotoperfil.jpg"), "base64");
  return `data:image/jpeg;base64,${data}`;
}

export const brandColors = {
  ink: "#0b0d0f",
  graphite: "#161a1d",
  gold: "#b89b5e",
  paper: "#f7f7f5",
  mist: "#9ba1a6",
};
