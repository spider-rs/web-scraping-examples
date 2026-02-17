/**
 * NBA.com Scraper
 *
 * Extract NBA game scores, player stats, team standings, and league news from the 
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx nba-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
});

await spider.connect();
const page = spider.page!;
await page.goto("https://www.nba.com/games");

const data = await page.extractFields({
  awayTeam: "[data-testid='away-team-name']",
  homeTeam: "[data-testid='home-team-name']",
  awayScore: "[data-testid='away-team-score']",
  homeScore: "[data-testid='home-team-score']",
  gameStatus: "[data-testid='game-status']",
  gameTime: "[data-testid='game-time']",
});

console.log(data);
await spider.close();
