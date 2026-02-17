/**
 * Vivid Seats Scraper
 *
 * Extract ticket listings, price comparisons, loyalty rewards data, and event sche
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx vivid-seats-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
});

await spider.connect();
const page = spider.page!;
await page.goto("https://www.vividseats.com/concerts");
await page.content(10000);

const data = await page.evaluate(`(() => {
  const events = [];
  document.querySelectorAll("[data-testid='event-row'], .search-result-row").forEach(el => {
    const name = el.querySelector("h3, .event-name a")?.textContent?.trim();
    const date = el.querySelector("time, .event-date")?.textContent?.trim();
    const venue = el.querySelector(".venue-name, .event-venue")?.textContent?.trim();
    const price = el.querySelector(".price, .event-price")?.textContent?.trim();
    const tickets = el.querySelector(".ticket-count, .event-tickets")?.textContent?.trim();
    if (name) events.push({ name, date, venue, price, tickets });
  });
  return JSON.stringify({ total: events.length, events: events.slice(0, 15) });
})()`);

console.log(JSON.parse(data));
await spider.close();
