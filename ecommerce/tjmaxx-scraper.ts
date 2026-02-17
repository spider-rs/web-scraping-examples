/**
 * TJ Maxx Scraper
 *
 * Extract off-price retail listings, brand details, discount pricing, and category
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx tjmaxx-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
});

await spider.connect();
const page = spider.page!;
await page.goto("https://tjmaxx.tjx.com/store/shop/women/shoes/_/N-3632025137");
await page.content();

const data = await page.evaluate(`(() => {
  const items = [];
  document.querySelectorAll(".product-card").forEach(el => {
    const brand = el.querySelector(".product-card__brand")?.textContent?.trim();
    const name = el.querySelector(".product-card__description")?.textContent?.trim();
    const price = el.querySelector(".product-card__price--our")?.textContent?.trim();
    const compareAt = el.querySelector(".product-card__price--compare")?.textContent?.trim();
    if (name) items.push({ brand, name, price, compareAt });
  });
  return JSON.stringify({ total: items.length, items: items.slice(0, 10) });
})()`);

console.log(JSON.parse(data));
await spider.close();
