"use client";

import Link from "next/link";
import Image from "next/image";
import { Article, Language, ReadingMode } from "@/lib/types/news";
import { READING_MODES } from "@/lib/constants/reading-modes";
import { CategoryBadge } from "./CategoryBadge";

interface FeaturedCardProps {
  article: Article;
  language: Language;
  readingMode: ReadingMode;
}

export function FeaturedCard({ article, language, readingMode }: FeaturedCardProps) {
  const content = language === 'en'
    ? article.english
    : article.translations[language] || article.english;

  const modeConfig = READING_MODES[readingMode];
  const summary = content[modeConfig.field];

  return (
    <Link
      href={`/${language}/article/${article.id}?mode=${readingMode}`}
      className="block group cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 rounded-lg"
      aria-label={`Read featured article: ${content.title}`}
    >
      <article className="bg-surface border-2 border-accent/30 rounded-lg p-5 md:p-6
                          hover:shadow-md hover:border-accent/50
                          transition-all duration-200">
        {/* Content - Compact & Clean */}
        <div className="flex items-start justify-between gap-3 mb-3">
          <CategoryBadge category={article.category} />
          <span className="text-xs font-semibold uppercase tracking-wider text-accent flex-shrink-0">
            Featured
          </span>
        </div>

        <h2 className="font-serif text-xl md:text-2xl font-bold leading-tight mb-2 text-primary
                       group-hover:text-accent transition-colors duration-200">
          {content.title}
        </h2>

        <p className="font-sans text-sm md:text-base leading-relaxed text-secondary line-clamp-2">
          {summary}
        </p>
      </article>
    </Link>
  );
}
