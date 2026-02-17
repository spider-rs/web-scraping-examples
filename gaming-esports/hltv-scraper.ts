/**
 * HLTV Scraper
 *
 * Extract CS2 esports match results, team rankings, player stats, and event covera
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx hltv-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
});

await spider.connect();
const page = spider.page!;
await page.goto("https://www.hltv.org/ranking/teams");
await page.content();

const data = await page.evaluate(`(() => {
  const teams = [];
  document.querySelectorAll(".ranked-team").forEach(el => {
    const rank = el.querySelector(".position")?.textContent?.trim();
    const name = el.querySelector(".name")?.textContent?.trim();
    const points = el.querySelector(".points")?.textContent?.trim();
    const players = [];
    el.querySelectorAll(".lineup .player-holder .text-ellipsis").forEach(p => {
      players.push(p.textContent?.trim());
    });
    if (name) teams.push({ rank, name, points, players });
  });
  return JSON.stringify({ total: teams.length, teams: teams.slice(0, 10) });
})()`);

console.log(JSON.parse(data));
await spider.close();
