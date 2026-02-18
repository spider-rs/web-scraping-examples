/**
 * NHL.com Scraper
 *
 * Extract NHL game scores, player stats, team standings, and league news from the 
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx nhl-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
});

await spider.init();
const page = spider.page!;
await page.goto("https://www.nhl.com/scores");

const data = await page.extractFields({
  awayTeam: "[class*='away-team'] [class*='team-name']",
  homeTeam: "[class*='home-team'] [class*='team-name']",
  awayScore: "[class*='away-team'] [class*='score']",
  homeScore: "[class*='home-team'] [class*='score']",
  period: "[class*='game-status']",
  venue: "[class*='venue']",
});

console.log(data);
await spider.close();
