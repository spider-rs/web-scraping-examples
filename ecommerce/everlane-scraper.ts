/**
 * Everlane Scraper
 *
 * Extract transparent pricing, ethical sourcing details, and clothing listings fro
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx everlane-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
});

await spider.connect();
const page = spider.page!;
await page.goto("https://www.everlane.com/collections/womens-tees");
await page.content();

const data = await page.evaluate(`(() => {
  const items = [];
  document.querySelectorAll("[data-testid='product-card']").forEach(el => {
    const name = el.querySelector("[data-testid='product-name']")?.textContent?.trim();
    const price = el.querySelector("[data-testid='product-price']")?.textContent?.trim();
    const colors = el.querySelectorAll("[data-testid='color-swatch']").length;
    if (name) items.push({ name, price, colorCount: colors });
  });
  return JSON.stringify({ total: items.length, items: items.slice(0, 12) });
})()`);

console.log(JSON.parse(data));
await spider.close();
