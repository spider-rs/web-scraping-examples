/**
 * Tradesy Scraper
 *
 * Extract luxury fashion resale listings, authentication details, pricing, and bra
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx tradesy-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
});

await spider.init();
const page = spider.page!;
await page.goto("https://www.tradesy.com/i/women/bags/");
await page.content(10000);

const data = await page.evaluate(`(() => {
  const items = [];
  document.querySelectorAll(".product-card").forEach(el => {
    const brand = el.querySelector(".product-card__brand")?.textContent?.trim();
    const title = el.querySelector(".product-card__title")?.textContent?.trim();
    const price = el.querySelector(".product-card__price")?.textContent?.trim();
    const originalPrice = el.querySelector(".product-card__original-price")?.textContent?.trim();
    if (title) items.push({ brand, title, price, originalPrice });
  });
  return JSON.stringify({ total: items.length, items: items.slice(0, 10) });
})()`);

console.log(JSON.parse(data));
await spider.close();
