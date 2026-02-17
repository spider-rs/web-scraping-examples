/**
 * Odds Shark Scraper
 *
 * Extract betting odds comparisons, point spreads, and over/under lines across spo
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx odds-shark-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
});

await spider.connect();
const page = spider.page!;
await page.goto("https://www.oddsshark.com/nfl/odds");
await page.content();

const data = await page.evaluate(`(() => {
  const games = [];
  document.querySelectorAll("[class*='odds-table'] [class*='game-row']").forEach(el => {
    const away = el.querySelector("[class*='away-team']")?.textContent?.trim();
    const home = el.querySelector("[class*='home-team']")?.textContent?.trim();
    const spread = el.querySelector("[class*='spread']")?.textContent?.trim();
    const moneyline = el.querySelector("[class*='moneyline']")?.textContent?.trim();
    const total = el.querySelector("[class*='total']")?.textContent?.trim();
    if (away && home) games.push({ away, home, spread, moneyline, total });
  });
  return JSON.stringify({ total: games.length, games: games.slice(0, 10) });
})()`);

console.log(JSON.parse(data));
await spider.close();
