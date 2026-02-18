/**
 * Bukalapak Scraper
 *
 * Extract product listings, seller profiles, pricing in IDR, and promo data from B
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx bukalapak-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
});

await spider.init();
const page = spider.page!;
await page.goto("https://www.bukalapak.com/products?search%5Bkeywords%5D=smartphone");
await page.content(10000);

const data = await page.evaluate(`(() => {
  const items = [];
  document.querySelectorAll(".product-card").forEach(el => {
    const name = el.querySelector(".product-card__name")?.textContent?.trim();
    const price = el.querySelector(".product-card__price")?.textContent?.trim();
    const seller = el.querySelector(".product-card__store")?.textContent?.trim();
    const location = el.querySelector(".product-card__location")?.textContent?.trim();
    if (name) items.push({ name, price, seller, location });
  });
  return JSON.stringify({ total: items.length, items: items.slice(0, 10) });
})()`);

console.log(JSON.parse(data));
await spider.close();
