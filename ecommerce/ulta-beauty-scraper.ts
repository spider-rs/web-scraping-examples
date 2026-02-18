/**
 * Ulta Beauty Scraper
 *
 * Extract beauty product listings, brand info, pricing, and reward point values fr
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx ulta-beauty-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
});

await spider.init();
const page = spider.page!;
await page.goto("https://www.ulta.com/shop/makeup/face/foundation");
await page.content();

const data = await page.evaluate(`(() => {
  const items = [];
  document.querySelectorAll("[data-testid='ProductCard']").forEach(el => {
    const brand = el.querySelector("[data-testid='ProductCard-brand']")?.textContent?.trim();
    const name = el.querySelector("[data-testid='ProductCard-name']")?.textContent?.trim();
    const price = el.querySelector("[data-testid='ProductCard-price']")?.textContent?.trim();
    const rating = el.querySelector("[data-testid='ProductCard-rating']")?.getAttribute("aria-label");
    if (name) items.push({ brand, name, price, rating });
  });
  return JSON.stringify({ total: items.length, items: items.slice(0, 10) });
})()`);

console.log(JSON.parse(data));
await spider.close();
