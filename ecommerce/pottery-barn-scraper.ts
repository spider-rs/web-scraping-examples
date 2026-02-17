/**
 * Pottery Barn Scraper
 *
 * Extract home furnishing listings, material details, pricing, and customization o
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx pottery-barn-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
});

await spider.connect();
const page = spider.page!;
await page.goto("https://www.potterybarn.com/shop/furniture/sofas-loveseats/");
await page.content();

const data = await page.evaluate(`(() => {
  const items = [];
  document.querySelectorAll(".product-thumb").forEach(el => {
    const name = el.querySelector(".product-name a")?.textContent?.trim();
    const price = el.querySelector(".price-state")?.textContent?.trim();
    const link = el.querySelector(".product-name a")?.href;
    if (name) items.push({ name, price, link });
  });
  return JSON.stringify({ total: items.length, items: items.slice(0, 10) });
})()`);

console.log(JSON.parse(data));
await spider.close();
