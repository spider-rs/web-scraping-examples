/**
 * 
 *
 * 
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx harrys-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
});

await spider.connect();
const page = spider.page!;
await page.goto("https://www.harrys.com/en/us/products");
await page.content();

const data = await page.evaluate(`(() => {
  const items = [];
  document.querySelectorAll(".product-card").forEach(el => {
    const name = el.querySelector(".product-card__name")?.textContent?.trim();
    const price = el.querySelector(".product-card__price")?.textContent?.trim();
    const desc = el.querySelector(".product-card__desc")?.textContent?.trim();
    if (name) items.push({ name, price, desc });
  });
  return JSON.stringify({ total: items.length, items: items.slice(0, 10) });
})()`);

console.log(JSON.parse(data));
await spider.close();
