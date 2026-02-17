/**
 * MLB.com Scraper
 *
 * Extract MLB game scores, box scores, standings, and player statistics from the o
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx mlb-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
});

await spider.connect();
const page = spider.page!;
await page.goto("https://www.mlb.com/scores");

const data = await page.extractFields({
  gameDate: ".Scoreboard__header--date",
  teams: ".TeamMatchup__name",
  score: ".TeamMatchup__score",
  status: ".Scoreboard__status",
  inning: ".Scoreboard__inning",
  pitcher: ".Scoreboard__pitcher-name",
});

console.log(data);
await spider.close();
