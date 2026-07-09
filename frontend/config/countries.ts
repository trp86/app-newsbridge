import { Country } from "@/lib/types/news";

export const COUNTRIES: Country[] = [
  {
    code: "DE",
    name: "Germany",
    flagEmoji: "🇩🇪",
    description: "New economic measures aimed at sustainable energy transition approved.",
  },
  {
    code: "US",
    name: "USA",
    flagEmoji: "🇺🇸",
    description: "Market fluctuations as Federal Reserve indicates potential shifts in fiscal...",
  },
  {
    code: "JP",
    name: "Japan",
    flagEmoji: "🇯🇵",
    description: "Tech giants in Tokyo unveil breakthrough in modular quantum...",
  },
  {
    code: "FR",
    name: "France",
    flagEmoji: "🇫🇷",
    description: "Cultural preservation debate reaches the Senate as new architectural bills are...",
  },
  {
    code: "IN",
    name: "India",
    flagEmoji: "🇮🇳",
    description: "India strengthens trade partnerships with ASEAN nations in landmark summit...",
  },
  {
    code: "GB",
    name: "UK",
    flagEmoji: "🇬🇧",
    description: "London Stock Exchange sees record activity following new fintech...",
  },
];

export const DEFAULT_COUNTRY = "DE"; // Germany
