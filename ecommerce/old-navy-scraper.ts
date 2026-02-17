/**
 * Old Navy Scraper
 *
 * Extract affordable fashion listings, family sizing, pricing, and promotional dea
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx old-navy-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
});

await spider.connect();
const page = spider.page!;
await page.goto("https://oldnavy.gap.com/browse/category.do?cid=15292");
await page.content();

const data = await page.evaluate(`(() => {
  const items = [];
  document.querySelectorAll(".product-card").forEach(el => {
    const name = el.querySelector(".product-card__name")?.textContent?.trim();
    const price = el.querySelector(".product-card-price__highlight, .product-card-price")?.textContent?.trim();
    const rating = el.querySelector(".product-card__rating")?.getAttribute("aria-label");
    if (name) items.push({ name, price, rating });
  });
  return JSON.stringify({ total: items.length, items: items.slice(0, 10) });
})()`);

console.log(JSON.parse(data));
await spider.close();
