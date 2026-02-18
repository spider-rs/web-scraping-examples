/**
 * Baseball Reference Scraper
 *
 * Extract MLB player stats, batting averages, pitcher records, and historical base
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx baseball-reference-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
});

await spider.init();
const page = spider.page!;
await page.goto("https://www.baseball-reference.com/leagues/majors/2025-standard-batting.shtml");
await page.content();

const data = await page.evaluate(`(() => {
  const players = [];
  document.querySelectorAll("#players_standard_batting tbody tr:not(.thead)").forEach(el => {
    const name = el.querySelector("td[data-stat='player'] a")?.textContent?.trim();
    const team = el.querySelector("td[data-stat='team_ID'] a")?.textContent?.trim();
    const avg = el.querySelector("td[data-stat='batting_avg']")?.textContent?.trim();
    const hr = el.querySelector("td[data-stat='HR']")?.textContent?.trim();
    const rbi = el.querySelector("td[data-stat='RBI']")?.textContent?.trim();
    const war = el.querySelector("td[data-stat='WAR']")?.textContent?.trim();
    if (name) players.push({ name, team, avg, hr, rbi, war });
  });
  return JSON.stringify({ total: players.length, players: players.slice(0, 15) });
})()`);

console.log(JSON.parse(data));
await spider.close();
