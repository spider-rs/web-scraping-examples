/**
 * Action Network Scraper
 *
 * Extract betting insights, expert picks, odds tracking, and sports analytics from
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx action-network-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
});

await spider.init();
const page = spider.page!;
await page.goto("https://www.actionnetwork.com/nfl/odds");

const data = await page.extractFields({
  matchup: "[class*='game-info'] [class*='teams']",
  spread: "[class*='odds-cell'] [class*='spread']",
  moneyline: "[class*='odds-cell'] [class*='moneyline']",
  total: "[class*='odds-cell'] [class*='total']",
  gameTime: "[class*='game-info'] [class*='date']",
  publicBetting: "[class*='public-betting'] [class*='percentage']",
});

console.log(data);
await spider.close();
