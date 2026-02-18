/**
 * Kaggle Scraper
 *
 * Extract competition details, dataset metadata, notebook kernels, and leaderboard
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx kaggle-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
});

await spider.init();
const page = spider.page!;
await page.goto("https://www.kaggle.com/competitions");
await page.content(10000);

const data = await page.evaluate(`(() => {
  const comps = [];
  document.querySelectorAll("[class*='CompetitionCard']").forEach(el => {
    const name = el.querySelector("[class*='title']")?.textContent?.trim();
    const prize = el.querySelector("[class*='prize']")?.textContent?.trim();
    const teams = el.querySelector("[class*='teams']")?.textContent?.trim();
    const deadline = el.querySelector("[class*='deadline']")?.textContent?.trim();
    if (name) comps.push({ name, prize, teams, deadline });
  });
  return JSON.stringify({ total: comps.length, competitions: comps.slice(0, 15) });
})()`);

console.log(JSON.parse(data));
await spider.close();
