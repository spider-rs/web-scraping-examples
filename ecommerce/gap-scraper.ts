/**
 * Gap Scraper
 *
 * Extract apparel product listings, size charts, pricing, and promotional offers f
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx gap-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
});

await spider.connect();
const page = spider.page!;
await page.goto("https://www.gap.com/browse/category.do?cid=5664");
await page.content();

const data = await page.evaluate(`(() => {
  const items = [];
  document.querySelectorAll(".product-card").forEach(el => {
    const name = el.querySelector(".product-card__name")?.textContent?.trim();
    const price = el.querySelector(".product-card-price__highlight, .product-card-price")?.textContent?.trim();
    const colors = el.querySelector(".product-card__swatch-count")?.textContent?.trim();
    if (name) items.push({ name, price, colors });
  });
  return JSON.stringify({ total: items.length, items: items.slice(0, 10) });
})()`);

console.log(JSON.parse(data));
await spider.close();
