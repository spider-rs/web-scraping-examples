/**
 * Uber Eats Scraper
 *
 * Scrapes pizza restaurant listings from Uber Eats delivery service.
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx food/ubereats-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
});
await spider.init();
const page = spider.page!;

await page.goto("https://www.ubereats.com/category/new-york-ny/pizza");
await page.content();
const data = await page.evaluate(`(() => {
  const restaurants = Array.from(document.querySelectorAll('[data-test="restaurant-card"]')).map(el => ({
    name: el.querySelector('[data-test="restaurant-name"]')?.textContent?.trim(),
    rating: el.querySelector('[data-test="rating"]')?.textContent?.trim(),
    deliveryFee: el.querySelector('[data-test="delivery-fee"]')?.textContent?.trim(),
    deliveryTime: el.querySelector('[data-test="delivery-time"]')?.textContent?.trim(),
  }));
  return JSON.stringify({ restaurants });
})()`);
console.log(JSON.parse(data));
await spider.close();
