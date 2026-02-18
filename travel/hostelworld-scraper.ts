/**
 * Hostelworld Scraper
 *
 * Extract hostel listings, dorm bed pricing, traveler ratings, and social atmosphe
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx hostelworld-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
});

await spider.init();
const page = spider.page!;
await page.goto("https://www.hostelworld.com/st/hostels/p/1/s?q=Bangkok&country=Thailand&dateFrom=2026-06-01&dateTo=2026-06-05");
await page.content(10000);

const data = await page.evaluate(`(() => {
  const hostels = [];
  document.querySelectorAll("[data-testid='property-card']").forEach(el => {
    const name = el.querySelector("[data-testid='property-name']")?.textContent?.trim();
    const price = el.querySelector("[data-testid='price-value']")?.textContent?.trim();
    const rating = el.querySelector("[data-testid='rating-score']")?.textContent?.trim();
    const atmosphere = el.querySelector("[data-testid='atmosphere-score']")?.textContent?.trim();
    if (name) hostels.push({ name, price, rating, atmosphere });
  });
  return JSON.stringify({ total: hostels.length, hostels: hostels.slice(0, 10) });
})()`);

console.log(JSON.parse(data));
await spider.close();
