/**
 * Amtrak Scraper
 *
 * Extract train schedules, fare classes, route availability, and station informati
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx amtrak-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
});

await spider.init();
const page = spider.page!;
await page.goto("https://www.amtrak.com/tickets/departure.html");
await page.content(10000);

const data = await page.evaluate(`(() => {
  const trains = [];
  document.querySelectorAll(".search-results-leg").forEach(el => {
    const name = el.querySelector(".train-name")?.textContent?.trim();
    const departure = el.querySelector(".depart-time")?.textContent?.trim();
    const arrival = el.querySelector(".arrive-time")?.textContent?.trim();
    const duration = el.querySelector(".travel-time")?.textContent?.trim();
    const price = el.querySelector(".low-fare")?.textContent?.trim();
    if (name) trains.push({ name, departure, arrival, duration, price });
  });
  return JSON.stringify({ total: trains.length, trains: trains.slice(0, 10) });
})()`);

console.log(JSON.parse(data));
await spider.close();
