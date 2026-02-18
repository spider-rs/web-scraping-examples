/**
 * Michaels Scraper
 *
 * Extract arts and crafts product listings, pricing, coupon data, and availability
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx michaels-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
});

await spider.init();
const page = spider.page!;
await page.goto("https://www.michaels.com/painting/acrylic-paint/809188702");
await page.content();

const data = await page.evaluate(`(() => {
  const items = [];
  document.querySelectorAll("[data-testid='product-grid-item']").forEach(el => {
    const name = el.querySelector("[data-testid='product-name']")?.textContent?.trim();
    const price = el.querySelector("[data-testid='product-price']")?.textContent?.trim();
    const brand = el.querySelector("[data-testid='product-brand']")?.textContent?.trim();
    if (name) items.push({ name, price, brand });
  });
  return JSON.stringify({ total: items.length, items: items.slice(0, 10) });
})()`);

console.log(JSON.parse(data));
await spider.close();
