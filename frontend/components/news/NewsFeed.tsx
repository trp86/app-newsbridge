"use client";

import { useState } from "react";
import { Article, Language } from "@/lib/types/news";
import { NewsCard } from "./NewsCard";
import { ReadingModeToggle } from "./ReadingModeToggle";
import { useReadingMode } from "@/lib/hooks/useReadingMode";

interface NewsFeedProps {
  articles: Article[];
  language: Language;
}

export function NewsFeed({ articles, language }: NewsFeedProps) {
  const { readingMode, setReadingMode } = useReadingMode();

  if (articles.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-base text-muted">No articles available</p>
      </div>
    );
  }

  return (
    <div>
      {/* Articles Grid - Tighter spacing, reading-first */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
        {articles.map((article) => (
          <NewsCard
            key={article.id}
            article={article}
            language={language}
            readingMode={readingMode}
          />
        ))}
      </div>
    </div>
  );
}
