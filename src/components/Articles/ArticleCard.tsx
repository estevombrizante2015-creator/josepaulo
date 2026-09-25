import Image from "next/image";
import Link from "next/link";
import { ArrowRightIcon } from "@/components/ui/Icons";
import { Pending } from "@/components/ui/Pending";
import type { Article } from "@/data/articles";
import { articlesSection } from "@/data/content";
import { formatDate } from "@/lib/utils";

const cardClasses =
  "group relative flex h-full flex-col border border-line bg-surface/40 transition duration-500 ease-editorial";

export function ArticleCard({ article }: { article: Article }) {
  return (
    <article className={`${cardClasses} hover:-translate-y-1 hover:border-accent/60`}>
      {article.image && (
        <div className="relative aspect-[16/10] overflow-hidden">
          <Image
            src={article.image}
            alt=""
            fill
            sizes="(min-width: 1024px) 30vw, (min-width: 768px) 50vw, 100vw"
            className="object-cover transition duration-1000 ease-editorial group-hover:scale-[1.03]"
          />
        </div>
      )}
      <div className="flex flex-1 flex-col p-7 lg:p-8">
        <p className="type-eyebrow text-accent">
          {articlesSection.cardLabel} · {article.category}
        </p>
        <time dateTime={article.date} className="mt-2 block text-sm text-fg-muted">
          {formatDate(article.date)}
        </time>
        <h3 className="mt-6 font-serif text-2xl leading-snug text-fg">
          <Link
            href={`/conteudos/${article.slug}`}
            className="after:absolute after:inset-0"
            data-track="article_open"
            data-track-label={article.slug}
          >
            {article.title}
          </Link>
        </h3>
        <p className="mt-4 leading-relaxed text-fg-muted">{article.excerpt}</p>
        <span className="type-eyebrow mt-auto inline-flex items-center gap-3 pt-8 text-fg">
          {articlesSection.readMore}
          <ArrowRightIcon className="size-4 transition-transform duration-500 ease-editorial group-hover:translate-x-1" />
        </span>
      </div>
    </article>
  );
}

/** Estrutura do card enquanto não há artigos revisados pelo escritório. */
export function ArticleCardPlaceholder() {
  return (
    <div className={`${cardClasses} border-dashed p-7 lg:p-8`}>
      <p className="type-eyebrow text-accent">{articlesSection.cardLabel}</p>
      <p className="mt-6 font-serif text-2xl leading-snug text-fg-muted">Título</p>
      <p className="mt-4 leading-relaxed text-fg-muted">Resumo</p>
      <div className="mt-auto pt-8">
        <Pending />
      </div>
    </div>
  );
}
