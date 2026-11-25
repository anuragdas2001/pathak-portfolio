import { STATIC_PORTFOLIO_DATA } from "@/data/portfolioData";
import type { PortfolioData, SecurityProject, WriteupEntry } from "@/data/types";

/**
 * Portfolio Data Service
 * ----------------------
 * Single async boundary between data sources and React Server/Client components.
 *
 * To switch from static data to dynamic data later:
 * 1. Fetch from your CMS (Sanity, Contentful, Strapi), REST API, or database (Prisma/Drizzle)
 *    inside `getPortfolioData()`.
 * 2. Use Next.js caching/revalidation (`fetch(url, { next: { revalidate: 3600 } })` or `cache()`).
 * 3. Keep the returned shape matching `PortfolioData` in `data/types.ts`.
 */
export async function getPortfolioData(): Promise<PortfolioData> {
  // Example future dynamic swap:
  // const res = await fetch(process.env.PORTFOLIO_API_URL!, { next: { revalidate: 300 } });
  // if (!res.ok) throw new Error("Failed to load portfolio data");
  // return (await res.json()) as PortfolioData;

  return STATIC_PORTFOLIO_DATA;
}

export async function getProjects(): Promise<SecurityProject[]> {
  const data = await getPortfolioData();
  return data.projects;
}

export async function getWriteups(): Promise<WriteupEntry[]> {
  const data = await getPortfolioData();
  return data.writeups;
}

