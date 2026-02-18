/**
 * FBref Scraper
 *
 * Extract detailed football (soccer) statistics, player performance data, and leag
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx fbref-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
});

await spider.init();
const page = spider.page!;
await page.goto("https://fbref.com/en/comps/9/stats/Premier-League-Stats");
await page.content();

const data = await page.evaluate(`(() => {
  const players = [];
  document.querySelectorAll("#stats_standard tbody tr:not(.thead)").forEach(el => {
    const name = el.querySelector("td[data-stat='player'] a")?.textContent?.trim();
    const team = el.querySelector("td[data-stat='team'] a")?.textContent?.trim();
    const goals = el.querySelector("td[data-stat='goals']")?.textContent?.trim();
    const assists = el.querySelector("td[data-stat='assists']")?.textContent?.trim();
    const xg = el.querySelector("td[data-stat='xg']")?.textContent?.trim();
    const minutes = el.querySelector("td[data-stat='minutes']")?.textContent?.trim();
    if (name) players.push({ name, team, goals, assists, xg, minutes });
  });
  return JSON.stringify({ total: players.length, players: players.slice(0, 15) });
})()`);

console.log(JSON.parse(data));
await spider.close();
