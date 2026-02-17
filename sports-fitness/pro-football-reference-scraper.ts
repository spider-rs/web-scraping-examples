/**
 * Pro Football Reference Scraper
 *
 * Extract NFL player stats, passing yards, rushing data, and historical football r
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx pro-football-reference-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
});

await spider.connect();
const page = spider.page!;
await page.goto("https://www.pro-football-reference.com/years/2025/passing.htm");
await page.content();

const data = await page.evaluate(`(() => {
  const players = [];
  document.querySelectorAll("#passing tbody tr:not(.thead)").forEach(el => {
    const name = el.querySelector("td[data-stat='player'] a")?.textContent?.trim();
    const team = el.querySelector("td[data-stat='team'] a")?.textContent?.trim();
    const yards = el.querySelector("td[data-stat='pass_yds']")?.textContent?.trim();
    const tds = el.querySelector("td[data-stat='pass_td']")?.textContent?.trim();
    const rating = el.querySelector("td[data-stat='pass_rating']")?.textContent?.trim();
    if (name) players.push({ name, team, yards, tds, rating });
  });
  return JSON.stringify({ total: players.length, players: players.slice(0, 15) });
})()`);

console.log(JSON.parse(data));
await spider.close();
