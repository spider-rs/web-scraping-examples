/**
 * Adidas Scraper
 *
 * Extract athletic product listings, colorway details, pricing, and size availabil
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx adidas-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
});

await spider.init();
const page = spider.page!;
await page.goto("https://www.adidas.com/us/men-running-shoes");
await page.content(10000);

const data = await page.evaluate(`(() => {
  const items = [];
  document.querySelectorAll("[data-auto-id='glass-product-card']").forEach(el => {
    const name = el.querySelector("[data-auto-id='glass-product-card__title']")?.textContent?.trim();
    const price = el.querySelector("[data-auto-id='glass-product-card__price']")?.textContent?.trim();
    const category = el.querySelector("[data-auto-id='glass-product-card__category']")?.textContent?.trim();
    if (name) items.push({ name, price, category });
  });
  return JSON.stringify({ total: items.length, items: items.slice(0, 10) });
})()`);

console.log(JSON.parse(data));
await spider.close();
