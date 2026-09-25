import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ShareButtons } from "@/components/Articles/ShareButtons";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { WhatsAppIcon } from "@/components/ui/Icons";
import { JsonLd } from "@/components/ui/JsonLd";
import { PageHero } from "@/components/ui/PageHero";
import { articles, getArticle } from "@/data/articles";
import { articlesSection, cta } from "@/data/content";
import { siteConfig } from "@/data/site";
import { absoluteUrl, articleJsonLd } from "@/lib/seo";
import { formatDate, whatsappHref } from "@/lib/utils";

export const dynamicParams = false;

export function generateStaticParams() {
  return articles.map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({ params }: PageProps<"/conteudos/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) return {};

  const path = `/conteudos/${article.slug}`;
  const image = article.image && (typeof article.image === "string" ? article.image : article.image.src);

  return {
    title: article.title,
    description: article.excerpt,
    alternates: { canonical: path },
    openGraph: {
      type: "article",
      locale: "pt_BR",
      siteName: siteConfig.name,
      url: path,
      title: article.title,
      description: article.excerpt,
      publishedTime: article.date,
      authors: [article.author ?? siteConfig.fullName],
      section: article.category,
      ...(image ? { images: [image] } : {}),
    },
  };
}

/** Artigo: título, autor, data, categoria, imagem, conteúdo e compartilhamento (§24, §25). */
export default async function ArticlePage({ params }: PageProps<"/conteudos/[slug]">) {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) notFound();

  const blocks = article.content.trim().split(/\n\s*\n/);

  return (
    <>
      <JsonLd data={articleJsonLd(article)} />

      <article>
        <PageHero label={`${articlesSection.cardLabel} · ${article.category}`} title={article.title}>
          <p className="type-eyebrow flex flex-wrap gap-x-6 gap-y-2 text-fg-muted">
            <span>{article.author ?? siteConfig.fullName}</span>
            <time dateTime={article.date}>{formatDate(article.date)}</time>
          </p>
        </PageHero>

        <div className="tone-light bg-canvas py-16 text-fg md:py-24">
          <Container>
            <div className="mx-auto max-w-3xl">
              {article.image && (
                <figure className="relative mb-14 aspect-[16/9] overflow-hidden">
                  <Image src={article.image} alt="" fill sizes="(min-width: 768px) 48rem, 100vw" className="object-cover" />
                </figure>
              )}

              <div className="space-y-6 text-lg leading-[1.8] text-fg-muted">
                {blocks.map((block, index) =>
                  block.startsWith("## ") ? (
                    <h2 key={index} className="pt-6 font-serif text-3xl leading-tight text-fg">
                      {block.slice(3)}
                    </h2>
                  ) : (
                    <p key={index}>{block}</p>
                  ),
                )}
              </div>

              <aside className="mt-14 border-l-2 border-accent bg-surface px-6 py-5 text-sm leading-relaxed text-fg-muted">
                {articlesSection.disclaimer}
              </aside>

              <div className="mt-12 flex flex-col gap-8 border-t border-line pt-10 md:flex-row md:items-center md:justify-between">
                <ShareButtons title={article.title} url={absoluteUrl(`/conteudos/${article.slug}`)} />
                <ButtonLink
                  href={whatsappHref()}
                  external
                  icon={<WhatsAppIcon className="size-4" />}
                  track="whatsapp_click"
                  trackLocation="artigo"
                >
                  {cta.button}
                </ButtonLink>
              </div>
            </div>
          </Container>
        </div>
      </article>
    </>
  );
}
