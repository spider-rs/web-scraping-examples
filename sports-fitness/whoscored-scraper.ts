/**
 * WhoScored Scraper
 *
 * Extract football match ratings, player performance scores, and tactical analysis
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx whoscored-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
});

await spider.connect();
const page = spider.page!;
await page.goto("https://www.whoscored.com/Statistics");
await page.content();

const data = await page.evaluate(`(() => {
  const players = [];
  document.querySelectorAll("#statistics-table-summary tbody tr").forEach(el => {
    const name = el.querySelector(".player-link")?.textContent?.trim();
    const team = el.querySelector(".team-name")?.textContent?.trim();
    const rating = el.querySelector(".rating")?.textContent?.trim();
    const apps = el.querySelector("td:nth-child(4)")?.textContent?.trim();
    const goals = el.querySelector("td:nth-child(5)")?.textContent?.trim();
    const assists = el.querySelector("td:nth-child(6)")?.textContent?.trim();
    if (name) players.push({ name, team, rating, apps, goals, assists });
  });
  return JSON.stringify({ total: players.length, players: players.slice(0, 15) });
})()`);

console.log(JSON.parse(data));
await spider.close();
