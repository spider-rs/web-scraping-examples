/**
 * Flightradar24 Travel Scraper
 *
 * Extract live flight tracking data, aircraft positions, route histories, and airp
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx flightradar24-travel-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
});

await spider.connect();
const page = spider.page!;
await page.goto("https://www.flightradar24.com/data/flights/ua100");
await page.content(10000);

const data = await page.evaluate(`(() => {
  const flights = [];
  document.querySelectorAll("[data-testid='flight-row'], .data-row").forEach(el => {
    const date = el.querySelector(".date-cell, td:nth-child(1)")?.textContent?.trim();
    const origin = el.querySelector(".origin-cell, td:nth-child(2)")?.textContent?.trim();
    const destination = el.querySelector(".destination-cell, td:nth-child(3)")?.textContent?.trim();
    const aircraft = el.querySelector(".aircraft-cell, td:nth-child(4)")?.textContent?.trim();
    const status = el.querySelector(".status-cell, td:nth-child(7)")?.textContent?.trim();
    if (origin) flights.push({ date, origin, destination, aircraft, status });
  });
  return JSON.stringify({ total: flights.length, flights: flights.slice(0, 10) });
})()`);

console.log(JSON.parse(data));
await spider.close();
