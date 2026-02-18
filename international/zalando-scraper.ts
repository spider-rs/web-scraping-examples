/**
 * Zalando Scraper
 *
 * Extract fashion listings, brand catalogs, sizing data, and pricing in EUR from Z
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx zalando-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
});

await spider.init();
const page = spider.page!;
await page.goto("https://www.zalando.com/women-clothing-dresses/");
await page.content(10000);

const data = await page.evaluate(`(() => {
  const items = [];
  document.querySelectorAll("[data-testid='product-tile']").forEach(el => {
    const brand = el.querySelector("[data-testid='product-tile-brand']")?.textContent?.trim();
    const name = el.querySelector("[data-testid='product-tile-name']")?.textContent?.trim();
    const price = el.querySelector("[data-testid='product-tile-price']")?.textContent?.trim();
    if (brand) items.push({ brand, name, price });
  });
  return JSON.stringify({ total: items.length, items: items.slice(0, 10) });
})()`);

console.log(JSON.parse(data));
await spider.close();
