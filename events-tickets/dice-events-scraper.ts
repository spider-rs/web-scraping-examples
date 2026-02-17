/**
 * Dice Scraper
 *
 * Extract curated event listings, music shows, ticket prices, and artist lineups f
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx dice-events-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
});

await spider.connect();
const page = spider.page!;
await page.goto("https://dice.fm/browse/london/music");
await page.content(10000);

const data = await page.evaluate(`(() => {
  const events = [];
  document.querySelectorAll("[data-testid='event-card'], .event-card").forEach(el => {
    const name = el.querySelector("h3, .event-card__title")?.textContent?.trim();
    const date = el.querySelector("time, .event-card__date")?.textContent?.trim();
    const venue = el.querySelector(".event-card__venue, [data-testid='venue']")?.textContent?.trim();
    const price = el.querySelector(".event-card__price, [data-testid='price']")?.textContent?.trim();
    const genre = el.querySelector(".event-card__genre, [data-testid='genre']")?.textContent?.trim();
    if (name) events.push({ name, date, venue, price, genre });
  });
  return JSON.stringify({ total: events.length, events: events.slice(0, 15) });
})()`);

console.log(JSON.parse(data));
await spider.close();
