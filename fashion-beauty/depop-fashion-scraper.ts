/**
 * Depop Fashion Scraper
 *
 * Extract secondhand fashion listings, seller profiles, pricing, and engagement da
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx depop-fashion-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
});

await spider.connect();
const page = spider.page!;
await page.goto("https://www.depop.com/search/?q=vintage+denim");
await page.content(10000);

const data = await page.evaluate(`(() => {
  const items = [];
  document.querySelectorAll("[data-testid='product-card']").forEach(el => {
    const name = el.querySelector("[data-testid='product-card__description']")?.textContent?.trim();
    const price = el.querySelector("[data-testid='product-card__price']")?.textContent?.trim();
    const seller = el.querySelector("[data-testid='product-card__seller']")?.textContent?.trim();
    if (name) items.push({ name, price, seller });
  });
  return JSON.stringify({ total: items.length, items: items.slice(0, 10) });
})()`);

console.log(JSON.parse(data));
await spider.close();
