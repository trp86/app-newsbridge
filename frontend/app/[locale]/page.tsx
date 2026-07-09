import { Header } from "@/components/layout/Header";
import { BottomNav } from "@/components/layout/BottomNav";
import { FeaturedCardWrapper } from "@/components/news/FeaturedCardWrapper";
import { NewsFeed } from "@/components/news/NewsFeed";
import { LanguageSelector } from "@/components/shared/LanguageSelector";
import { CountrySelector } from "@/components/shared/CountrySelector";
import { ReadingDepthSelector } from "@/components/shared/ReadingDepthSelector";
import { getArticles } from "@/lib/data/articles";
import { Language } from "@/lib/types/news";

export default async function HomePage({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  // Fetch articles
  const { articles } = await getArticles();

  // Get featured article (first one)
  const featuredArticle = articles[0];
  const remainingArticles = articles.slice(1);

  return (
    <div className="min-h-screen bg-background pb-20 md:pb-0">
      {/* Skip to main content link for accessibility */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 z-[100]
                   bg-primary text-white px-4 py-2 rounded focus-visible:ring-2 focus-visible:ring-offset-2"
      >
        Skip to main content
      </a>

      {/* Desktop Header */}
      <div className="hidden md:block">
        <Header locale={locale as Language} />
      </div>

      {/* Mobile Header */}
      <header className="md:hidden flex items-center justify-between px-4 py-3 border-b border-border bg-surface">
        <button
          className="p-2 min-h-[44px] min-w-[44px] flex items-center justify-center cursor-pointer
                     hover:bg-accent/10 rounded transition-colors duration-200
                     focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
          aria-label="Open menu"
        >
          <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
        <div className="flex items-center gap-1.5">
          <svg className="w-5 h-5 text-accent" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M4 18h16c0-3.31-2.69-6-6-6h-4c-3.31 0-6 2.69-6 6zm2-6h12a8 8 0 00-12 0z"/>
            <path d="M7 6h2v4H7zm8 0h2v4h-2z"/>
          </svg>
          <h1 className="text-lg font-serif font-black text-primary tracking-tight">NewsBridge</h1>
        </div>
        <button
          className="p-2 min-h-[44px] min-w-[44px] flex items-center justify-center cursor-pointer
                     hover:bg-accent/10 rounded transition-colors duration-200
                     focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
          aria-label="Select region"
        >
          <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </button>
      </header>

      <main id="main-content" className="container mx-auto px-4 md:px-6 py-4 md:py-6 max-w-6xl">
        {/* Refined Controls Section */}
        <div className="bg-gradient-to-r from-surface to-background rounded-xl p-4 md:p-5 mb-6 shadow-sm border border-border/50">
          {/* Tagline with Icon */}
          <div className="flex items-center gap-2 mb-4">
            <svg className="w-4 h-4 text-accent" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM4.332 8.027a6.012 6.012 0 011.912-2.706C6.512 5.73 6.974 6 7.5 6A1.5 1.5 0 019 7.5V8a2 2 0 004 0 2 2 0 011.523-1.943A5.977 5.977 0 0116 10c0 .34-.028.675-.083 1H15a2 2 0 00-2 2v2.197A5.973 5.973 0 0110 16v-2a2 2 0 00-2-2 2 2 0 01-2-2 2 2 0 00-1.668-1.973z" clipRule="evenodd"/>
            </svg>
            <p className="text-sm font-medium text-secondary">
              {locale === 'en' ? 'Global news in your language' : 'ଆପଣଙ୍କ ଭାଷାରେ ବିଶ୍ୱ ସମାଚାର'}
            </p>
          </div>

          {/* Controls Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {/* Region Selector */}
            <div className="flex flex-col gap-1.5">
              <label className="flex items-center gap-1.5 text-xs font-semibold text-primary uppercase tracking-wider">
                <svg className="w-3.5 h-3.5 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {locale === 'en' ? 'Region' : 'ଅଞ୍ଚଳ'}
              </label>
              <CountrySelector />
            </div>

            {/* Language Selector */}
            <div className="flex flex-col gap-1.5">
              <label className="flex items-center gap-1.5 text-xs font-semibold text-primary uppercase tracking-wider">
                <svg className="w-3.5 h-3.5 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
                </svg>
                {locale === 'en' ? 'Language' : 'ଭାଷା'}
              </label>
              <LanguageSelector currentLanguage={locale as Language} />
            </div>

            {/* Reading Mode */}
            <ReadingDepthSelector locale={locale} />
          </div>
        </div>

        {/* Featured Article - Immediately visible, reduced height */}
        {featuredArticle && (
          <div className="mb-6">
            <FeaturedCardWrapper
              article={featuredArticle}
              language={locale as Language}
            />
          </div>
        )}

        {/* Remaining Articles - Tighter spacing */}
        <NewsFeed articles={remainingArticles} language={locale as Language} />
      </main>

      {/* Mobile Bottom Navigation */}
      <BottomNav locale={locale as Language} activeTab="feed" />
    </div>
  );
}
