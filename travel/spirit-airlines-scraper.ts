/**
 * Spirit Airlines Scraper
 *
 * Extract ultra-low-cost flight fares, bundle options, ancillary pricing, and rout
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx spirit-airlines-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
});

await spider.connect();
const page = spider.page!;
await page.goto("https://www.spirit.com/book/flights?orgCode=FLL&destCode=LGA&departDate=2026-07-20&ADT=1&returnDate=&promoCode=&UMNR=0");
await page.content(12000);

const data = await page.evaluate(`(() => {
  const flights = [];
  document.querySelectorAll("[class*='flight-result'], [class*='FlightCard']").forEach(el => {
    const flightNum = el.querySelector("[class*='flight-number']")?.textContent?.trim();
    const depart = el.querySelector("[class*='depart']")?.textContent?.trim();
    const arrive = el.querySelector("[class*='arrive']")?.textContent?.trim();
    const duration = el.querySelector("[class*='duration']")?.textContent?.trim();
    const fare = el.querySelector("[class*='fare'], [class*='price']")?.textContent?.trim();
    const stops = el.querySelector("[class*='stops']")?.textContent?.trim();
    if (flightNum) flights.push({ flightNum, depart, arrive, duration, fare, stops });
  });
  return JSON.stringify({ total: flights.length, flights: flights.slice(0, 10) });
})()`);

console.log(JSON.parse(data));
await spider.close();
