/**
 * Clubhouse Scraper
 *
 * Extract room listings, club profiles, speaker info, and event schedules from Clu
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx clubhouse-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
});

await spider.init();
const page = spider.page!;
await page.goto("https://www.clubhouse.com/explore");

const data = await page.extractFields({
  roomTitle: ".room-card__title",
  speakers: ".room-card__speakers",
  listenerCount: ".room-card__listener-count",
  clubName: ".room-card__club-name",
  topic: ".room-card__topic",
  schedule: ".room-card__schedule",
});

console.log(data);
await spider.close();
