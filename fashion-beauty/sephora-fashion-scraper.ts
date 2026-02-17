/**
 * Sephora Beauty Scraper
 *
 * Extract beauty product listings, ratings, ingredient info, and pricing from Seph
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx sephora-fashion-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
});

await spider.connect();
const page = spider.page!;
await page.goto("https://www.sephora.com/shop/bestselling-makeup");
await page.content(10000);

const data = await page.evaluate(`(() => {
  const items = [];
  document.querySelectorAll("[data-comp='ProductGrid'] [data-comp='ProductTile']").forEach(el => {
    const brand = el.querySelector("[data-at='sku_item_brand']")?.textContent?.trim();
    const name = el.querySelector("[data-at='sku_item_name']")?.textContent?.trim();
    const price = el.querySelector("[data-at='sku_item_price_list']")?.textContent?.trim();
    const rating = el.querySelector("[data-comp='StarRating']")?.getAttribute("aria-label");
    if (name) items.push({ brand, name, price, rating });
  });
  return JSON.stringify({ total: items.length, items: items.slice(0, 10) });
})()`);

console.log(JSON.parse(data));
await spider.close();
