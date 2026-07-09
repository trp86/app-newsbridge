import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "NewsBridge - A digital sanctuary for global perspectives",
  description: "Curated news from across the globe, translated and distilled for clarity and deep comprehension.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Root layout must return just children
  // The [locale] layout will provide html and body tags
  return children;
}
