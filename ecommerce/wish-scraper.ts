/**
 * Wish Scraper
 *
 * Extract discount marketplace listings, seller info, pricing, and shipping estima
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx wish-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
});

await spider.init();
const page = spider.page!;
await page.goto("https://www.wish.com/search/wireless-earbuds");
await page.content(10000);

const data = await page.evaluate(`(() => {
  const items = [];
  document.querySelectorAll("[data-testid='product-feed-item']").forEach(el => {
    const name = el.querySelector("[data-testid='product-feed-item-title']")?.textContent?.trim();
    const price = el.querySelector("[data-testid='product-feed-item-price']")?.textContent?.trim();
    const rating = el.querySelector("[data-testid='product-feed-item-rating']")?.textContent?.trim();
    if (name) items.push({ name, price, rating });
  });
  return JSON.stringify({ total: items.length, items: items.slice(0, 10) });
})()`);

console.log(JSON.parse(data));
await spider.close();
