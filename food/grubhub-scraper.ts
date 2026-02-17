/**
 * Grubhub Scraper
 *
 * Extract restaurant listings, menu items, delivery fees, and estimated arrival ti
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx grubhub-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
});

await spider.connect();
const page = spider.page!;
await page.goto("https://www.grubhub.com/delivery/ny-new-york");
await page.content(10000);

const data = await page.evaluate(`(() => {
  const restaurants = [];
  document.querySelectorAll("[data-testid='restaurant-card']").forEach(el => {
    const name = el.querySelector("[data-testid='restaurant-name']")?.textContent?.trim();
    const rating = el.querySelector("[data-testid='restaurant-rating']")?.textContent?.trim();
    const time = el.querySelector("[data-testid='delivery-estimate']")?.textContent?.trim();
    const fee = el.querySelector("[data-testid='delivery-fee']")?.textContent?.trim();
    if (name) restaurants.push({ name, rating, time, fee });
  });
  return JSON.stringify({ total: restaurants.length, restaurants: restaurants.slice(0, 10) });
})()`);

console.log(JSON.parse(data));
await spider.close();
