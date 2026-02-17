/**
 * Just Eat Scraper
 *
 * Extract takeaway restaurant listings, menus, delivery zones, and customer rating
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx just-eat-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
});

await spider.connect();
const page = spider.page!;
await page.goto("https://www.just-eat.co.uk/area/se1-london");
await page.content(10000);

const data = await page.evaluate(`(() => {
  const restaurants = [];
  document.querySelectorAll("[data-test-id='restaurant-tile']").forEach(el => {
    const name = el.querySelector("[data-test-id='restaurant-name']")?.textContent?.trim();
    const rating = el.querySelector("[data-test-id='restaurant-rating']")?.textContent?.trim();
    const cuisines = el.querySelector("[data-test-id='restaurant-cuisines']")?.textContent?.trim();
    const eta = el.querySelector("[data-test-id='restaurant-eta']")?.textContent?.trim();
    if (name) restaurants.push({ name, rating, cuisines, eta });
  });
  return JSON.stringify({ total: restaurants.length, restaurants: restaurants.slice(0, 10) });
})()`);

console.log(JSON.parse(data));
await spider.close();
