/**
 * Auchan Scraper
 *
 * Extract grocery listings, pricing in EUR, promotional offers, and store availabi
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx auchan-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
});

await spider.connect();
const page = spider.page!;
await page.goto("https://www.auchan.fr/recherche?text=lait");
await page.content(10000);

const data = await page.evaluate(`(() => {
  const items = [];
  document.querySelectorAll(".product-thumbnail").forEach(el => {
    const name = el.querySelector(".product-thumbnail__title")?.textContent?.trim();
    const price = el.querySelector(".product-price__amount")?.textContent?.trim();
    const unitPrice = el.querySelector(".product-price__unit")?.textContent?.trim();
    const promo = el.querySelector(".product-thumbnail__promo")?.textContent?.trim();
    if (name) items.push({ name, price, unitPrice, promo });
  });
  return JSON.stringify({ total: items.length, items: items.slice(0, 10) });
})()`);

console.log(JSON.parse(data));
await spider.close();
