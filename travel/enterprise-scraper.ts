/**
 * Enterprise Scraper
 *
 * Extract rental car inventory, vehicle options, branch locations, and pricing tie
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx enterprise-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
});

await spider.init();
const page = spider.page!;
await page.goto("https://www.enterprise.com/en/car-rental/locations/us/los-angeles-airport-lax.html");
await page.content(10000);

const data = await page.evaluate(`(() => {
  const vehicles = [];
  document.querySelectorAll(".vehicle-card").forEach(el => {
    const type = el.querySelector(".vehicle-card-title")?.textContent?.trim();
    const rate = el.querySelector(".daily-rate-value")?.textContent?.trim();
    const seats = el.querySelector(".passenger-count")?.textContent?.trim();
    const luggage = el.querySelector(".luggage-count")?.textContent?.trim();
    if (type) vehicles.push({ type, rate, seats, luggage });
  });
  return JSON.stringify({ total: vehicles.length, vehicles: vehicles.slice(0, 10) });
})()`);

console.log(JSON.parse(data));
await spider.close();
