/**
 * Glossier Scraper
 *
 * Extract beauty product listings, shade ranges, ingredient data, and customer rev
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx glossier-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
});

await spider.connect();
const page = spider.page!;
await page.goto("https://www.glossier.com/category/skincare");
await page.content();

const data = await page.evaluate(`(() => {
  const items = [];
  document.querySelectorAll("[data-testid='product-card']").forEach(el => {
    const name = el.querySelector("[data-testid='product-card-name']")?.textContent?.trim();
    const price = el.querySelector("[data-testid='product-card-price']")?.textContent?.trim();
    const subtitle = el.querySelector("[data-testid='product-card-subtitle']")?.textContent?.trim();
    if (name) items.push({ name, price, subtitle });
  });
  return JSON.stringify({ total: items.length, items: items.slice(0, 10) });
})()`);

console.log(JSON.parse(data));
await spider.close();
