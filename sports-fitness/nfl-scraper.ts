/**
 * NFL.com Scraper
 *
 * Extract NFL game scores, team schedules, player stats, and league news from the 
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx nfl-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
});

await spider.init();
const page = spider.page!;
await page.goto("https://www.nfl.com/scores/");

const data = await page.extractFields({
  awayTeam: ".nfl-c-matchup-strip__team--opponent .nfl-c-matchup-strip__team-fullname",
  homeTeam: ".nfl-c-matchup-strip__team--home .nfl-c-matchup-strip__team-fullname",
  score: ".nfl-c-matchup-strip__score",
  gameTime: ".nfl-c-matchup-strip__date-time",
  quarter: ".nfl-c-matchup-strip__period",
  network: ".nfl-c-matchup-strip__network",
});

console.log(data);
await spider.close();
