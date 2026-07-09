import { Header } from "@/components/layout/Header";
import { BottomNav } from "@/components/layout/BottomNav";
import { Language } from "@/lib/types/news";

export default async function ExplorePage({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  return (
    <div className="min-h-screen bg-background pb-20 md:pb-0">
      {/* Desktop Header */}
      <div className="hidden md:block">
        <Header locale={locale as Language} />
      </div>

      {/* Mobile Header */}
      <header className="md:hidden flex items-center justify-between px-4 py-3 border-b border-border bg-surface">
        <button
          className="p-2 min-h-[44px] min-w-[44px] flex items-center justify-center cursor-pointer
                     hover:bg-accent/10 rounded transition-colors duration-200"
          aria-label="Open menu"
        >
          <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
        <h1 className="text-lg font-serif font-black text-primary tracking-tight">Explore</h1>
        <div className="w-[44px]"></div>
      </header>

      <main className="container mx-auto px-4 md:px-6 py-8 max-w-6xl">
        <div className="text-center py-16">
          <div className="mb-6">
            <svg className="w-20 h-20 mx-auto text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <h2 className="text-3xl font-serif font-bold text-primary mb-4">
            {locale === 'en' ? 'Explore' : 'ଅନ୍ୱେଷଣ କରନ୍ତୁ'}
          </h2>
          <p className="text-lg text-secondary max-w-md mx-auto">
            {locale === 'en'
              ? 'Discover news by topics, regions, and trending stories. Coming soon!'
              : 'ବିଷୟ, ଅଞ୍ଚଳ ଏବଂ ଟ୍ରେଣ୍ଡିଂ ସମାଚାର ଦ୍ୱାରା ସମାଚାର ଆବିଷ୍କାର କରନ୍ତୁ। ଶୀଘ୍ର ଆସୁଛି!'
            }
          </p>
        </div>
      </main>

      {/* Mobile Bottom Navigation */}
      <BottomNav locale={locale as Language} activeTab="explore" />
    </div>
  );
}
