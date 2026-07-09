"use client";

import { COUNTRIES, DEFAULT_COUNTRY } from "@/config/countries";
import { useState } from "react";

export function CountrySelector() {
  const [selectedCountry, setSelectedCountry] = useState(DEFAULT_COUNTRY);
  const selectedCountryData = COUNTRIES.find(c => c.code === selectedCountry) || COUNTRIES[0];

  return (
    <div className="relative inline-flex">
      <select
        value={selectedCountry}
        onChange={(e) => setSelectedCountry(e.target.value)}
        className="appearance-none bg-surface border border-border rounded-lg pl-4 pr-10 py-2.5
                   text-sm font-semibold text-primary cursor-pointer
                   hover:border-accent/40 hover:bg-accent/5
                   focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2
                   transition-all duration-200"
      >
        {COUNTRIES.map((country) => (
          <option key={country.code} value={country.code}>
            {country.flagEmoji} {country.name}
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
