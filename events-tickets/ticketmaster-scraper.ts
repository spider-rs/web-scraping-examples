/**
 * Ticketmaster Scraper
 *
 * Extract concert listings, ticket prices, seat maps, and venue details from Ticke
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx ticketmaster-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
});

await spider.connect();
const page = spider.page!;
await page.goto("https://www.ticketmaster.com/search?q=concert&daterange=this_weekend");
await page.content(10000);

const data = await page.evaluate(`(() => {
  const events = [];
  document.querySelectorAll("[data-testid='event-listing'], .event-listing__item").forEach(el => {
    const name = el.querySelector("h3, [data-testid='event-name']")?.textContent?.trim();
    const date = el.querySelector("[data-testid='event-date'], .event-listing__date")?.textContent?.trim();
    const venue = el.querySelector("[data-testid='event-venue'], .event-listing__venue")?.textContent?.trim();
    const price = el.querySelector("[data-testid='event-price'], .event-listing__price")?.textContent?.trim();
    if (name) events.push({ name, date, venue, price });
  });
  return JSON.stringify({ total: events.length, events: events.slice(0, 15) });
})()`);

console.log(JSON.parse(data));
await spider.close();
