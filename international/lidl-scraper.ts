/**
 * Lidl Scraper
 *
 * Extract weekly offers, product listings, pricing, and store specials from Lidl d
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx lidl-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
});

await spider.init();
const page = spider.page!;
await page.goto("https://www.lidl.com/weekly-ad");
await page.content(10000);

const data = await page.evaluate(`(() => {
  const items = [];
  document.querySelectorAll(".product-card").forEach(el => {
    const name = el.querySelector(".product-card__title")?.textContent?.trim();
    const price = el.querySelector(".product-card__price")?.textContent?.trim();
    const category = el.querySelector(".product-card__category")?.textContent?.trim();
    const image = el.querySelector("img")?.src;
    if (name) items.push({ name, price, category, image });
  });
  return JSON.stringify({ total: items.length, items: items.slice(0, 10) });
})()`);

console.log(JSON.parse(data));
await spider.close();
