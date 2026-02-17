/**
 * Kiwi.com Scraper
 *
 * Extract virtual interlining flights, multi-city routes, and budget carrier combi
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx kiwi-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
});

await spider.connect();
const page = spider.page!;
await page.goto("https://www.kiwi.com/en/search/results/new-york-united-states/london-united-kingdom/2026-06-15");
await page.content(12000);

const data = await page.evaluate(`(() => {
  const flights = [];
  document.querySelectorAll("[data-test='ResultCardWrapper']").forEach(el => {
    const price = el.querySelector("[data-test='ResultCardPrice']")?.textContent?.trim();
    const duration = el.querySelector("[data-test='ResultCardDuration']")?.textContent?.trim();
    const departure = el.querySelector("[data-test='ResultCardDepartureTime']")?.textContent?.trim();
    const arrival = el.querySelector("[data-test='ResultCardArrivalTime']")?.textContent?.trim();
    const stops = el.querySelector("[data-test='ResultCardStops']")?.textContent?.trim();
    if (price) flights.push({ price, duration, departure, arrival, stops });
  });
  return JSON.stringify({ total: flights.length, flights: flights.slice(0, 10) });
})()`);

console.log(JSON.parse(data));
await spider.close();
