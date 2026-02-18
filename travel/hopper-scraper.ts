/**
 * Hopper Scraper
 *
 * Extract flight price predictions, fare alerts, and travel deal recommendations f
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx hopper-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
});

await spider.init();
const page = spider.page!;
await page.goto("https://www.hopper.com/flights/results/JFK-LAX/2026-06-15");
await page.content(10000);

const data = await page.evaluate(`(() => {
  const flights = [];
  document.querySelectorAll(".flight-result-card").forEach(el => {
    const airline = el.querySelector(".airline-name")?.textContent?.trim();
    const price = el.querySelector(".price-display")?.textContent?.trim();
    const prediction = el.querySelector(".price-prediction")?.textContent?.trim();
    const duration = el.querySelector(".flight-duration")?.textContent?.trim();
    if (airline) flights.push({ airline, price, prediction, duration });
  });
  return JSON.stringify({ total: flights.length, flights: flights.slice(0, 10) });
})()`);

console.log(JSON.parse(data));
await spider.close();
