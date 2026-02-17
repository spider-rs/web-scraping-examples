/**
 * StockX Scraper
 *
 * Extract sneaker market data, bid/ask pricing, last sale info, and volatility fro
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx stockx-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
  captcha: "solve",
});

await spider.connect();
const page = spider.page!;
await page.goto("https://stockx.com/sneakers/most-popular");
await page.content(10000);

const data = await page.evaluate(`(() => {
  const items = [];
  document.querySelectorAll("[data-testid='productTile']").forEach(el => {
    const name = el.querySelector("[data-testid='product-tile-title']")?.textContent?.trim();
    const lastSale = el.querySelector("[data-testid='product-tile-last-sale']")?.textContent?.trim();
    const ask = el.querySelector("[data-testid='product-tile-lowest-ask']")?.textContent?.trim();
    if (name) items.push({ name, lastSale, ask });
  });
  return JSON.stringify({ total: items.length, items: items.slice(0, 10) });
})()`);

console.log(JSON.parse(data));
await spider.close();
