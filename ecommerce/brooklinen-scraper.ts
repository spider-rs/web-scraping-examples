/**
 * Brooklinen Scraper
 *
 * Extract luxury bedding listings, material specs, bundle pricing, and customer re
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx brooklinen-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
});

await spider.connect();
const page = spider.page!;
await page.goto("https://www.brooklinen.com/collections/sheets");
await page.content();

const data = await page.evaluate(`(() => {
  const items = [];
  document.querySelectorAll(".product-card").forEach(el => {
    const name = el.querySelector(".product-card__title")?.textContent?.trim();
    const price = el.querySelector(".product-card__price")?.textContent?.trim();
    const rating = el.querySelector(".product-card__rating")?.textContent?.trim();
    if (name) items.push({ name, price, rating });
  });
  return JSON.stringify({ total: items.length, items: items.slice(0, 10) });
})()`);

console.log(JSON.parse(data));
await spider.close();
