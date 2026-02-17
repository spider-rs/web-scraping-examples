/**
 * Coles Scraper
 *
 * Extract grocery listings, pricing in AUD, weekly specials, and stock availabilit
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx coles-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
});

await spider.connect();
const page = spider.page!;
await page.goto("https://www.coles.com.au/browse/fruit-vegetables");
await page.content(10000);

const data = await page.evaluate(`(() => {
  const items = [];
  document.querySelectorAll("[data-testid='product-tile']").forEach(el => {
    const name = el.querySelector("[data-testid='product-title']")?.textContent?.trim();
    const price = el.querySelector("[data-testid='product-pricing']")?.textContent?.trim();
    const promo = el.querySelector("[data-testid='product-promo']")?.textContent?.trim();
    if (name) items.push({ name, price, promo });
  });
  return JSON.stringify({ total: items.length, items: items.slice(0, 10) });
})()`);

console.log(JSON.parse(data));
await spider.close();
