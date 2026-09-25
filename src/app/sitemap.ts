import type { MetadataRoute } from "next";
import { publishedArticles } from "@/data/articles";
import { absoluteUrl } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return [
    { url: absoluteUrl("/"), lastModified, changeFrequency: "monthly", priority: 1 },
    { url: absoluteUrl("/contato"), lastModified, changeFrequency: "yearly", priority: 0.8 },
    ...(publishedArticles.length
      ? [
          { url: absoluteUrl("/conteudos"), lastModified, changeFrequency: "weekly" as const, priority: 0.6 },
          ...publishedArticles.map((article) => ({
            url: absoluteUrl(`/conteudos/${article.slug}`),
            lastModified: new Date(`${article.date}T00:00:00Z`),
            changeFrequency: "yearly" as const,
            priority: 0.6,
          })),
        ]
      : []),
    { url: absoluteUrl("/politica-de-privacidade"), lastModified, changeFrequency: "yearly", priority: 0.3 },
  ];
}
