/**
 * ChowNow Scraper
 *
 * Extract local restaurant ordering pages, menu items, and direct-order pricing fr
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx chownow-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
});

await spider.init();
const page = spider.page!;
await page.goto("https://ordering.chownow.com/order/restaurant-name/locations");
await page.content();

const data = await page.evaluate(`(() => {
  const items = [];
  document.querySelectorAll(".menu-item-card").forEach(el => {
    const name = el.querySelector(".menu-item-name")?.textContent?.trim();
    const price = el.querySelector(".menu-item-price")?.textContent?.trim();
    const desc = el.querySelector(".menu-item-description")?.textContent?.trim();
    if (name) items.push({ name, price, description: desc?.slice(0, 150) });
  });
  return JSON.stringify({ total: items.length, items: items.slice(0, 15) });
})()`);

console.log(JSON.parse(data));
await spider.close();
