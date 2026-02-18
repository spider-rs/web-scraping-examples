/**
 * CBS Sports Scraper
 *
 * Extract sports scores, news, fantasy rankings, and expert analysis from CBS Spor
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx cbs-sports-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
});

await spider.init();
const page = spider.page!;
await page.goto("https://www.cbssports.com/nfl/scores/");

const data = await page.extractFields({
  awayTeam: ".team-name-away",
  homeTeam: ".team-name-home",
  awayScore: ".in-progress-table .away .total",
  homeScore: ".in-progress-table .home .total",
  gameStatus: ".game-status",
  gameTime: ".game-when",
});

console.log(data);
await spider.close();
