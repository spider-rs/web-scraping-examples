/**
 * BBC News Scraper
 *
 * Extract news headlines from BBC News — headline, description, and publish date.
 * Scrapes the main BBC News feed with dynamic stealth browsing.
 *
 * Uses `evaluate()` to extract data from card headline elements.
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx bbc-news-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
});
await spider.init();
const page = spider.page!;

await page.goto("https://www.bbc.com/news");
await page.content(12000);

const data = await page.evaluate(`(() => {
  const articles = [];
  document.querySelectorAll("[data-testid='card-headline']").forEach(el => {
    const headline = el.textContent?.trim();
    const link = el.closest("a")?.href;
    const summary = el.closest("article")?.querySelector("[data-testid='internal-description']")?.textContent?.trim();
    if (headline) articles.push({ headline, link, summary });
  });
  return JSON.stringify({ total: articles.length, articles: articles.slice(0, 10) });
})()`);

console.log(JSON.parse(data as string));
await spider.close();
