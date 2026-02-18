/**
 * Cvent Scraper
 *
 * Extract event management listings, venue sourcing data, attendee analytics, and 
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx cvent-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
});

await spider.init();
const page = spider.page!;
await page.goto("https://www.cvent.com/en/events");
await page.content(10000);

const data = await page.evaluate(`(() => {
  const events = [];
  document.querySelectorAll("[data-testid='event-card'], .event-listing").forEach(el => {
    const name = el.querySelector("h3, .event-listing__title")?.textContent?.trim();
    const date = el.querySelector("time, .event-listing__date")?.textContent?.trim();
    const venue = el.querySelector(".event-listing__venue, [data-testid='venue']")?.textContent?.trim();
    const format = el.querySelector(".event-listing__format, [data-testid='format']")?.textContent?.trim();
    if (name) events.push({ name, date, venue, format });
  });
  return JSON.stringify({ total: events.length, events: events.slice(0, 15) });
})()`);

console.log(JSON.parse(data));
await spider.close();
