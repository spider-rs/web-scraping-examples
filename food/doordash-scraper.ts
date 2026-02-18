/**
 * DoorDash Scraper
 *
 * Scrapes restaurant listings from DoorDash delivery service.
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx food/doordash-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
});
await spider.init();
const page = spider.page!;

await page.goto("https://www.doordash.com/food-delivery/san-francisco-ca-restaurants/");
await page.content();
const data = await page.evaluate(`(() => {
  const restaurants = Array.from(document.querySelectorAll('[data-test="restaurant-card"]')).map(el => ({
    name: el.querySelector('[data-test="restaurant-name"]')?.textContent?.trim(),
    cuisine: el.querySelector('[data-test="cuisine"]')?.textContent?.trim(),
    rating: el.querySelector('[data-test="rating"]')?.textContent?.trim(),
    deliveryTime: el.querySelector('[data-test="delivery-time"]')?.textContent?.trim(),
    minOrder: el.querySelector('[data-test="min-order"]')?.textContent?.trim(),
  }));
  return JSON.stringify({ restaurants });
})()`);
console.log(JSON.parse(data));
await spider.close();
