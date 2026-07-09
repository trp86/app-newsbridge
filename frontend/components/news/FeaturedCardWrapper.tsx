"use client";

import { Article, Language } from "@/lib/types/news";
import { FeaturedCard } from "./FeaturedCard";
import { useReadingMode } from "@/lib/hooks/useReadingMode";

interface FeaturedCardWrapperProps {
  article: Article;
  language: Language;
}

export function FeaturedCardWrapper({ article, language }: FeaturedCardWrapperProps) {
  const { readingMode } = useReadingMode();

  return (
    <FeaturedCard
      article={article}
      language={language}
      readingMode={readingMode}
    />
  );
}
