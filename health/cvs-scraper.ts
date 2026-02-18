/**
 * CVS Scraper
 *
 * Extract pharmacy product listings, medication prices, store locations, and healt
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx cvs-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
});

await spider.init();
const page = spider.page!;
await page.goto("https://www.cvs.com/shop/search?searchTerm=vitamins");
await page.content(8000);

const data = await page.evaluate(`(() => {
  const products = [];
  document.querySelectorAll(".product-card, [data-testid='product-tile']").forEach(el => {
    const name = el.querySelector(".product-name, [data-testid='product-name']")?.textContent?.trim();
    const price = el.querySelector(".product-price, [data-testid='product-price']")?.textContent?.trim();
    const rating = el.querySelector(".rating-count")?.textContent?.trim();
    if (name) products.push({ name, price, rating });
  });
  return JSON.stringify({ total: products.length, products: products.slice(0, 15) });
})()`);

console.log(JSON.parse(data));
await spider.close();
