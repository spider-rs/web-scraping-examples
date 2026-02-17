/**
 * Momondo Scraper
 *
 * Extract flight comparisons, fare breakdowns, and multi-airline pricing from Momo
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx momondo-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
});

await spider.connect();
const page = spider.page!;
await page.goto("https://www.momondo.com/flight-search/LON-PAR/2026-07-01");
await page.content(15000);

const data = await page.evaluate(`(() => {
  const flights = [];
  document.querySelectorAll("[data-resultid]").forEach(el => {
    const airline = el.querySelector(".c_cgF-carrier img")?.getAttribute("alt");
    const price = el.querySelector(".f8F1-price-text")?.textContent?.trim();
    const times = el.querySelector(".vmXl-mod-variant-large")?.textContent?.trim();
    const duration = el.querySelector(".xdW8-duration span")?.textContent?.trim();
    const stops = el.querySelector(".JWEO-stops-text")?.textContent?.trim();
    if (price) flights.push({ airline, price, times, duration, stops });
  });
  return JSON.stringify({ total: flights.length, flights: flights.slice(0, 10) });
})()`);

console.log(JSON.parse(data));
await spider.close();
