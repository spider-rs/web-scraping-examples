/**
 * FlashScore Scraper
 *
 * Extract live scores, match results, and fixtures across football, tennis, basket
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx flashscore-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
});

await spider.init();
const page = spider.page!;
await page.goto("https://www.flashscore.com/football/");
await page.content();

const data = await page.evaluate(`(() => {
  const matches = [];
  document.querySelectorAll(".event__match").forEach(el => {
    const home = el.querySelector(".event__participant--home")?.textContent?.trim();
    const away = el.querySelector(".event__participant--away")?.textContent?.trim();
    const homeScore = el.querySelector(".event__score--home")?.textContent?.trim();
    const awayScore = el.querySelector(".event__score--away")?.textContent?.trim();
    const time = el.querySelector(".event__time")?.textContent?.trim();
    const league = el.closest(".sportName")?.querySelector(".event__title--name")?.textContent?.trim();
    if (home && away) matches.push({ home, away, homeScore, awayScore, time, league });
  });
  return JSON.stringify({ total: matches.length, matches: matches.slice(0, 15) });
})()`);

console.log(JSON.parse(data));
await spider.close();
