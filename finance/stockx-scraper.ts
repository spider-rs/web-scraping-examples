/**
 * StockX Scraper
 *
 * Scrapes popular sneaker listings from StockX marketplace.
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx finance/stockx-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
});
await spider.connect();
const page = spider.page!;

await page.goto("https://stockx.com/sneakers/most-popular");
await page.content();
const data = await page.evaluate(`(() => {
  const products = Array.from(document.querySelectorAll('[data-testid="product-tile"]')).map(el => ({
    name: el.querySelector('[data-testid="product-name"]')?.textContent?.trim(),
    price: el.querySelector('[data-testid="price"]')?.textContent?.trim(),
    change: el.querySelector('[data-testid="change"]')?.textContent?.trim(),
    salesCount: el.querySelector('[data-testid="sales-count"]')?.textContent?.trim(),
  }));
  return JSON.stringify({ products });
})()`);
console.log(JSON.parse(data));
await spider.close();
