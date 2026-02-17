/**
 * Primark Scraper
 *
 * Extract budget fashion listings, store availability, collection info, and pricin
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx primark-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
});

await spider.connect();
const page = spider.page!;
await page.goto("https://www.primark.com/en-us/c/women/clothing/dresses");
await page.content();

const data = await page.evaluate(`(() => {
  const items = [];
  document.querySelectorAll(".product-card").forEach(el => {
    const name = el.querySelector(".product-card__name")?.textContent?.trim();
    const price = el.querySelector(".product-card__price")?.textContent?.trim();
    const image = el.querySelector(".product-card__image img")?.src;
    if (name) items.push({ name, price, image });
  });
  return JSON.stringify({ total: items.length, items: items.slice(0, 10) });
})()`);

console.log(JSON.parse(data));
await spider.close();
