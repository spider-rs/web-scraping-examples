/**
 * Anthropologie Scraper
 *
 * Extract lifestyle product listings, designer details, pricing, and color options
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx anthropologie-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
});

await spider.init();
const page = spider.page!;
await page.goto("https://www.anthropologie.com/dresses");
await page.content();

const data = await page.evaluate(`(() => {
  const items = [];
  document.querySelectorAll("[data-testid='product-card']").forEach(el => {
    const name = el.querySelector("[data-testid='product-card-title']")?.textContent?.trim();
    const price = el.querySelector("[data-testid='product-card-price']")?.textContent?.trim();
    const brand = el.querySelector("[data-testid='product-card-brand']")?.textContent?.trim();
    if (name) items.push({ name, price, brand });
  });
  return JSON.stringify({ total: items.length, items: items.slice(0, 10) });
})()`);

console.log(JSON.parse(data));
await spider.close();
