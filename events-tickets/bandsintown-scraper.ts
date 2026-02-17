/**
 * Bandsintown Scraper
 *
 * Extract concert dates, artist tour schedules, venue info, and ticket links from 
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx bandsintown-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
});

await spider.connect();
const page = spider.page!;
await page.goto("https://www.bandsintown.com/c/san-francisco-ca");
await page.content(10000);

const data = await page.extractFields({
  artist: "[data-testid='event-card'] [data-testid='artist-name']",
  date: "[data-testid='event-card'] time",
  venue: "[data-testid='event-card'] [data-testid='venue-name']",
  location: "[data-testid='event-card'] [data-testid='city-name']",
  rsvp: "[data-testid='event-card'] [data-testid='rsvp-count']",
  ticketLink: { selector: "[data-testid='event-card'] a[data-testid='ticket-link']", attribute: "href" },
});

console.log(data);
await spider.close();
