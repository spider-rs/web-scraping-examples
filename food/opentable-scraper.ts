/**
 * OpenTable Scraper
 *
 * Scrapes restaurant reservations from OpenTable platform.
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx food/opentable-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
});
await spider.connect();
const page = spider.page!;

await page.goto("https://www.opentable.com/s?covers=2");
await page.content();
const data = await page.evaluate(`(() => {
  const restaurants = Array.from(document.querySelectorAll('[data-test="restaurant-item"]')).map(el => ({
    name: el.querySelector('[data-test="restaurant-name"]')?.textContent?.trim(),
    cuisine: el.querySelector('[data-test="cuisine"]')?.textContent?.trim(),
    rating: el.querySelector('[data-test="rating"]')?.textContent?.trim(),
    availability: el.querySelector('[data-test="availability"]')?.textContent?.trim(),
  }));
  return JSON.stringify({ restaurants });
})()`);
console.log(JSON.parse(data));
await spider.close();
