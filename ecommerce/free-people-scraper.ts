/**
 * Free People Scraper
 *
 * Extract bohemian fashion listings, pricing, color variants, and style details fr
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx free-people-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
});

await spider.init();
const page = spider.page!;
await page.goto("https://www.freepeople.com/sale-all/");
await page.content();

const data = await page.evaluate(`(() => {
  const items = [];
  document.querySelectorAll("[data-testid='product-card']").forEach(el => {
    const name = el.querySelector("[data-testid='product-card-title']")?.textContent?.trim();
    const price = el.querySelector("[data-testid='product-card-price'] .c-pwa-product-price__current")?.textContent?.trim();
    const originalPrice = el.querySelector("[data-testid='product-card-price'] .c-pwa-product-price__original")?.textContent?.trim();
    if (name) items.push({ name, price, originalPrice });
  });
  return JSON.stringify({ total: items.length, items: items.slice(0, 10) });
})()`);

console.log(JSON.parse(data));
await spider.close();
