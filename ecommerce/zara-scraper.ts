/**
 * Zara Scraper
 *
 * Extract fashion product data, color variants, pricing, and collection info from 
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx zara-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
});

await spider.connect();
const page = spider.page!;
await page.goto("https://www.zara.com/us/en/man-shirts-l737.html");
await page.content(10000);

const data = await page.evaluate(`(() => {
  const items = [];
  document.querySelectorAll(".product-grid-product").forEach(el => {
    const name = el.querySelector(".product-grid-product-info__name")?.textContent?.trim();
    const price = el.querySelector(".money-amount__main")?.textContent?.trim();
    const link = el.querySelector("a.product-link")?.href;
    if (name) items.push({ name, price, link });
  });
  return JSON.stringify({ total: items.length, items: items.slice(0, 10) });
})()`);

console.log(JSON.parse(data));
await spider.close();
