/**
 * HowLongToBeat Scraper
 *
 * Extract game completion times, play styles, and user-submitted duration data fro
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx howlongtobeat-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
});

await spider.init();
const page = spider.page!;
await page.goto("https://howlongtobeat.com/game/68151");
await page.content(8000);

const data = await page.evaluate(`(() => {
  const title = document.querySelector(".GameHeader_profile_header__q_PID")?.textContent?.trim();
  const times = [];
  document.querySelectorAll("[class*='GameStats_game_times'] li").forEach(el => {
    const label = el.querySelector("h4, h5")?.textContent?.trim();
    const value = el.querySelector("[class*='time_']")?.textContent?.trim();
    if (label && value) times.push({ label, value });
  });
  const developer = document.querySelector("[class*='GameSummary'] a")?.textContent?.trim();
  return JSON.stringify({ title, times, developer });
})()`);

console.log(JSON.parse(data));
await spider.close();
