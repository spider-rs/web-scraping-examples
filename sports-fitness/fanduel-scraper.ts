/**
 * FanDuel Scraper
 *
 * Extract betting lines, odds, player props, and fantasy contests from FanDuel spo
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx fanduel-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
});

await spider.init();
const page = spider.page!;
await page.goto("https://sportsbook.fanduel.com/navigation/nfl");

const data = await page.extractFields({
  eventName: "[class*='event-row'] [class*='event-name']",
  spread: "[class*='spread'] [class*='outcome-value']",
  moneyline: "[class*='moneyline'] [class*='outcome-value']",
  total: "[class*='total'] [class*='outcome-value']",
  gameTime: "[class*='event-row'] [class*='event-time']",
  league: "[class*='market-header'] h2",
});

console.log(data);
await spider.close();
