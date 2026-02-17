/**
 * Chewy Pets Scraper
 *
 * Extract pet food product listings, Autoship subscription pricing, customer revie
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx chewy-pets-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
});

await spider.connect();
const page = spider.page!;
await page.goto("https://www.chewy.com/b/dry-food-294");
await page.content(10000);

const data = await page.evaluate(`(() => {
  const products = [];
  document.querySelectorAll("[data-testid='product-card']").forEach(el => {
    const name = el.querySelector("[data-testid='product-title']")?.textContent?.trim();
    const price = el.querySelector("[data-testid='product-price']")?.textContent?.trim();
    const autoship = el.querySelector("[data-testid='autoship-price']")?.textContent?.trim();
    const rating = el.querySelector("[data-testid='product-rating']")?.textContent?.trim();
    const reviews = el.querySelector("[data-testid='review-count']")?.textContent?.trim();
    if (name) products.push({ name, price, autoship, rating, reviews });
  });
  return JSON.stringify({ total: products.length, products: products.slice(0, 10) });
})()`);

console.log(JSON.parse(data));
await spider.close();
