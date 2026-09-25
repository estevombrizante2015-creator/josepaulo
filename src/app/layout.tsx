import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Manrope } from "next/font/google";
import { Analytics } from "@/components/Analytics/Analytics";
import { Cursor } from "@/components/Cursor/Cursor";
import { FloatingWhatsApp } from "@/components/FloatingWhatsApp/FloatingWhatsApp";
import { Footer } from "@/components/Footer/Footer";
import { Header } from "@/components/Header/Header";
import { MotionProvider } from "@/components/ui/MotionProvider";
import { siteConfig } from "@/data/site";
import { defaultSeo, isIndexable } from "@/lib/seo";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: defaultSeo.title,
    template: `%s | ${siteConfig.name}`,
  },
  description: defaultSeo.description,
  applicationName: siteConfig.name,
  authors: [{ name: siteConfig.fullName }],
  openGraph: {
    type: "website",
    locale: "pt_BR",
    siteName: siteConfig.name,
    url: "/",
    title: defaultSeo.ogTitle,
    description: defaultSeo.ogDescription,
  },
  twitter: {
    card: "summary_large_image",
    title: defaultSeo.ogTitle,
    description: defaultSeo.ogDescription,
  },
  robots: isIndexable ? { index: true, follow: true } : { index: false, follow: false },
  formatDetection: { telephone: false, email: false, address: false },
};

export const viewport: Viewport = {
  themeColor: "#0b0d0f",
  colorScheme: "dark",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="pt-BR" data-scroll-behavior="smooth" className={`${cormorant.variable} ${manrope.variable}`}>
      <body className="bg-ink text-paper">
        <a
          href="#conteudo"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[80] focus:bg-paper focus:px-5 focus:py-3 focus:text-sm focus:font-semibold focus:text-ink"
        >
          Pular para o conteúdo
        </a>
        <MotionProvider>
          <Header />
          <main id="conteudo" tabIndex={-1} className="outline-none">
            {children}
          </main>
          <Footer />
        </MotionProvider>
        <FloatingWhatsApp />
        <Cursor />
        <Analytics />
      </body>
    </html>
  );
}
