/**
 * Trip.com Scraper
 *
 * Extract global hotel inventory, flight bookings, and travel package deals from T
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx trip-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
});

await spider.init();
const page = spider.page!;
await page.goto("https://www.trip.com/hotels/list?city=318&checkin=2026-06-01&checkout=2026-06-05");
await page.content(12000);

const data = await page.evaluate(`(() => {
  const hotels = [];
  document.querySelectorAll(".hotel-list-card").forEach(el => {
    const name = el.querySelector(".hotel-card-name")?.textContent?.trim();
    const price = el.querySelector(".hotel-card-price")?.textContent?.trim();
    const rating = el.querySelector(".hotel-card-score")?.textContent?.trim();
    const stars = el.querySelector(".hotel-card-star")?.children.length;
    const location = el.querySelector(".hotel-card-location")?.textContent?.trim();
    if (name) hotels.push({ name, price, rating, stars, location });
  });
  return JSON.stringify({ total: hotels.length, hotels: hotels.slice(0, 10) });
})()`);

console.log(JSON.parse(data));
await spider.close();
