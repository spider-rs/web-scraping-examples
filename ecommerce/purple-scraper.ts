/**
 * Purple Scraper
 *
 * Extract mattress and comfort product data, GelFlex grid specs, and pricing from 
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx purple-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
});

await spider.init();
const page = spider.page!;
await page.goto("https://purple.com/mattresses");
await page.content();

const data = await page.evaluate(`(() => {
  const items = [];
  document.querySelectorAll(".product-tile").forEach(el => {
    const name = el.querySelector(".product-tile__name")?.textContent?.trim();
    const price = el.querySelector(".product-tile__price")?.textContent?.trim();
    const desc = el.querySelector(".product-tile__description")?.textContent?.trim();
    if (name) items.push({ name, price, desc });
  });
  return JSON.stringify({ total: items.length, items });
})()`);

console.log(JSON.parse(data));
await spider.close();
