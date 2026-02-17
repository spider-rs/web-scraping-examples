/**
 * TheRealReal Scraper
 *
 * Extract luxury consignment listings, authentication details, condition grades, a
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx therealreal-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
});

await spider.connect();
const page = spider.page!;
await page.goto("https://www.therealreal.com/shop/women/handbags");
await page.content(10000);

const data = await page.evaluate(`(() => {
  const items = [];
  document.querySelectorAll("[data-testid='product-card']").forEach(el => {
    const designer = el.querySelector(".product-card__designer")?.textContent?.trim();
    const name = el.querySelector(".product-card__name")?.textContent?.trim();
    const price = el.querySelector(".product-card__price")?.textContent?.trim();
    const condition = el.querySelector(".product-card__condition")?.textContent?.trim();
    if (designer) items.push({ designer, name, price, condition });
  });
  return JSON.stringify({ total: items.length, items: items.slice(0, 10) });
})()`);

console.log(JSON.parse(data));
await spider.close();
