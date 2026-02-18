/**
 * ESPN Scraper
 *
 * Extract live scores, game schedules, standings, and sports news from ESPN across
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx espn-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
});

await spider.init();
const page = spider.page!;
await page.goto("https://www.espn.com/nba/scoreboard");

const data = await page.extractFields({
  teams: ".ScoreCell__TeamName",
  score: ".ScoreCell__Score",
  status: ".ScoreCell__Time",
  headline: ".Card__Header__Title a",
  league: ".ScoreboardHeader__CategoryLink",
  date: ".Card__Header__Timestamp",
});

console.log(data);
await spider.close();
