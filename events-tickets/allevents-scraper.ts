/**
 * AllEvents.in Scraper
 *
 * Extract local event listings, workshop details, online event data, and category 
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx allevents-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
});

await spider.connect();
const page = spider.page!;
await page.goto("https://allevents.in/san-francisco/all");
await page.content(10000);

const data = await page.evaluate(`(() => {
  const events = [];
  document.querySelectorAll(".event-card, [data-testid='event-item']").forEach(el => {
    const name = el.querySelector("h3, .event-title a")?.textContent?.trim();
    const date = el.querySelector("time, .event-date")?.textContent?.trim();
    const venue = el.querySelector(".event-venue, .venue-name")?.textContent?.trim();
    const category = el.querySelector(".event-category, .category-tag")?.textContent?.trim();
    const attendees = el.querySelector(".event-attendees, .attendee-count")?.textContent?.trim();
    if (name) events.push({ name, date, venue, category, attendees });
  });
  return JSON.stringify({ total: events.length, events: events.slice(0, 15) });
})()`);

console.log(JSON.parse(data));
await spider.close();
