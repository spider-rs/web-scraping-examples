/**
 * Dr. Martens Scraper
 *
 * Scrape boots and footwear listings, leather types, sole technology, and pricing 
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx dr-martens-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
});

await spider.connect();
const page = spider.page!;
await page.goto("https://www.drmartens.com/us/en/boots/");
await page.content();

const data = await page.evaluate(`(() => {
  const items = [];
  document.querySelectorAll(".product-grid__item").forEach(el => {
    const name = el.querySelector(".product-card__title")?.textContent?.trim();
    const price = el.querySelector(".product-card__price")?.textContent?.trim();
    const leather = el.querySelector(".product-card__leather")?.textContent?.trim();
    if (name) items.push({ name, price, leather });
  });
  return JSON.stringify({ total: items.length, items: items.slice(0, 10) });
})()`);

console.log(JSON.parse(data));
await spider.close();
