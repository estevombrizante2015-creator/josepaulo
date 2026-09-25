"use client";

import { useState } from "react";
import { ArticleCard } from "@/components/Articles/ArticleCard";
import type { Article } from "@/data/articles";
import { cn } from "@/lib/utils";

/** Lista de artigos com filtro somente pelas categorias efetivamente publicadas (§68). */
export function ArticleList({ articles }: { articles: Article[] }) {
  const [category, setCategory] = useState<string | null>(null);
  const categories = [...new Set(articles.map((article) => article.category))];
  const visible = category ? articles.filter((article) => article.category === category) : articles;

  return (
    <>
      {categories.length > 1 && (
        <div role="group" aria-label="Filtrar por categoria" className="mb-12 flex flex-wrap gap-2">
          {[null, ...categories].map((option) => (
            <button
              key={option ?? "todos"}
              type="button"
              aria-pressed={category === option}
              onClick={() => setCategory(option)}
              className={cn(
                "h-10 border px-4 text-[0.66rem] font-semibold tracking-[0.2em] uppercase transition-colors duration-300",
                category === option
                  ? "border-fg bg-fg text-canvas"
                  : "border-line text-fg-muted hover:border-accent hover:text-accent",
              )}
            >
              {option ?? "Todos"}
            </button>
          ))}
        </div>
      )}

      <ul className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {visible.map((article) => (
          <li key={article.slug}>
            <ArticleCard article={article} />
          </li>
        ))}
      </ul>
    </>
  );
}
