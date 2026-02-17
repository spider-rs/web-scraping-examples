/**
 * SeatGeek Scraper
 *
 * Extract event listings, deal scores, ticket comparisons, and venue seating data 
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx seatgeek-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
});

await spider.connect();
const page = spider.page!;
await page.goto("https://seatgeek.com/concerts");
await page.content(10000);

const data = await page.evaluate(`(() => {
  const events = [];
  document.querySelectorAll("[data-testid='event-card'], .EventCard").forEach(el => {
    const name = el.querySelector("h3, .EventCard__title")?.textContent?.trim();
    const date = el.querySelector("time, .EventCard__date")?.textContent?.trim();
    const venue = el.querySelector("[data-testid='venue-name'], .EventCard__venue")?.textContent?.trim();
    const price = el.querySelector("[data-testid='lowest-price'], .EventCard__price")?.textContent?.trim();
    const dealScore = el.querySelector("[data-testid='deal-score'], .DealScore")?.textContent?.trim();
    if (name) events.push({ name, date, venue, price, dealScore });
  });
  return JSON.stringify({ total: events.length, events: events.slice(0, 15) });
})()`);

console.log(JSON.parse(data));
await spider.close();
