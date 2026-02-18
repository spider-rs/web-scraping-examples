/**
 * Farfetch Scraper
 *
 * Extract luxury brand products, boutique info, pricing, and availability from Far
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx farfetch-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
});

await spider.init();
const page = spider.page!;
await page.goto("https://www.farfetch.com/shopping/women/dresses-1/items.aspx");
await page.content(10000);

const data = await page.evaluate(`(() => {
  const items = [];
  document.querySelectorAll("[data-testid='productCard']").forEach(el => {
    const brand = el.querySelector("[data-testid='productCard-brand']")?.textContent?.trim();
    const name = el.querySelector("[data-testid='productCard-description']")?.textContent?.trim();
    const price = el.querySelector("[data-testid='productCard-price']")?.textContent?.trim();
    if (brand) items.push({ brand, name, price });
  });
  return JSON.stringify({ total: items.length, items: items.slice(0, 10) });
})()`);

console.log(JSON.parse(data));
await spider.close();
