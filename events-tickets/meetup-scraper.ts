/**
 * Meetup Scraper
 *
 * Extract group meetups, RSVP counts, venue locations, and organizer profiles from
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx meetup-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
});

await spider.connect();
const page = spider.page!;
await page.goto("https://www.meetup.com/find/?keywords=javascript&location=New+York");
await page.content(10000);

const data = await page.extractFields({
  eventName: "[data-testid='event-card'] h3",
  group: "[data-testid='event-card'] [data-testid='group-name']",
  date: "[data-testid='event-card'] time",
  location: "[data-testid='event-card'] [data-testid='venue-name']",
  attendees: "[data-testid='event-card'] [data-testid='attendee-count']",
  description: "[data-testid='event-card'] p",
});

console.log(data);
await spider.close();
