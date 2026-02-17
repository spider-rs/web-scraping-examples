/**
 * Whova Scraper
 *
 * Extract conference agendas, speaker bios, exhibitor listings, and attendee netwo
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx whova-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
});

await spider.connect();
const page = spider.page!;
await page.goto("https://whova.com/portal/explore/");
await page.content(10000);

const data = await page.evaluate(`(() => {
  const events = [];
  document.querySelectorAll(".event-card, [data-testid='event-listing']").forEach(el => {
    const name = el.querySelector("h3, .event-card__name")?.textContent?.trim();
    const date = el.querySelector(".event-card__date, time")?.textContent?.trim();
    const location = el.querySelector(".event-card__location, .venue")?.textContent?.trim();
    const description = el.querySelector(".event-card__description, p")?.textContent?.trim();
    if (name) events.push({ name, date, location, description });
  });
  return JSON.stringify({ total: events.length, events: events.slice(0, 15) });
})()`);

console.log(JSON.parse(data));
await spider.close();
