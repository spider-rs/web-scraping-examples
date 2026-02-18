/**
 * StockX Finance Scraper
 *
 * Extract sneaker resale prices, market data, and product authentication info from
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx stockx-finance-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
});

await spider.init();
const page = spider.page!;
await page.goto("https://stockx.com/sneakers/most-popular");
await page.content(10000);

const data = await page.evaluate(`(() => {
  const items = [];
  document.querySelectorAll("[data-testid='product-tile']").forEach(el => {
    const name = el.querySelector("[data-testid='product-tile-name']")?.textContent?.trim();
    const price = el.querySelector("[data-testid='product-tile-lowest-ask']")?.textContent?.trim();
    const lastSale = el.querySelector("[data-testid='product-tile-last-sale']")?.textContent?.trim();
    if (name) items.push({ name, price, lastSale });
  });
  return JSON.stringify({ total: items.length, items: items.slice(0, 15) });
})()`);

console.log(JSON.parse(data));
await spider.close();
