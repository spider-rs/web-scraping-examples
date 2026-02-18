/**
 * Basketball Reference Scraper
 *
 * Extract NBA player stats, team records, game logs, and historical basketball dat
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx basketball-reference-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
});

await spider.init();
const page = spider.page!;
await page.goto("https://www.basketball-reference.com/leagues/NBA_2025_per_game.html");
await page.content();

const data = await page.evaluate(`(() => {
  const players = [];
  document.querySelectorAll("#per_game_stats tbody tr:not(.thead)").forEach(el => {
    const name = el.querySelector("td[data-stat='player'] a")?.textContent?.trim();
    const team = el.querySelector("td[data-stat='team_id'] a")?.textContent?.trim();
    const ppg = el.querySelector("td[data-stat='pts_per_g']")?.textContent?.trim();
    const rpg = el.querySelector("td[data-stat='trb_per_g']")?.textContent?.trim();
    const apg = el.querySelector("td[data-stat='ast_per_g']")?.textContent?.trim();
    if (name) players.push({ name, team, ppg, rpg, apg });
  });
  return JSON.stringify({ total: players.length, players: players.slice(0, 15) });
})()`);

console.log(JSON.parse(data));
await spider.close();
