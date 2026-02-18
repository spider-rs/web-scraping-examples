/**
 * Eventbrite Scraper
 *
 * Extract event listings, ticket prices, venue details, and organizer info from Ev
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx eventbrite-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
});

await spider.init();
const page = spider.page!;
await page.goto("https://www.eventbrite.com/d/ca--san-francisco/tech-conferences/");
await page.content(10000);

const data = await page.evaluate(`(() => {
  const events = [];
  document.querySelectorAll("[data-testid='event-card'], .search-event-card-wrapper").forEach(el => {
    const name = el.querySelector("h3, [data-testid='event-card-title']")?.textContent?.trim();
    const date = el.querySelector("[data-testid='event-card-date'], time")?.textContent?.trim();
    const venue = el.querySelector("[data-testid='event-card-location']")?.textContent?.trim();
    const price = el.querySelector("[data-testid='event-card-price']")?.textContent?.trim();
    const organizer = el.querySelector("[data-testid='event-card-organizer']")?.textContent?.trim();
    if (name) events.push({ name, date, venue, price, organizer });
  });
  return JSON.stringify({ total: events.length, events: events.slice(0, 15) });
})()`);

console.log(JSON.parse(data));
await spider.close();
