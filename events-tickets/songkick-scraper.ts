/**
 * Songkick Scraper
 *
 * Extract concert listings, festival lineups, artist tour dates, and venue data fr
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx songkick-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
});

await spider.init();
const page = spider.page!;
await page.goto("https://www.songkick.com/metro-areas/26330-us-sf-bay-area");
await page.content(10000);

const data = await page.evaluate(`(() => {
  const events = [];
  document.querySelectorAll(".event-listings li, [data-testid='event-listing']").forEach(el => {
    const name = el.querySelector("a.event-link, .event-name")?.textContent?.trim();
    const date = el.querySelector("time, .date-label")?.getAttribute("datetime") || el.querySelector("time")?.textContent?.trim();
    const venue = el.querySelector(".venue-name, .event-venue a")?.textContent?.trim();
    const location = el.querySelector(".location, .event-location")?.textContent?.trim();
    if (name) events.push({ name, date, venue, location });
  });
  return JSON.stringify({ total: events.length, events: events.slice(0, 15) });
})()`);

console.log(JSON.parse(data));
await spider.close();
