/**
 * Uniqlo Scraper
 *
 * Extract essential apparel listings, fabric technology details, pricing, and colo
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx uniqlo-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
});

await spider.connect();
const page = spider.page!;
await page.goto("https://www.uniqlo.com/us/en/men/tops/t-shirts");
await page.content(10000);

const data = await page.evaluate(`(() => {
  const items = [];
  document.querySelectorAll("[data-test='product-card']").forEach(el => {
    const name = el.querySelector("[data-test='product-card-title']")?.textContent?.trim();
    const price = el.querySelector("[data-test='product-card-price']")?.textContent?.trim();
    const colors = el.querySelector("[data-test='product-card-chip-group']")?.childElementCount;
    if (name) items.push({ name, price, colorCount: colors });
  });
  return JSON.stringify({ total: items.length, items: items.slice(0, 10) });
})()`);

console.log(JSON.parse(data));
await spider.close();
