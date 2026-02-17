/**
 * Decluttr Scraper
 *
 * Extract refurbished tech listings, buyback quotes, device grades, and pricing fr
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx decluttr-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
});

await spider.connect();
const page = spider.page!;
await page.goto("https://www.decluttr.com/us/buy/phones/apple/");
await page.content();

const data = await page.evaluate(`(() => {
  const items = [];
  document.querySelectorAll(".product-card").forEach(el => {
    const name = el.querySelector(".product-card__title")?.textContent?.trim();
    const price = el.querySelector(".product-card__price")?.textContent?.trim();
    const grade = el.querySelector(".product-card__grade")?.textContent?.trim();
    if (name) items.push({ name, price, grade });
  });
  return JSON.stringify({ total: items.length, items: items.slice(0, 10) });
})()`);

console.log(JSON.parse(data));
await spider.close();
