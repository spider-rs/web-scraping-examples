/**
 * Swappa Scraper
 *
 * Extract used electronics listings, device conditions, pricing history, and selle
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx swappa-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
});

await spider.init();
const page = spider.page!;
await page.goto("https://swappa.com/buy/apple-iphone-15-pro");
await page.content();

const data = await page.evaluate(`(() => {
  const listings = [];
  document.querySelectorAll(".listing_row").forEach(el => {
    const device = el.querySelector(".listing_title")?.textContent?.trim();
    const price = el.querySelector(".listing_price")?.textContent?.trim();
    const condition = el.querySelector(".listing_condition")?.textContent?.trim();
    const storage = el.querySelector(".listing_storage")?.textContent?.trim();
    if (device) listings.push({ device, price, condition, storage });
  });
  return JSON.stringify({ total: listings.length, listings: listings.slice(0, 10) });
})()`);

console.log(JSON.parse(data));
await spider.close();
