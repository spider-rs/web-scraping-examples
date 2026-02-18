/**
 * Nordstrom Rack Scraper
 *
 * Extract discount designer listings, original vs sale pricing, and brand data fro
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx nordstrom-rack-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
});

await spider.init();
const page = spider.page!;
await page.goto("https://www.nordstromrack.com/shop/Women/Clothing/Dresses");
await page.content();

const data = await page.evaluate(`(() => {
  const items = [];
  document.querySelectorAll("[data-testid='productCard']").forEach(el => {
    const brand = el.querySelector("[data-testid='productCard-brand']")?.textContent?.trim();
    const name = el.querySelector("[data-testid='productCard-title']")?.textContent?.trim();
    const salePrice = el.querySelector("[data-testid='productCard-sale-price']")?.textContent?.trim();
    const comparePrice = el.querySelector("[data-testid='productCard-compare-price']")?.textContent?.trim();
    if (name) items.push({ brand, name, salePrice, comparePrice });
  });
  return JSON.stringify({ total: items.length, items: items.slice(0, 10) });
})()`);

console.log(JSON.parse(data));
await spider.close();
