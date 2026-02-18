/**
 * Petco Scraper
 *
 * Extract pet supply listings, brand data, pricing, and subscription options from 
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx petco-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
});

await spider.init();
const page = spider.page!;
await page.goto("https://www.petco.com/shop/en/petcostore/category/dog/dog-food/dry-dog-food");
await page.content();

const data = await page.evaluate(`(() => {
  const items = [];
  document.querySelectorAll("[data-testid='product-card']").forEach(el => {
    const brand = el.querySelector("[data-testid='product-brand']")?.textContent?.trim();
    const name = el.querySelector("[data-testid='product-name']")?.textContent?.trim();
    const price = el.querySelector("[data-testid='product-price']")?.textContent?.trim();
    const rating = el.querySelector("[data-testid='product-rating']")?.getAttribute("aria-label");
    if (name) items.push({ brand, name, price, rating });
  });
  return JSON.stringify({ total: items.length, items: items.slice(0, 10) });
})()`);

console.log(JSON.parse(data));
await spider.close();
