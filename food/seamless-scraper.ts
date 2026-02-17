/**
 * Seamless Scraper
 *
 * Extract restaurant listings, corporate catering menus, and group ordering option
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx seamless-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
});

await spider.connect();
const page = spider.page!;
await page.goto("https://www.seamless.com/food-delivery/ny-new-york");
await page.content(10000);

const data = await page.evaluate(`(() => {
  const restaurants = [];
  document.querySelectorAll("[data-testid='restaurant-card']").forEach(el => {
    const name = el.querySelector("[data-testid='restaurant-name']")?.textContent?.trim();
    const rating = el.querySelector("[data-testid='restaurant-rating']")?.textContent?.trim();
    const fee = el.querySelector("[data-testid='delivery-fee']")?.textContent?.trim();
    const eta = el.querySelector("[data-testid='delivery-estimate']")?.textContent?.trim();
    if (name) restaurants.push({ name, rating, fee, eta });
  });
  return JSON.stringify({ total: restaurants.length, restaurants: restaurants.slice(0, 10) });
})()`);

console.log(JSON.parse(data));
await spider.close();
