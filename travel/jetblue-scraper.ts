/**
 * JetBlue Scraper
 *
 * Extract flight availability, TrueBlue points pricing, fare bundles, and seat sel
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx jetblue-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
});

await spider.connect();
const page = spider.page!;
await page.goto("https://www.jetblue.com/booking/flights?from=BOS&to=FLL&depart=2026-06-15&isMultiCity=false&noOfRoute=1&lang=en&adults=1&children=0&infants=0");
await page.content(15000);

const data = await page.evaluate(`(() => {
  const flights = [];
  document.querySelectorAll("[class*='flight-card'], [data-qaid='flight']").forEach(el => {
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
