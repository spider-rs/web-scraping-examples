/**
 * Chewy Scraper
 *
 * Extract pet product listings, brand info, pricing, and autoship discounts from C
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx chewy-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
});

await spider.init();
const page = spider.page!;
await page.goto("https://www.chewy.com/b/dry-food-294");
await page.content();

const data = await page.evaluate(`(() => {
  const items = [];
  document.querySelectorAll("[data-testid='product-card']").forEach(el => {
    const brand = el.querySelector("[data-testid='product-card-brand']")?.textContent?.trim();
    const name = el.querySelector("[data-testid='product-card-name']")?.textContent?.trim();
    const price = el.querySelector("[data-testid='product-card-price']")?.textContent?.trim();
    const autoship = el.querySelector("[data-testid='product-card-autoship-price']")?.textContent?.trim();
    if (name) items.push({ brand, name, price, autoship });
  });
  return JSON.stringify({ total: items.length, items: items.slice(0, 10) });
})()`);

console.log(JSON.parse(data));
await spider.close();
