import type { Metadata } from "next";
import { ArticleCardPlaceholder } from "@/components/Articles/ArticleCard";
import { ArticleList } from "@/components/Articles/ArticleList";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/ui/PageHero";
import { publishedArticles } from "@/data/articles";
import { articlesSection } from "@/data/content";
import { siteConfig } from "@/data/site";
import { pageMetadata } from "@/lib/seo";

const hasArticles = publishedArticles.length > 0;

export const metadata: Metadata = {
  ...pageMetadata({
    title: "Conteúdos",
    description: `Artigos informativos sobre temas jurídicos publicados pelo escritório ${siteConfig.name}.`,
    path: "/conteudos",
  }),
  // Página sem artigos não deve ser indexada.
  ...(hasArticles ? {} : { robots: { index: false, follow: true } }),
};

/** Índice de conteúdos jurídicos (arquitetura.md §23, §24 e §68). */
export default function ArticlesPage() {
  return (
    <>
      <PageHero label={articlesSection.label} title={articlesSection.title}>
        <p>{articlesSection.disclaimer}</p>
      </PageHero>

      <section aria-label="Artigos" className="tone-light bg-canvas py-20 text-fg md:py-28">
        <Container>
          {hasArticles ? (
            <ArticleList articles={publishedArticles} />
          ) : (
            <ul className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {Array.from({ length: 3 }, (_, index) => (
                <li key={index}>
                  <ArticleCardPlaceholder />
                </li>
              ))}
            </ul>
          )}
        </Container>
      </section>
    </>
  );
}
