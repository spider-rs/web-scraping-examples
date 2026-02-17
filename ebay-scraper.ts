/**
 * eBay Listings Scraper
 *
 * Extract auction and buy-it-now listings from eBay category pages —
 * title, price, shipping, and condition.
 *
 * Uses `evaluate()` to iterate over multiple listing elements.
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx ebay-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
});
await spider.connect();
const page = spider.page!;

await page.goto("https://www.ebay.com/b/Apple-AirPods-Pro/80077/bn_7116427158");
await page.content();

const data = await page.evaluate(`(() => {
  const items = [];
  document.querySelectorAll(".s-item").forEach(el => {
    const title = el.querySelector(".s-item__title span")?.textContent?.trim();
    const price = el.querySelector(".s-item__price")?.textContent?.trim();
    const shipping = el.querySelector(".s-item__shipping")?.textContent?.trim();
    const condition = el.querySelector(".SECONDARY_INFO")?.textContent?.trim();
    if (title && title !== "Shop on eBay") items.push({ title, price, shipping, condition });
  });
  return JSON.stringify({ total: items.length, items: items.slice(0, 10) });
})()`);

console.log(JSON.parse(data as string));
await spider.close();
