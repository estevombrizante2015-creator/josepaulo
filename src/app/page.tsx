import type { Metadata } from "next";
import { About } from "@/components/About/About";
import { Articles } from "@/components/Articles/Articles";
import { Authority } from "@/components/Authority/Authority";
import { Contact } from "@/components/Contact/Contact";
import { CTA } from "@/components/CTA/CTA";
import { Differentials } from "@/components/Differentials/Differentials";
import { FAQ } from "@/components/FAQ/FAQ";
import { Hero } from "@/components/Hero/Hero";
import { LawyerProfile } from "@/components/LawyerProfile/LawyerProfile";
import { PracticeAreas } from "@/components/PracticeAreas/PracticeAreas";
import { Process } from "@/components/Process/Process";
import { Transparency } from "@/components/Transparency/Transparency";
import { JsonLd } from "@/components/ui/JsonLd";
import { faq } from "@/data/faq";
import { faqJsonLd, legalServiceJsonLd } from "@/lib/seo";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

/**
 * One page institucional — arquitetura final da home (arquitetura.md §76):
 * quem é → como atua → em quais áreas → como funciona → como entrar em contato.
 */
export default function HomePage() {
  return (
    <>
      <JsonLd data={legalServiceJsonLd()} />
      <JsonLd data={faqJsonLd(faq)} />

      <Hero />
      <Authority />
      <About />
      <LawyerProfile />
      <PracticeAreas />
      <Differentials />
      <Process />
      <Transparency />
      <Articles />
      <FAQ />
      <CTA />
      <Contact />
    </>
  );
}
