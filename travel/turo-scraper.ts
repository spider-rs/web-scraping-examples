/**
 * Turo Scraper
 *
 * Extract peer-to-peer car rental listings, vehicle details, host ratings, and dai
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx turo-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
});

await spider.connect();
const page = spider.page!;
await page.goto("https://turo.com/us/en/search?location=Los+Angeles%2C+CA&startDate=2026-06-01&endDate=2026-06-05");
await page.content(12000);

const data = await page.evaluate(`(() => {
  const cars = [];
  document.querySelectorAll("[data-testid='search-result-card']").forEach(el => {
    const name = el.querySelector("[data-testid='vehicle-name']")?.textContent?.trim();
    const price = el.querySelector("[data-testid='daily-price']")?.textContent?.trim();
    const rating = el.querySelector("[data-testid='host-rating']")?.textContent?.trim();
    const trips = el.querySelector("[data-testid='trip-count']")?.textContent?.trim();
    if (name) cars.push({ name, price, rating, trips });
  });
  return JSON.stringify({ total: cars.length, cars: cars.slice(0, 10) });
})()`);

console.log(JSON.parse(data));
await spider.close();
