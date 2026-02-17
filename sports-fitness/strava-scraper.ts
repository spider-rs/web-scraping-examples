/**
 * Strava Scraper
 *
 * Extract public athlete profiles, activity data, segment leaderboards, and route 
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx strava-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
});

await spider.connect();
const page = spider.page!;
await page.goto("https://www.strava.com/segments/explore");

const data = await page.extractFields({
  segmentName: ".segment-name a",
  distance: ".segment-distance",
  elevation: ".segment-elevation",
  avgGrade: ".segment-grade",
  attempts: ".segment-efforts",
  location: ".segment-location",
});

console.log(data);
await spider.close();
