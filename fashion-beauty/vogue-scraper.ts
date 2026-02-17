/**
 * Vogue Scraper
 *
 * Extract fashion articles, runway coverage, designer profiles, and trend reports 
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx vogue-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
});

await spider.connect();
const page = spider.page!;
await page.goto("https://www.vogue.com/fashion");
await page.content();

const data = await page.evaluate(`(() => {
  const articles = [];
  document.querySelectorAll("[data-testid='SummaryItemWrapper']").forEach(el => {
    const title = el.querySelector("[data-testid='SummaryItemHed']")?.textContent?.trim();
    const dek = el.querySelector("[data-testid='SummaryItemDek']")?.textContent?.trim();
    const link = el.querySelector("a")?.href;
    if (title) articles.push({ title, dek, link });
  });
  return JSON.stringify({ total: articles.length, articles: articles.slice(0, 10) });
})()`);

console.log(JSON.parse(data));
await spider.close();
