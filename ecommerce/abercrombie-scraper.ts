/**
 * Abercrombie & Fitch Scraper
 *
 * Extract casual fashion listings, fit details, pricing, and promotional offers fr
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx abercrombie-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
});

await spider.connect();
const page = spider.page!;
await page.goto("https://www.abercrombie.com/shop/us/mens-jeans");
await page.content();

const data = await page.evaluate(`(() => {
  const items = [];
  document.querySelectorAll("[data-testid='product-card']").forEach(el => {
    const name = el.querySelector("[data-testid='product-card-name']")?.textContent?.trim();
    const price = el.querySelector("[data-testid='product-card-price']")?.textContent?.trim();
    const colors = el.querySelector("[data-testid='product-card-swatches']")?.childElementCount;
    if (name) items.push({ name, price, colorCount: colors });
  });
  return JSON.stringify({ total: items.length, items: items.slice(0, 10) });
})()`);

console.log(JSON.parse(data));
await spider.close();
