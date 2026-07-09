import Link from "next/link";
import { Language } from "@/lib/types/news";
import { siteConfig } from "@/config/site";

interface HeaderProps {
  locale: Language;
}

export function Header({ locale }: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 md:px-8 max-w-7xl">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link
            href={`/${locale}`}
            className="flex items-center space-x-2 group cursor-pointer
                       focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 rounded px-2 py-1"
            aria-label="NewsBridge home"
          >
            <div className="flex items-center gap-2">
              {/* Bridge Icon */}
              <svg className="w-7 h-7 text-accent" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M4 18h16c0-3.31-2.69-6-6-6h-4c-3.31 0-6 2.69-6 6zm2-6h12a8 8 0 00-12 0z"/>
                <path d="M7 6h2v4H7zm8 0h2v4h-2z"/>
              </svg>
              {/* Brand Name */}
              <div className="flex flex-col -space-y-1">
                <span className="text-2xl font-serif font-black text-primary group-hover:text-accent transition-colors duration-200 tracking-tight">
                  NewsBridge
                </span>
                <span className="text-[10px] font-sans font-medium text-muted uppercase tracking-widest">
                  Global • Local
                </span>
              </div>
            </div>
          </Link>

          {/* Navigation */}
          <nav className="flex items-center space-x-6" aria-label="Main navigation">
            <Link
              href={`/${locale}`}
              className="text-sm font-medium text-secondary hover:text-primary transition-colors duration-200
                         focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded px-2 py-1
                         cursor-pointer"
              aria-current={locale ? "page" : undefined}
            >
              Feed
            </Link>
            <Link
              href={`/${locale}/explore`}
              className="text-sm font-medium text-secondary hover:text-primary transition-colors duration-200
                         focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded px-2 py-1
                         cursor-pointer"
            >
              Explore
            </Link>
            <Link
              href={`/${locale}/settings`}
              className="text-sm font-medium text-secondary hover:text-primary transition-colors duration-200
                         focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded px-2 py-1
                         cursor-pointer"
            >
              Settings
            </Link>
          </nav>

          {/* Language Toggle */}
          <div className="flex items-center space-x-2" role="group" aria-label="Language selection">
            <Link
              href="/en"
              className={`min-h-[44px] min-w-[44px] flex items-center justify-center px-3 py-1.5 text-sm font-medium rounded transition-colors duration-200
                         focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2
                         cursor-pointer ${
                locale === 'en'
                  ? 'bg-accent text-white'
                  : 'text-primary hover:bg-accent/10'
              }`}
              aria-label="Switch to English"
              aria-pressed={locale === 'en'}
            >
              EN
            </Link>
            <Link
              href="/or"
              className={`min-h-[44px] min-w-[44px] flex items-center justify-center px-3 py-1.5 text-sm font-medium rounded transition-colors duration-200
                         focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2
                         cursor-pointer ${
                locale === 'or'
                  ? 'bg-accent text-white'
                  : 'text-primary hover:bg-accent/10'
              }`}
              aria-label="Switch to Odia"
              aria-pressed={locale === 'or'}
            >
              ଓଡ଼ିଆ
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
