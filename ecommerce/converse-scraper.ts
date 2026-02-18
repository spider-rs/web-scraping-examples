/**
 * Converse Scraper
 *
 * Scrape sneaker listings, Chuck Taylor variations, custom design options, and pri
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx converse-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
});

await spider.init();
const page = spider.page!;
await page.goto("https://www.converse.com/shop/chuck-taylor-all-star");
await page.content();

const data = await page.evaluate(`(() => {
  const items = [];
  document.querySelectorAll(".product-card").forEach(el => {
    const name = el.querySelector(".product-card__title")?.textContent?.trim();
    const price = el.querySelector(".product-card__price")?.textContent?.trim();
    const colors = el.querySelectorAll(".product-card__swatch").length;
    const badge = el.querySelector(".product-card__badge")?.textContent?.trim();
    if (name) items.push({ name, price, colorCount: colors, badge });
  });
  return JSON.stringify({ total: items.length, items: items.slice(0, 10) });
})()`);

console.log(JSON.parse(data));
await spider.close();
