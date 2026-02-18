/**
 * Agoda Scraper
 *
 * Extract hotel listings, room rates, guest reviews, and property details from Ago
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx agoda-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
});

await spider.init();
const page = spider.page!;
await page.goto("https://www.agoda.com/search?city=17193&checkIn=2026-06-01&checkOut=2026-06-05");
await page.content(12000);

const data = await page.evaluate(`(() => {
  const hotels = [];
  document.querySelectorAll("[data-selenium='hotel-item']").forEach(el => {
    const name = el.querySelector("[data-selenium='hotel-name']")?.textContent?.trim();
    const price = el.querySelector("[data-selenium='display-price']")?.textContent?.trim();
    const rating = el.querySelector("[data-selenium='review-score']")?.textContent?.trim();
    const stars = el.querySelector("[data-selenium='star-rating']")?.children.length;
    if (name) hotels.push({ name, price, rating, stars });
  });
  return JSON.stringify({ total: hotels.length, hotels: hotels.slice(0, 10) });
})()`);

console.log(JSON.parse(data));
await spider.close();
