/**
 * Kroger Scraper
 *
 * Extract grocery product listings, weekly deals, coupons, and store inventory fro
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx kroger-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
});

await spider.connect();
const page = spider.page!;
await page.goto("https://www.kroger.com/pl/fruits/06?page=1");
await page.content(10000);

const data = await page.evaluate(`(() => {
  const products = [];
  document.querySelectorAll("[data-testid='auto-grid-cell']").forEach(el => {
    const name = el.querySelector("[data-testid='cart-page-item-description']")?.textContent?.trim();
    const price = el.querySelector("[data-testid='cart-page-item-price']")?.textContent?.trim();
    const brand = el.querySelector("[data-testid='cart-page-item-brand']")?.textContent?.trim();
    if (name) products.push({ name, price, brand });
  });
  return JSON.stringify({ total: products.length, products: products.slice(0, 10) });
})()`);

console.log(JSON.parse(data));
await spider.close();
