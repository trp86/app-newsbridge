import { notFound } from "next/navigation";
import { Suspense } from "react";
import { Header } from "@/components/layout/Header";
import { getArticleById, getArticles } from "@/lib/data/articles";
import { Language } from "@/lib/types/news";
import { ArticleContent } from "@/components/article/ArticleContent";
import { ArticleNavigation } from "@/components/article/ArticleNavigation";

export default async function ArticlePage({
  params,
  searchParams
}: {
  params: Promise<{ locale: string; id: string }>;
  searchParams: Promise<{ mode?: string }>;
}) {
  const { locale, id } = await params;
  const { mode } = await searchParams;

  const article = await getArticleById(id);
  const { articles: allArticles } = await getArticles();

  if (!article) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-surface">
      <Header locale={locale as Language} />

      <main className="container mx-auto px-4 md:px-8 py-8">
        <Suspense fallback={<div>Loading...</div>}>
          <ArticleContent article={article} locale={locale} />
        </Suspense>
      </main>

      {/* Floating navigation with swipe support */}
      <ArticleNavigation
        currentArticleId={id}
        allArticles={allArticles}
        locale={locale}
        mode={mode || 'standard'}
      />
    </div>
  );
}
