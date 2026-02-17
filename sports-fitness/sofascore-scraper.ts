/**
 * SofaScore Scraper
 *
 * Extract live scores, match statistics, player ratings, and event lineups from So
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx sofascore-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
});

await spider.connect();
const page = spider.page!;
await page.goto("https://www.sofascore.com/football");

const data = await page.extractFields({
  homeTeam: "[class*='event'] [class*='home'] [class*='teamName']",
  awayTeam: "[class*='event'] [class*='away'] [class*='teamName']",
  homeScore: "[class*='event'] [class*='home'] [class*='score']",
  awayScore: "[class*='event'] [class*='away'] [class*='score']",
  matchTime: "[class*='event'] [class*='time']",
  tournament: "[class*='tournament'] [class*='name']",
});

console.log(data);
await spider.close();
