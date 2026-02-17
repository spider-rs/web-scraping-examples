/**
 * Puma Scraper
 *
 * Extract athletic footwear listings, colorways, pricing, and category data from P
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx puma-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
});

await spider.connect();
const page = spider.page!;
await page.goto("https://us.puma.com/us/en/women/shoes/sneakers");
await page.content();

const data = await page.evaluate(`(() => {
  const items = [];
  document.querySelectorAll("[data-test-id='product-list-item']").forEach(el => {
    const name = el.querySelector("[data-test-id='product-tile-title']")?.textContent?.trim();
    const price = el.querySelector("[data-test-id='product-tile-price']")?.textContent?.trim();
    const link = el.querySelector("a")?.href;
    if (name) items.push({ name, price, link });
  });
  return JSON.stringify({ total: items.length, items: items.slice(0, 10) });
})()`);

console.log(JSON.parse(data));
await spider.close();
