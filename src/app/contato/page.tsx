import type { Metadata } from "next";
import { Contact } from "@/components/Contact/Contact";
import { JsonLd } from "@/components/ui/JsonLd";
import { PageHero } from "@/components/ui/PageHero";
import { contactSection, cta } from "@/data/content";
import { siteConfig } from "@/data/site";
import { legalServiceJsonLd, pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Contato",
  description: `Endereço, telefone, WhatsApp, horário de atendimento e mapa do escritório ${siteConfig.name} em ${siteConfig.location.city}/${siteConfig.location.state}.`,
  path: "/contato",
});

/** Página de contato (arquitetura.md §70). */
export default function ContactPage() {
  return (
    <>
      <JsonLd data={legalServiceJsonLd()} />
      <PageHero label={contactSection.label} title={contactSection.title}>
        <p>{cta.text}</p>
      </PageHero>
      <Contact showHeader={false} />
    </>
  );
}
