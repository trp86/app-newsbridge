export const siteConfig = {
  name: "NewsBridge",
  description: "A digital sanctuary for global perspectives. Curated news from across the globe, translated and distilled for clarity and deep comprehension.",
  tagline: "A digital sanctuary for global perspectives.",
  url: "https://newsbridge.app",
  ogImage: "/og-image.png",
  links: {
    github: "https://github.com/newsbridge",
  },
  defaultLanguage: "en",
  defaultCountry: "Germany",
  supportedLanguages: [
    { code: "en", name: "English", nativeName: "English" },
    { code: "or", name: "Odia", nativeName: "ଓଡ଼ିଆ" },
  ],
};

export type SiteConfig = typeof siteConfig;
