"use client";

import Link from "next/link";
import { Article, Language, ReadingMode } from "@/lib/types/news";
import { READING_MODES } from "@/lib/constants/reading-modes";
import { CategoryBadge } from "./CategoryBadge";
import { formatRelativeTime } from "@/lib/utils/formatDate";
import { cn } from "@/lib/utils/cn";

interface NewsCardProps {
  article: Article;
  language: Language;
  readingMode: ReadingMode;
  className?: string;
}

export function NewsCard({ article, language, readingMode, className }: NewsCardProps) {
  // Get content based on language
  const content = language === 'en'
    ? article.english
    : article.translations[language] || article.english;

  // Get summary based on reading mode
  const modeConfig = READING_MODES[readingMode];
  const summary = content[modeConfig.field];

  return (
    <Link
      href={`/${language}/article/${article.id}?mode=${readingMode}`}
      className={cn(
        "block group cursor-pointer",
        className
      )}
      aria-label={`Read article: ${content.title}`}
    >
      <article className="h-full bg-surface border border-border rounded-lg p-5 md:p-6
                         hover:shadow-md hover:border-accent/40
                         transition-all duration-200
                         focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2">
        {/* Category Badge & Meta Info - Combined for hierarchy */}
        <div className="flex items-center justify-between mb-2">
          <CategoryBadge category={article.category} />
          <time className="text-xs text-muted" dateTime={article.publishedAt}>
            {formatRelativeTime(article.publishedAt)}
          </time>
        </div>

        {/* Title - Stronger hierarchy */}
        <h2 className="font-serif text-lg md:text-xl font-bold leading-tight mb-2
                       text-primary group-hover:text-accent
                       transition-colors duration-200 line-clamp-2">
          {content.title}
        </h2>

        {/* Summary - More prominent */}
        <p className="font-sans text-sm md:text-base leading-relaxed text-secondary mb-3 line-clamp-2">
          {summary}
        </p>

        {/* Source - Subtle footer */}
        <div className="flex items-center justify-between text-xs text-muted pt-2 border-t border-border-subtle">
          <span className="font-medium">{article.source}</span>
          <span>{modeConfig.words} words</span>
        </div>
      </article>
    </Link>
  );
}
