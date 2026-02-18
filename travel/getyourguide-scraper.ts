/**
 * GetYourGuide Scraper
 *
 * Extract bookable activities, guided tours, ticket pricing, and traveler ratings 
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx getyourguide-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
});

await spider.init();
const page = spider.page!;
await page.goto("https://www.getyourguide.com/barcelona-l45/");
await page.content(10000);

const data = await page.evaluate(`(() => {
  const activities = [];
  document.querySelectorAll("[data-activity-card-id]").forEach(el => {
    const name = el.querySelector("[data-test='activity-card-title']")?.textContent?.trim();
    const price = el.querySelector("[data-test='activity-card-price']")?.textContent?.trim();
    const rating = el.querySelector("[data-test='activity-card-rating']")?.textContent?.trim();
    const duration = el.querySelector("[data-test='activity-card-duration']")?.textContent?.trim();
    if (name) activities.push({ name, price, rating, duration });
  });
  return JSON.stringify({ total: activities.length, activities: activities.slice(0, 10) });
})()`);

console.log(JSON.parse(data));
await spider.close();
