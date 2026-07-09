"use client";

import { Language } from "@/lib/types/news";
import { siteConfig } from "@/config/site";

interface LanguageSelectorProps {
  currentLanguage: Language;
  onChange?: (lang: Language) => void;
}

export function LanguageSelector({ currentLanguage, onChange }: LanguageSelectorProps) {
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newLang = e.target.value as Language;
    if (onChange) {
      onChange(newLang);
    } else {
      // Navigate to new language
      window.location.href = `/${newLang}`;
    }
  };

  return (
    <div className="relative inline-flex">
      <select
        value={currentLanguage}
        onChange={handleChange}
        className="appearance-none bg-surface border border-border rounded-lg pl-4 pr-10 py-2.5
                   text-sm font-semibold text-primary cursor-pointer
                   hover:border-accent/40 hover:bg-accent/5
                   focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2
                   transition-all duration-200"
      >
        {siteConfig.supportedLanguages.map((lang) => (
          <option key={lang.code} value={lang.code}>
            {lang.nativeName}
          </option>
        ))}
      </select>
      {/* Custom dropdown arrow */}
      <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
        <svg className="w-4 h-4 text-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </div>
    </div>
  );
}
