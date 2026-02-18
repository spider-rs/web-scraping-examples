/**
 * ThredUp Classifieds Scraper
 *
 * Extract secondhand clothing listings, brand data, pricing tiers, and condition g
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx thredup-classifieds-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
});

await spider.init();
const page = spider.page!;
await page.goto("https://www.thredup.com/women/dresses");
await page.content(10000);

const data = await page.evaluate(`(() => {
  const items = [];
  document.querySelectorAll("[data-testid='product-card']").forEach(el => {
    const brand = el.querySelector("[data-testid='product-brand']")?.textContent?.trim();
    const title = el.querySelector("[data-testid='product-title']")?.textContent?.trim();
    const price = el.querySelector("[data-testid='product-price']")?.textContent?.trim();
    const condition = el.querySelector("[data-testid='product-condition']")?.textContent?.trim();
    if (title) items.push({ brand, title, price, condition });
  });
  return JSON.stringify({ total: items.length, items: items.slice(0, 10) });
})()`);

console.log(JSON.parse(data));
await spider.close();
