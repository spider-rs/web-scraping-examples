/**
 * Reuters News Scraper
 *
 * Extract technology news from Reuters — headline, description, and publication date.
 * Scrapes Reuters technology section with dynamic stealth browsing.
 *
 * Uses `evaluate()` to extract data from media story card elements.
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx reuters-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
});
await spider.connect();
const page = spider.page!;

await page.goto("https://www.reuters.com/technology/");
await page.content(12000);

const data = await page.evaluate(`(() => {
  const articles = [];
  document.querySelectorAll("[data-testid='MediaStoryCard']").forEach(el => {
    const headline = el.querySelector("[data-testid='Link']")?.textContent?.trim();
    const link = el.querySelector("[data-testid='Link']")?.href;
    const date = el.querySelector("[data-testid='Timestamp']")?.textContent?.trim();
    if (headline) articles.push({ headline, link, date });
  });
  return JSON.stringify({ total: articles.length, articles: articles.slice(0, 10) });
})()`);

console.log(JSON.parse(data as string));
await spider.close();
