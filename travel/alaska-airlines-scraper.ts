/**
 * Alaska Airlines Scraper
 *
 * Extract flight availability, Mileage Plan award pricing, fare classes, and route
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx alaska-airlines-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
});

await spider.connect();
const page = spider.page!;
await page.goto("https://www.alaskaair.com/shopping/flights?fbc=&lvl=&A=1&C=0&L=0&FT=ow&O=SEA&D=LAX&OD=2026-08-01");
await page.content(15000);

const data = await page.evaluate(`(() => {
  const flights = [];
  document.querySelectorAll("[class*='flight-result'], [class*='FlightCard']").forEach(el => {
    const flightNum = el.querySelector("[class*='flight-number']")?.textContent?.trim();
    const depart = el.querySelector("[class*='depart-time']")?.textContent?.trim();
    const arrive = el.querySelector("[class*='arrive-time']")?.textContent?.trim();
    const duration = el.querySelector("[class*='duration']")?.textContent?.trim();
    const price = el.querySelector("[class*='price'], [class*='fare']")?.textContent?.trim();
    const stops = el.querySelector("[class*='stops']")?.textContent?.trim();
    if (flightNum) flights.push({ flightNum, depart, arrive, duration, price, stops });
  });
  return JSON.stringify({ total: flights.length, flights: flights.slice(0, 10) });
})()`);

console.log(JSON.parse(data));
await spider.close();
