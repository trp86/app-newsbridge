import Link from "next/link";
import { Language } from "@/lib/types/news";

interface BottomNavProps {
  locale: Language;
  activeTab?: 'feed' | 'explore' | 'settings';
}

export function BottomNav({ locale, activeTab = 'feed' }: BottomNavProps) {
  return (
    <nav
      className="md:hidden fixed bottom-0 left-0 right-0 z-50
                 border-t border-border bg-surface/95 backdrop-blur
                 supports-[backdrop-filter]:bg-surface/60"
      aria-label="Mobile navigation"
    >
      <div className="flex items-center justify-around h-16 px-4">
        <Link
          href={`/${locale}`}
          className={`flex flex-col items-center justify-center min-w-[60px] min-h-[44px]
                     cursor-pointer transition-colors duration-200
                     focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 rounded ${
            activeTab === 'feed' ? 'text-accent' : 'text-muted hover:text-primary'
          }`}
          aria-current={activeTab === 'feed' ? 'page' : undefined}
          aria-label="News feed"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
          </svg>
          <span className="text-xs mt-1 font-medium uppercase tracking-wide">Feed</span>
        </Link>

        <Link
          href={`/${locale}/explore`}
          className={`flex flex-col items-center justify-center min-w-[60px] min-h-[44px]
                     cursor-pointer transition-colors duration-200
                     focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 rounded ${
            activeTab === 'explore' ? 'text-accent' : 'text-muted hover:text-primary'
          }`}
          aria-current={activeTab === 'explore' ? 'page' : undefined}
          aria-label="Explore news"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span className="text-xs mt-1 font-medium uppercase tracking-wide">Explore</span>
        </Link>

        <Link
          href={`/${locale}/settings`}
          className={`flex flex-col items-center justify-center min-w-[60px] min-h-[44px]
                     cursor-pointer transition-colors duration-200
                     focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 rounded ${
            activeTab === 'settings' ? 'text-accent' : 'text-muted hover:text-primary'
          }`}
          aria-current={activeTab === 'settings' ? 'page' : undefined}
          aria-label="Settings"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          <span className="text-xs mt-1 font-medium uppercase tracking-wide">Settings</span>
        </Link>
      </div>
    </nav>
  );
}
