"use client";

import { ReadingMode } from "@/lib/types/news";
import { useReadingMode } from "@/lib/hooks/useReadingMode";

interface ReadingDepthSelectorProps {
  locale: string;
}

export function ReadingDepthSelector({ locale }: ReadingDepthSelectorProps) {
  const { readingMode, setReadingMode } = useReadingMode();

  const modes: Array<{ id: ReadingMode; label: string }> = [
    { id: 'quick', label: '30' },
    { id: 'standard', label: '111' },
    { id: 'deep', label: '250' },
  ];

  return (
    <div className="flex flex-col gap-1.5">
      <label className="flex items-center gap-1.5 text-xs font-semibold text-primary uppercase tracking-wider">
        <svg className="w-3.5 h-3.5 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
        {locale === 'en' ? 'Reading Depth' : 'ପଠନ ଗଭୀରତା'}
      </label>
      <div role="radiogroup" aria-label="Select reading depth" className="inline-flex gap-1 bg-background/80 border border-border rounded-lg p-1">
        {modes.map((mode) => (
          <button
            key={mode.id}
            role="radio"
            aria-checked={readingMode === mode.id}
            onClick={() => setReadingMode(mode.id)}
            className={`flex-1 px-3 py-2 text-xs font-semibold rounded-md transition-all duration-200
                       focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 cursor-pointer
                       ${readingMode === mode.id
                         ? 'bg-accent text-white shadow-sm'
                         : 'text-secondary hover:bg-accent/10'
                       }`}
            aria-label={`Reading mode ${mode.label} words`}
          >
            {mode.label}
          </button>
        ))}
      </div>
    </div>
  );
}
