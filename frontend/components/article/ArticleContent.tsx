"use client";

import { useSearchParams } from "next/navigation";
import { Article, Language, ReadingMode } from "@/lib/types/news";
import { READING_MODES } from "@/lib/constants/reading-modes";
import { CategoryBadge } from "@/components/news/CategoryBadge";
import { formatDate } from "@/lib/utils/formatDate";

interface ArticleContentProps {
  article: Article;
  locale: string;
}

export function ArticleContent({ article, locale }: ArticleContentProps) {
  const searchParams = useSearchParams();
  const mode = searchParams.get('mode') || 'standard';
  const readingMode = mode as ReadingMode;
  const modeConfig = READING_MODES[readingMode];

  // Get content based on language
  const content = locale === 'en'
    ? article.english
    : article.translations[locale as Language] || article.english;

  const summary = content[modeConfig.field];

  return (
    <article className="max-w-article mx-auto">
      {/* Category */}
      <div className="mb-4">
        <CategoryBadge category={article.category} />
      </div>

      {/* Title */}
      <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4 text-on-surface">
        {content.title}
      </h1>

      {/* Meta */}
      <div className="flex items-center gap-4 text-sm text-muted mb-6">
        <span className="font-medium">{article.source}</span>
        <span>•</span>
        <time>{formatDate(article.publishedAt)}</time>
      </div>

      {/* Reading depth selector - At the top for easy access */}
      <div className="mb-8 pb-6 border-b border-border-subtle">
        <p className="text-xs font-medium text-muted uppercase tracking-wider mb-3">
          {locale === 'en' ? 'Reading Depth' : 'ପଠନ ଗଭୀରତା'}
        </p>

        <div className="inline-flex gap-2 bg-background/80 border border-border rounded-lg p-1.5">
          <a
            href={`?mode=quick`}
            className={`px-4 py-2.5 text-sm font-semibold rounded-md transition-all duration-200
                       focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2
                       ${readingMode === 'quick'
                         ? 'bg-accent text-white shadow-sm'
                         : 'text-secondary hover:bg-accent/10 hover:text-primary'
                       }`}
          >
            {locale === 'en' ? 'Quick (30)' : 'ଶୀଘ୍ର (୩୦)'}
          </a>

          <a
            href={`?mode=standard`}
            className={`px-4 py-2.5 text-sm font-semibold rounded-md transition-all duration-200
                       focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2
                       ${readingMode === 'standard'
                         ? 'bg-accent text-white shadow-sm'
                         : 'text-secondary hover:bg-accent/10 hover:text-primary'
                       }`}
          >
            {locale === 'en' ? 'Standard (111)' : 'ସାଧାରଣ (୧୧୧)'}
          </a>

          <a
            href={`?mode=deep`}
            className={`px-4 py-2.5 text-sm font-semibold rounded-md transition-all duration-200
                       focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2
                       ${readingMode === 'deep'
                         ? 'bg-accent text-white shadow-sm'
                         : 'text-secondary hover:bg-accent/10 hover:text-primary'
                       }`}
          >
            {locale === 'en' ? 'Deep (250)' : 'ଗଭୀର (୨୫୦)'}
          </a>
        </div>
      </div>

      {/* Content - Show only selected reading depth */}
      <div className="prose prose-lg max-w-none">
        <div className="text-base leading-relaxed text-secondary space-y-4">
          {summary.split('\n\n').map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>

      </div>

    </article>
  );
}
