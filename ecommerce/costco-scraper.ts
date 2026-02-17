/**
 * Costco Product Scraper
 *
 * Extract product listings from Costco category pages — name, price,
 * and rating. Handles member-only content with stealth browsing.
 *
 * Uses `evaluate()` to iterate over multiple product elements.
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx costco-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
});
await spider.connect();
const page = spider.page!;

await page.goto("https://www.costco.com/electronics.html");
await page.content();

const data = await page.evaluate(`(() => {
  const products = [];
  document.querySelectorAll(".product-tile-set .product").forEach(el => {
    const name = el.querySelector(".description a")?.textContent?.trim();
    const price = el.querySelector(".price")?.textContent?.trim();
    const rating = el.querySelector(".stars")?.getAttribute("aria-label");
    if (name) products.push({ name, price, rating });
  });
  return JSON.stringify({ total: products.length, products: products.slice(0, 10) });
})()`);

console.log(JSON.parse(data as string));
await spider.close();
