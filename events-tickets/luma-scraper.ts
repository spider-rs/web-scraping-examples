/**
 * Luma Scraper
 *
 * Extract community event listings, host profiles, RSVP data, and calendar details
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx luma-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
});

await spider.connect();
const page = spider.page!;
await page.goto("https://lu.ma/sf");
await page.content(10000);

const data = await page.evaluate(`(() => {
  const events = [];
  document.querySelectorAll("[data-testid='event-card'], .event-card").forEach(el => {
    const name = el.querySelector("h3, .event-card__title")?.textContent?.trim();
    const host = el.querySelector(".event-card__host, [data-testid='host-name']")?.textContent?.trim();
    const date = el.querySelector("time, .event-card__date")?.textContent?.trim();
    const location = el.querySelector(".event-card__location, [data-testid='location']")?.textContent?.trim();
    const rsvp = el.querySelector(".event-card__rsvp, [data-testid='rsvp-count']")?.textContent?.trim();
    if (name) events.push({ name, host, date, location, rsvp });
  });
  return JSON.stringify({ total: events.length, events: events.slice(0, 15) });
})()`);

console.log(JSON.parse(data));
await spider.close();
