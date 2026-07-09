import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./i18n/request.ts');

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['localhost'],
    formats: ['image/avif', 'image/webp'],
  },
  // Enable ISR (Incremental Static Regeneration)
  experimental: {
    // ISR for article pages
  },
};

export default withNextIntl(nextConfig);
