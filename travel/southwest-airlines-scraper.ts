/**
 * Southwest Airlines Scraper
 *
 * Extract flight schedules, fare classes, Rapid Rewards pricing, and route availab
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx southwest-airlines-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
});

await spider.init();
const page = spider.page!;
await page.goto("https://www.southwest.com/air/booking/select.html?originationAirportCode=DAL&destinationAirportCode=HOU&departureDate=2026-07-01");
await page.content(15000);

const data = await page.evaluate(`(() => {
  const flights = [];
  document.querySelectorAll("[class*='air-booking-select--flight-card']").forEach(el => {
    const flightNum = el.querySelector("[class*='flight-number']")?.textContent?.trim();
    const depart = el.querySelector("[class*='depart-time']")?.textContent?.trim();
    const arrive = el.querySelector("[class*='arrive-time']")?.textContent?.trim();
    const duration = el.querySelector("[class*='duration']")?.textContent?.trim();
    const price = el.querySelector("[class*='fare-amount']")?.textContent?.trim();
    const stops = el.querySelector("[class*='stops']")?.textContent?.trim();
    if (flightNum) flights.push({ flightNum, depart, arrive, duration, price, stops });
  });
  return JSON.stringify({ total: flights.length, flights: flights.slice(0, 10) });
})()`);

console.log(JSON.parse(data));
await spider.close();
