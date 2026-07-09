import { notFound } from 'next/navigation';
import { Merriweather } from 'next/font/google';
import { Inter } from 'next/font/google';
import '../globals.css';

const merriweather = Merriweather({
  subsets: ['latin'],
  weight: ['400', '700', '900'],
  variable: '--font-newsreader',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-roboto',
  display: 'swap',
});

export default async function LocaleLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  // Await params in Next.js 16+
  const { locale } = await params;

  // Validate locale
  const locales = ['en', 'or'];
  if (!locales.includes(locale)) {
    notFound();
  }

  return (
    <html lang={locale} className={`${merriweather.variable} ${inter.variable} antialiased`}>
      <body className="min-h-screen bg-background text-primary font-sans">
        {children}
      </body>
    </html>
  );
}
