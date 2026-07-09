"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Article } from "@/lib/types/news";

interface ArticleNavigationProps {
  currentArticleId: string;
  allArticles: Article[];
  locale: string;
  mode: string;
}

export function ArticleNavigation({ currentArticleId, allArticles, locale, mode }: ArticleNavigationProps) {
  const router = useRouter();
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  // Find current article index
  const currentIndex = allArticles.findIndex(a => a.id === currentArticleId);
  const prevArticle = currentIndex > 0 ? allArticles[currentIndex - 1] : null;
  const nextArticle = currentIndex < allArticles.length - 1 ? allArticles[currentIndex + 1] : null;

  // Minimum swipe distance (in px)
  const minSwipeDistance = 50;

  const onTouchStart = (e: TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientY);
  };

  const onTouchMove = (e: TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientY);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;

    const distance = touchStart - touchEnd;
    const isUpSwipe = distance > minSwipeDistance;
    const isDownSwipe = distance < -minSwipeDistance;

    if (isUpSwipe && nextArticle) {
      // Swipe up = next article
      router.push(`/${locale}/article/${nextArticle.id}?mode=${mode}`);
    }

    if (isDownSwipe && prevArticle) {
      // Swipe down = previous article
      router.push(`/${locale}/article/${prevArticle.id}?mode=${mode}`);
    }
  };

  // Add touch event listeners
  useEffect(() => {
    document.addEventListener('touchstart', onTouchStart);
    document.addEventListener('touchmove', onTouchMove);
    document.addEventListener('touchend', onTouchEnd);

    return () => {
      document.removeEventListener('touchstart', onTouchStart);
      document.removeEventListener('touchmove', onTouchMove);
      document.removeEventListener('touchend', onTouchEnd);
    };
  }, [touchStart, touchEnd, prevArticle, nextArticle]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowUp' && prevArticle) {
        router.push(`/${locale}/article/${prevArticle.id}?mode=${mode}`);
      }
      if (e.key === 'ArrowDown' && nextArticle) {
        router.push(`/${locale}/article/${nextArticle.id}?mode=${mode}`);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [prevArticle, nextArticle, locale, mode, router]);

  return (
    <div className="fixed bottom-6 right-6 flex flex-col gap-2 z-50">
      {/* Previous Article */}
      {prevArticle && (
        <button
          onClick={() => router.push(`/${locale}/article/${prevArticle.id}?mode=${mode}`)}
          className="p-3 bg-accent text-white rounded-full shadow-lg hover:bg-accent-hover transition-colors duration-200
                     focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
          aria-label="Previous article"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
          </svg>
        </button>
      )}

      {/* Article counter */}
      <div className="px-4 py-2 bg-surface border border-border rounded-full shadow-md text-xs font-medium text-primary text-center">
        {currentIndex + 1} / {allArticles.length}
      </div>

      {/* Next Article */}
      {nextArticle && (
        <button
          onClick={() => router.push(`/${locale}/article/${nextArticle.id}?mode=${mode}`)}
          className="p-3 bg-accent text-white rounded-full shadow-lg hover:bg-accent-hover transition-colors duration-200
                     focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
          aria-label="Next article"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
      )}

      {/* Back to feed - small button */}
      <a
        href={`/${locale}`}
        className="mt-2 p-2 bg-surface border border-border text-primary rounded-full shadow-md hover:bg-accent/10 transition-colors duration-200
                   focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
        aria-label="Back to feed"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
      </a>
    </div>
  );
}
