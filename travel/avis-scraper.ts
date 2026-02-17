/**
 * Avis Scraper
 *
 * Extract rental car inventory, vehicle categories, pricing tiers, and location av
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx avis-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
});

await spider.connect();
const page = spider.page!;
await page.goto("https://www.avis.com/en/reserve?pickUpDate=2026-06-01&returnDate=2026-06-05&pickUpLocation=JFK");
await page.content(12000);

const data = await page.evaluate(`(() => {
  const vehicles = [];
  document.querySelectorAll(".vehicle-card").forEach(el => {
    const type = el.querySelector(".vehicle-name")?.textContent?.trim();
    const rate = el.querySelector(".daily-rate")?.textContent?.trim();
    const total = el.querySelector(".total-price")?.textContent?.trim();
    const seats = el.querySelector(".passenger-info")?.textContent?.trim();
    const features = el.querySelector(".vehicle-features")?.textContent?.trim();
    if (type) vehicles.push({ type, rate, total, seats, features });
  });
  return JSON.stringify({ total: vehicles.length, vehicles: vehicles.slice(0, 10) });
})()`);

console.log(JSON.parse(data));
await spider.close();
