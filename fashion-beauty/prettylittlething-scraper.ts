/**
 * PrettyLittleThing Scraper
 *
 * Extract trendy fashion listings, pricing, discount info, and outfit collections 
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx prettylittlething-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
});

await spider.connect();
const page = spider.page!;
await page.goto("https://www.prettylittlething.us/dresses.html");
await page.content(10000);

const data = await page.evaluate(`(() => {
  const items = [];
  document.querySelectorAll(".product-item-info").forEach(el => {
    const name = el.querySelector(".product-item-link")?.textContent?.trim();
    const price = el.querySelector(".price")?.textContent?.trim();
    const link = el.querySelector(".product-item-link")?.getAttribute("href");
    if (name) items.push({ name, price, link });
  });
  return JSON.stringify({ total: items.length, items: items.slice(0, 10) });
})()`);

console.log(JSON.parse(data));
await spider.close();
