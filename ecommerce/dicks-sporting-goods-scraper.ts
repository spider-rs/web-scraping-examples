/**
 * 
 *
 * 
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx dicks-sporting-goods-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
});

await spider.connect();
const page = spider.page!;
await page.goto("https://www.dickssportinggoods.com/c/running-shoes");
await page.content();

const data = await page.evaluate(`(() => {
  const items = [];
  document.querySelectorAll("[data-testid='product-card']").forEach(el => {
    const brand = el.querySelector("[data-testid='product-card-brand']")?.textContent?.trim();
    const name = el.querySelector("[data-testid='product-card-description']")?.textContent?.trim();
    const price = el.querySelector("[data-testid='product-card-price']")?.textContent?.trim();
    const rating = el.querySelector("[data-testid='product-card-rating']")?.getAttribute("aria-label");
    if (name) items.push({ brand, name, price, rating });
  });
  return JSON.stringify({ total: items.length, items: items.slice(0, 10) });
})()`);

console.log(JSON.parse(data));
await spider.close();
