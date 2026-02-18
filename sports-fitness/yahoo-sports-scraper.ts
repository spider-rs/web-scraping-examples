/**
 * Yahoo Sports Scraper
 *
 * Extract sports news, live scores, fantasy league data, and player statistics fro
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx yahoo-sports-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
});

await spider.init();
const page = spider.page!;
await page.goto("https://sports.yahoo.com/nba/scoreboard/");

const data = await page.extractFields({
  awayTeam: "[class*='away'] [class*='team-name']",
  homeTeam: "[class*='home'] [class*='team-name']",
  awayScore: "[class*='away'] [class*='score']",
  homeScore: "[class*='home'] [class*='score']",
  gameStatus: "[class*='game-status']",
  headline: "[class*='topstory'] h3",
});

console.log(data);
await spider.close();
