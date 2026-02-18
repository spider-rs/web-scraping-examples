/**
 * Ballotpedia Scraper
 *
 * Extract election data, candidate profiles, ballot measures, and political office
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx ballotpedia-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
});

await spider.init();
const page = spider.page!;
await page.goto("https://ballotpedia.org/United_States_Senate_elections,_2026");
await page.content();

const data = await page.evaluate(`(() => {
  const races = [];
  document.querySelectorAll("table.wikitable tbody tr").forEach(el => {
    const state = el.querySelector("td:nth-child(1)")?.textContent?.trim();
    const incumbent = el.querySelector("td:nth-child(2)")?.textContent?.trim();
    const party = el.querySelector("td:nth-child(3)")?.textContent?.trim();
    if (state && incumbent) races.push({ state, incumbent, party });
  });
  return JSON.stringify({ total: races.length, races: races.slice(0, 15) });
})()`);

console.log(JSON.parse(data));
await spider.close();
