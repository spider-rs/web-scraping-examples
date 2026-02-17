/**
 * Ryanair Scraper
 *
 * Extract budget European flight fares, priority boarding options, and route avail
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx ryanair-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
});

await spider.connect();
const page = spider.page!;
await page.goto("https://www.ryanair.com/gb/en/trip/flights/select?adults=1&teens=0&children=0&infants=0&dateOut=2026-07-01&dateIn=&isReturn=false&originIata=STN&destinationIata=DUB");
await page.content(15000);

const data = await page.evaluate(`(() => {
  const flights = [];
  document.querySelectorAll("[class*='flight-card'], [data-e2e='flight-card']").forEach(el => {
    const flightNum = el.querySelector("[class*='flight-info__flight']")?.textContent?.trim();
    const depart = el.querySelector("[class*='flight-info__hour']:first-child")?.textContent?.trim();
    const arrive = el.querySelector("[class*='flight-info__hour']:last-child")?.textContent?.trim();
    const duration = el.querySelector("[class*='flight-info__duration']")?.textContent?.trim();
    const price = el.querySelector("[class*='price__amount'], [data-e2e='flight-card-price']")?.textContent?.trim();
    if (price) flights.push({ flightNum, depart, arrive, duration, price });
  });
  return JSON.stringify({ total: flights.length, flights: flights.slice(0, 10) });
})()`);

console.log(JSON.parse(data));
await spider.close();
