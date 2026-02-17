/**
 * Lululemon Scraper
 *
 * Extract athletic apparel listings, fabric details, sizing info, and pricing from
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx lululemon-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
});

await spider.connect();
const page = spider.page!;
await page.goto("https://shop.lululemon.com/c/womens-leggings/_/N-8s6");
await page.content(10000);

const data = await page.evaluate(`(() => {
  const items = [];
  document.querySelectorAll("[data-lulu-comp='ProductCard']").forEach(el => {
    const name = el.querySelector(".product-card__name")?.textContent?.trim();
    const price = el.querySelector(".product-card__price")?.textContent?.trim();
    const colors = el.querySelector(".product-card__swatches-count")?.textContent?.trim();
    if (name) items.push({ name, price, colors });
  });
  return JSON.stringify({ total: items.length, items: items.slice(0, 10) });
})()`);

console.log(JSON.parse(data));
await spider.close();
