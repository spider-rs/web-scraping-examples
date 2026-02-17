/**
 * Mercari Scraper
 *
 * Extract secondhand product listings, seller ratings, pricing, and condition data
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx mercari-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
});

await spider.connect();
const page = spider.page!;
await page.goto("https://www.mercari.com/search/?keyword=nintendo+switch");
await page.content(10000);

const data = await page.evaluate(`(() => {
  const items = [];
  document.querySelectorAll("[data-testid='SearchResults'] [data-testid='ItemCell']").forEach(el => {
    const name = el.querySelector("[data-testid='ItemName']")?.textContent?.trim();
    const price = el.querySelector("[data-testid='ItemPrice']")?.textContent?.trim();
    const link = el.querySelector("a")?.href;
    if (name) items.push({ name, price, link });
  });
  return JSON.stringify({ total: items.length, items: items.slice(0, 10) });
})()`);

console.log(JSON.parse(data));
await spider.close();
