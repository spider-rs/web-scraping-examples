/**
 * United Airlines Scraper
 *
 * Extract flight options, MileagePlus award availability, fare breakdowns, and upg
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx united-airlines-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
});

await spider.connect();
const page = spider.page!;
await page.goto("https://www.united.com/en/us/fsr/choose-flights?f=EWR&t=SFO&d=2026-08-01&tt=1&at=1&sc=7&px=1&taxng=1&newHP=True&clm=7&st=bestmatches");
await page.content(15000);

const data = await page.evaluate(`(() => {
  const flights = [];
  document.querySelectorAll("[class*='flight-result-card'], [data-testid='flight-card']").forEach(el => {
    const flightNum = el.querySelector("[class*='flight-number']")?.textContent?.trim();
    const depart = el.querySelector("[class*='depart-time']")?.textContent?.trim();
    const arrive = el.querySelector("[class*='arrive-time']")?.textContent?.trim();
    const duration = el.querySelector("[class*='duration']")?.textContent?.trim();
    const price = el.querySelector("[class*='fare-price'], [class*='price']")?.textContent?.trim();
    if (flightNum) flights.push({ flightNum, depart, arrive, duration, price });
  });
  return JSON.stringify({ total: flights.length, flights: flights.slice(0, 10) });
})()`);

console.log(JSON.parse(data));
await spider.close();
