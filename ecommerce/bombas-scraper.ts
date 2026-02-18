/**
 * Bombas Scraper
 *
 * Extract sock and apparel listings, comfort features, donation stats, and bundle 
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx bombas-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
});

await spider.init();
const page = spider.page!;
await page.goto("https://bombas.com/collections/mens-ankle-socks");
await page.content();

const data = await page.evaluate(`(() => {
  const items = [];
  document.querySelectorAll(".product-card").forEach(el => {
    const name = el.querySelector(".product-card__title")?.textContent?.trim();
    const price = el.querySelector(".product-card__price")?.textContent?.trim();
    const rating = el.querySelector(".product-card__stars")?.getAttribute("aria-label");
    if (name) items.push({ name, price, rating });
  });
  return JSON.stringify({ total: items.length, items: items.slice(0, 10) });
})()`);

console.log(JSON.parse(data));
await spider.close();
