/**
 * Speedrun.com Scraper
 *
 * Extract speedrun leaderboards, world records, runner profiles, and category rule
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx speedrun-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
});

await spider.connect();
const page = spider.page!;
await page.goto("https://www.speedrun.com/mc");
await page.content(8000);

const data = await page.evaluate(`(() => {
  const runs = [];
  document.querySelectorAll("tr[data-testid], .leaderboard-row").forEach(el => {
    const rank = el.querySelector("td:first-child, .rank")?.textContent?.trim();
    const runner = el.querySelector("a[href*='/users/'], .username")?.textContent?.trim();
    const time = el.querySelector(".time, td:nth-child(3)")?.textContent?.trim();
    const date = el.querySelector(".date, td:last-child")?.textContent?.trim();
    if (runner) runs.push({ rank, runner, time, date });
  });
  return JSON.stringify({ total: runs.length, runs: runs.slice(0, 10) });
})()`);

console.log(JSON.parse(data));
await spider.close();
