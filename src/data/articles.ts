import type { SiteImage } from "@/data/site";

export type Article = {
  slug: string;
  title: string;
  category: string;
  excerpt: string;
  /** Data de publicação no formato AAAA-MM-DD. */
  date: string;
  image?: SiteImage;
  /** Padrão: nome completo do advogado. */
  author?: string;
  /**
   * Parágrafos separados por uma linha em branco.
   * Linhas iniciadas por "## " viram subtítulos.
   */
  content: string;
};

/**
 * Artigos da área "Informação jurídica" (§23, §54).
 * Todo conteúdo deve ser revisado pelo advogado antes da publicação (§25, §81).
 *
 * Exemplo:
 * {
 *   slug: "nome-do-artigo",
 *   title: "Título",
 *   category: "Direito Civil",
 *   excerpt: "Resumo",
 *   date: "2026-09-25",
 *   image: "/images/articles/artigo.jpg",
 *   content: "Primeiro parágrafo.\n\n## Subtítulo\n\nSegundo parágrafo.",
 * }
 */
export const articles: Article[] = [];

export const publishedArticles = [...articles].sort((a, b) => b.date.localeCompare(a.date));

export function getArticle(slug: string) {
  return articles.find((article) => article.slug === slug);
}
