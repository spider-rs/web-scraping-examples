/**
 * B&H Photo Scraper
 *
 * Extract camera and electronics listings, detailed specs, pricing, and stock data
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx bh-photo-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
});

await spider.init();
const page = spider.page!;
await page.goto("https://www.bhphotovideo.com/c/buy/Mirrorless-Cameras/ci/29912/N/4288586282");
await page.content();

const data = await page.evaluate(`(() => {
  const items = [];
  document.querySelectorAll("[data-selenium='miniProductPage']").forEach(el => {
    const name = el.querySelector("[data-selenium='miniProductPageName']")?.textContent?.trim();
    const price = el.querySelector("[data-selenium='uppedDecimalPriceFirst']")?.textContent?.trim();
    const rating = el.querySelector("[data-selenium='miniProductPageRating']")?.getAttribute("aria-label");
    if (name) items.push({ name, price, rating });
  });
  return JSON.stringify({ total: items.length, items: items.slice(0, 10) });
})()`);

console.log(JSON.parse(data));
await spider.close();
