import { ArticleCard, ArticleCardPlaceholder } from "@/components/Articles/ArticleCard";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { publishedArticles } from "@/data/articles";
import { articlesSection } from "@/data/content";
import { sections } from "@/data/site";

/** Informação jurídica: educação, SEO e esclarecimento (arquitetura.md §23 e §25). */
export function Articles() {
  const latest = publishedArticles.slice(0, 3);

  return (
    <section
      id={sections.conteudos}
      aria-labelledby="conteudos-titulo"
      className="tone-light relative bg-canvas py-24 text-fg md:py-32 lg:py-40"
    >
      <Container>
        <SectionHeader index="008" label={articlesSection.label} title={articlesSection.title} titleId="conteudos-titulo" />

        <ul className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {latest.length
            ? latest.map((article, index) => (
                <li key={article.slug}>
                  <Reveal delay={index * 0.08} className="h-full">
                    <ArticleCard article={article} />
                  </Reveal>
                </li>
              ))
            : Array.from({ length: 3 }, (_, index) => (
                <li key={index} className={index === 2 ? "hidden lg:block" : undefined}>
                  <Reveal delay={index * 0.08} className="h-full">
                    <ArticleCardPlaceholder />
                  </Reveal>
                </li>
              ))}
        </ul>

        <Reveal className="mt-12 flex flex-col gap-6 border-t border-line pt-8 md:flex-row md:items-center md:justify-between">
          <p className="max-w-2xl text-sm leading-relaxed text-fg-muted">{articlesSection.disclaimer}</p>
          {latest.length > 0 && (
            <ButtonLink href="/conteudos" variant="text" arrow>
              Ver todos os conteúdos
            </ButtonLink>
          )}
        </Reveal>
      </Container>
    </section>
  );
}
