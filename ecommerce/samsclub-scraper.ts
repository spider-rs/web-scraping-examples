/**
 * 
 *
 * 
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx samsclub-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
});

await spider.connect();
const page = spider.page!;
await page.goto("https://www.samsclub.com/b/laptops/2080202");
await page.content();

const data = await page.evaluate(`(() => {
  const items = [];
  document.querySelectorAll("[data-testid='item-tile']").forEach(el => {
    const name = el.querySelector("[data-testid='item-title']")?.textContent?.trim();
    const price = el.querySelector("[data-testid='item-price']")?.textContent?.trim();
    const rating = el.querySelector("[data-testid='item-rating']")?.textContent?.trim();
    if (name) items.push({ name, price, rating });
  });
  return JSON.stringify({ total: items.length, items: items.slice(0, 10) });
})()`);

console.log(JSON.parse(data));
await spider.close();
