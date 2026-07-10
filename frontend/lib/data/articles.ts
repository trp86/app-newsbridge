import { ArticlesData } from "@/lib/types/news";

// Fallback static data
import articlesData from "@/public/data/articles.json";

/**
 * Load articles from API or fallback to static JSON
 */
export async function getArticles(): Promise<ArticlesData> {
  try {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8002";
    const url = `${apiUrl}/api/articles?limit=50`;
    console.log("[getArticles] Fetching from:", url);

    const response = await fetch(url, {
      cache: "force-cache",
      next: { revalidate: 300 },
      signal: AbortSignal.timeout(15000),
    });

    if (!response.ok) {
      throw new Error(`API responded with status ${response.status}`);
    }

    const data = await response.json();
    console.log(`[getArticles] Successfully fetched ${data.articles?.length || 0} articles from API`);
    return data as ArticlesData;
  } catch (error) {
    console.warn("[getArticles] Failed to fetch from API, using static data:", error);
    return articlesData as ArticlesData;
  }
}

/**
 * Get articles by category
 */
export async function getArticlesByCategory(category: string): Promise<ArticlesData> {
  const data = await getArticles();

  return {
    articles: data.articles.filter(article => article.category === category),
    metadata: data.metadata
  };
}

/**
 * Get single article by ID
 */
export async function getArticleById(id: string) {
  const data = await getArticles();
  return data.articles.find(article => article.id === id);
}
