/**
 * DraftKings Scraper
 *
 * Extract betting odds, point spreads, player props, and contest lineups from Draf
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx draftkings-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
});

await spider.init();
const page = spider.page!;
await page.goto("https://sportsbook.draftkings.com/leagues/football/nfl");
await page.content();

const data = await page.evaluate(`(() => {
  const events = [];
  document.querySelectorAll("[class*='sportsbook-event-accordion']").forEach(el => {
    const teams = el.querySelector("[class*='event-cell__name']")?.textContent?.trim();
    const spread = el.querySelector("[class*='sportsbook-outcome-cell__line']")?.textContent?.trim();
    const odds = el.querySelector("[class*='sportsbook-odds']")?.textContent?.trim();
    const time = el.querySelector("[class*='event-cell__time']")?.textContent?.trim();
    if (teams) events.push({ teams, spread, odds, time });
  });
  return JSON.stringify({ total: events.length, events: events.slice(0, 10) });
})()`);

console.log(JSON.parse(data));
await spider.close();
