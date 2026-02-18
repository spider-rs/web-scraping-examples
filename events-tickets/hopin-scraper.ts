/**
 * Hopin Scraper
 *
 * Extract virtual event details, session schedules, speaker lineups, and registrat
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx hopin-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
});

await spider.init();
const page = spider.page!;
await page.goto("https://hopin.com/explore");
await page.content(10000);

const data = await page.evaluate(`(() => {
  const events = [];
  document.querySelectorAll("[data-testid='event-card'], .explore-card").forEach(el => {
    const name = el.querySelector("h3, .explore-card__title")?.textContent?.trim();
    const date = el.querySelector("time, .explore-card__date")?.textContent?.trim();
    const format = el.querySelector(".explore-card__format, [data-testid='event-format']")?.textContent?.trim();
    const attendees = el.querySelector(".explore-card__attendees, [data-testid='attendee-count']")?.textContent?.trim();
    if (name) events.push({ name, date, format, attendees });
  });
  return JSON.stringify({ total: events.length, events: events.slice(0, 15) });
})()`);

console.log(JSON.parse(data));
await spider.close();
