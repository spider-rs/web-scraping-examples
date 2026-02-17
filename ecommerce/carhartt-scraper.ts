/**
 * Carhartt Scraper
 *
 * Scrape workwear product listings, durability specs, sizing charts, and pricing f
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx carhartt-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
});

await spider.connect();
const page = spider.page!;
await page.goto("https://www.carhartt.com/search?q=jacket");
await page.content();

const data = await page.evaluate(`(() => {
  const items = [];
  document.querySelectorAll(".product-tile").forEach(el => {
    const name = el.querySelector(".product-tile__name")?.textContent?.trim();
    const price = el.querySelector(".product-tile__price")?.textContent?.trim();
    const rating = el.querySelector(".product-tile__rating")?.getAttribute("aria-label");
    const colors = el.querySelectorAll(".product-tile__swatch").length;
    if (name) items.push({ name, price, rating, colorCount: colors });
  });
  return JSON.stringify({ total: items.length, items: items.slice(0, 10) });
})()`);

console.log(JSON.parse(data));
await spider.close();
