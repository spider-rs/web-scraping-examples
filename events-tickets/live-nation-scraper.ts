/**
 * Live Nation Scraper
 *
 * Extract concert schedules, festival lineups, venue listings, and VIP experience 
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx live-nation-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
});

await spider.init();
const page = spider.page!;
await page.goto("https://www.livenation.com/events?genre=Rock");
await page.content(10000);

const data = await page.extractFields({
  eventName: "[data-testid='event-card'] h3",
  date: "[data-testid='event-card'] time",
  venue: "[data-testid='event-card'] [data-testid='venue']",
  city: "[data-testid='event-card'] [data-testid='city']",
  price: "[data-testid='event-card'] [data-testid='price-range']",
  genre: "[data-testid='event-card'] [data-testid='genre-tag']",
});

console.log(data);
await spider.close();
