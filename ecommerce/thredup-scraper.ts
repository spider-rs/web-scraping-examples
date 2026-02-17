/**
 * ThredUp Scraper
 *
 * Extract secondhand fashion listings, brand details, condition grades, and pricin
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx thredup-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
});

await spider.connect();
const page = spider.page!;
await page.goto("https://www.thredup.com/women/dresses");
await page.content();

const data = await page.evaluate(`(() => {
  const items = [];
  document.querySelectorAll("[data-testid='product-card']").forEach(el => {
    const brand = el.querySelector("[data-testid='product-card-brand']")?.textContent?.trim();
    const name = el.querySelector("[data-testid='product-card-title']")?.textContent?.trim();
    const price = el.querySelector("[data-testid='product-card-price']")?.textContent?.trim();
    const size = el.querySelector("[data-testid='product-card-size']")?.textContent?.trim();
    if (name) items.push({ brand, name, price, size });
  });
  return JSON.stringify({ total: items.length, items: items.slice(0, 10) });
})()`);

console.log(JSON.parse(data));
await spider.close();
