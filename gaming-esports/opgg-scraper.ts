/**
 * OP.GG Scraper
 *
 * Extract League of Legends player stats, champion data, match history, and tier r
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx opgg-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
});

await spider.connect();
const page = spider.page!;
await page.goto("https://www.op.gg/summoners/na/Doublelift-1lol");
await page.content(8000);

const data = await page.evaluate(`(() => {
  const name = document.querySelector(".profile-name h1")?.textContent?.trim();
  const rank = document.querySelector(".tier")?.textContent?.trim();
  const lp = document.querySelector(".lp")?.textContent?.trim();
  const winRate = document.querySelector(".win-lose")?.textContent?.trim();
  const champions = [];
  document.querySelectorAll(".champion-box").forEach(el => {
    const champ = el.querySelector(".champion-name")?.textContent?.trim();
    const wr = el.querySelector(".win-ratio")?.textContent?.trim();
    const kda = el.querySelector(".kda")?.textContent?.trim();
    if (champ) champions.push({ champ, wr, kda });
  });
  return JSON.stringify({ name, rank, lp, winRate, champions: champions.slice(0, 5) });
})()`);

console.log(JSON.parse(data));
await spider.close();
