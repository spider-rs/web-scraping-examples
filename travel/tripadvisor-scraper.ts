/**
 * TripAdvisor Restaurants Scraper
 *
 * Extract restaurant listings from TripAdvisor — name, rating, reviews,
 * and cuisine type. Handles dynamic content with stealth browsing.
 *
 * Uses `evaluate()` to iterate over multiple restaurant elements.
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx tripadvisor-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
});
await spider.connect();
const page = spider.page!;

await page.goto(
  "https://www.tripadvisor.com/Restaurants-g60763-New_York_City_New_York.html",
);
await page.content(10000);

const data = await page.evaluate(`(() => {
  const restaurants = [];
  document.querySelectorAll("[data-test='listItem']").forEach(el => {
    const name = el.querySelector("[data-test='listItem-title'] a")?.textContent?.trim();
    const rating = el.querySelector("[data-test='rating']")?.getAttribute("aria-label");
    const reviews = el.querySelector("[data-test='reviewCount']")?.textContent?.trim();
    const cuisine = el.querySelector("[data-test='cuisine']")?.textContent?.trim();
    if (name) restaurants.push({ name, rating, reviews, cuisine });
  });
  return JSON.stringify({ total: restaurants.length, restaurants: restaurants.slice(0, 10) });
})()`);

console.log(JSON.parse(data as string));
await spider.close();
