/**
 * GameFAQs Scraper
 *
 * Extract game guides, walkthroughs, user reviews, and community Q&A from the Game
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx gamefaqs-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
});

await spider.connect();
const page = spider.page!;
await page.goto("https://gamefaqs.gamespot.com/ps5/292817-elden-ring");

const data = await page.extractFields({
  title: ".page-title a",
  platform: ".platform-title",
  rating: ".pod_titlebar .score",
  releaseDate: "[data-testid='release-date']",
  genre: ".pod_gameinfo .body li:first-child a",
  faqCount: ".pod_titlebar .count",
});

console.log(data);
await spider.close();
