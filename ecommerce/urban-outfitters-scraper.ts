/**
 * Urban Outfitters Scraper
 *
 * Extract trendy fashion listings, pricing, size ranges, and brand data from Urban
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx urban-outfitters-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
});

await spider.connect();
const page = spider.page!;
await page.goto("https://www.urbanoutfitters.com/mens-tops");
await page.content();

const data = await page.evaluate(`(() => {
  const items = [];
  document.querySelectorAll("[data-testid='product-tile']").forEach(el => {
    const name = el.querySelector("[data-testid='product-tile-title']")?.textContent?.trim();
    const price = el.querySelector("[data-testid='product-tile-price']")?.textContent?.trim();
    const brand = el.querySelector("[data-testid='product-tile-brand']")?.textContent?.trim();
    if (name) items.push({ name, price, brand });
  });
  return JSON.stringify({ total: items.length, items: items.slice(0, 10) });
})()`);

console.log(JSON.parse(data));
await spider.close();
