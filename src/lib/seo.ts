import type { Metadata } from "next";
import type { Article } from "@/data/articles";
import type { FaqItem } from "@/data/faq";
import { siteConfig } from "@/data/site";
import { activeSocialLinks } from "@/data/social";
import { getOpeningHours } from "@/lib/utils";

/** Metadados globais (arquitetura.md §42 e §44). */
export const defaultSeo = {
  title: "Dr. José Paulo Genari | Advogado em Mogi Guaçu - SP",
  description:
    "Dr. José Paulo Genari Júnior, advogado em Mogi Guaçu/SP. Atendimento jurídico e orientação personalizada. Entre em contato para agendar atendimento.",
  ogTitle: "Dr. José Paulo Genari | Advocacia",
  ogDescription: "Advocacia e orientação jurídica em Mogi Guaçu/SP.",
};

/**
 * O site só é indexado depois que o domínio oficial for configurado em
 * NEXT_PUBLIC_SITE_URL — o que deve acontecer apenas quando todo conteúdo
 * pendente (TODO) tiver sido preenchido e revisado pelo escritório.
 */
export const isIndexable = Boolean(process.env.NEXT_PUBLIC_SITE_URL);

export function absoluteUrl(path = "/") {
  return new URL(path, siteConfig.url).toString();
}

/** Metadados individuais para páginas internas (§71). */
export function pageMetadata({
  title,
  description,
  path,
}: {
  title: string;
  description: string;
  path: string;
}): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      locale: "pt_BR",
      siteName: siteConfig.name,
      url: path,
      title: `${title} | ${siteConfig.name}`,
      description,
    },
  };
}

type JsonLd = Record<string, unknown>;

/**
 * Dados estruturados do escritório (§43). Somente informações confirmadas:
 * novos campos (e-mail, geo, priceRange...) só depois de aprovados.
 */
export function legalServiceJsonLd(): JsonLd {
  const { address } = siteConfig;

  const groups = new Map<string, { days: string[]; opens: string; closes: string }>();
  for (const row of getOpeningHours()) {
    if (!row.opens || !row.closes) continue;
    const key = `${row.opens}-${row.closes}`;
    const group = groups.get(key) ?? { days: [], opens: row.opens, closes: row.closes };
    group.days.push(row.schema);
    groups.set(key, group);
  }

  return {
    "@context": "https://schema.org",
    "@type": "LegalService",
    "@id": absoluteUrl("/#escritorio"),
    name: siteConfig.name,
    url: absoluteUrl("/"),
    image: absoluteUrl("/opengraph-image"),
    telephone: `+${siteConfig.phone}`,
    address: {
      "@type": "PostalAddress",
      streetAddress: `${address.street}, ${address.number} — ${address.neighborhood}`,
      addressLocality: address.city,
      addressRegion: address.state,
      postalCode: address.zipCode,
      addressCountry: "BR",
    },
    areaServed: { "@type": "City", name: siteConfig.location.city },
    openingHoursSpecification: [...groups.values()].map((group) => ({
      "@type": "OpeningHoursSpecification",
      dayOfWeek: group.days,
      opens: group.opens,
      closes: group.closes,
    })),
    employee: {
      "@type": "Person",
      name: siteConfig.fullName,
      jobTitle: siteConfig.profession,
    },
    ...(siteConfig.email ? { email: siteConfig.email } : {}),
    ...(activeSocialLinks.length ? { sameAs: activeSocialLinks.map((link) => link.url) } : {}),
  };
}

/** FAQPage somente com perguntas que já possuem resposta do escritório. */
export function faqJsonLd(items: FaqItem[]): JsonLd | null {
  const answered = items.filter((item) => item.answer);
  if (!answered.length) return null;

  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: answered.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };
}

export function articleJsonLd(article: Article): JsonLd {
  const url = absoluteUrl(`/conteudos/${article.slug}`);
  const image = article.image
    ? absoluteUrl(typeof article.image === "string" ? article.image : article.image.src)
    : absoluteUrl("/opengraph-image");

  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.excerpt,
    datePublished: article.date,
    image,
    url,
    mainEntityOfPage: url,
    articleSection: article.category,
    inLanguage: "pt-BR",
    author: { "@type": "Person", name: article.author ?? siteConfig.fullName },
    publisher: { "@type": "LegalService", name: siteConfig.name, url: absoluteUrl("/") },
  };
}
