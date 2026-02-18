/**
 * Liquipedia Scraper
 *
 * Extract esports tournament brackets, team rosters, match results, and player bio
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx liquipedia-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
});

await spider.init();
const page = spider.page!;
await page.goto("https://liquipedia.net/counterstrike/Intel_Extreme_Masters/Katowice/2024");

const data = await page.extractFields({
  title: ".infobox-header",
  prizePool: ".infobox-cell-2 .prizepoolusd",
  location: ".infobox-cell-2:has(.icon-location) + .infobox-cell-2",
  dates: ".infobox-cell-2:has(.icon-date) + .infobox-cell-2",
  winner: ".infobox-cell-2:has(.icon-firstplace) + .infobox-cell-2",
  teams: ".teamcard .team-template-text a",
});

console.log(data);
await spider.close();
