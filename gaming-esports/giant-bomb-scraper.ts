/**
 * Giant Bomb Scraper
 *
 * Extract game database entries, reviews, wiki content, and video content metadata
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx giant-bomb-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
});

await spider.connect();
const page = spider.page!;
await page.goto("https://www.giantbomb.com/elden-ring/3030-73070/");
await page.content();

const data = await page.evaluate(`(() => {
  const title = document.querySelector("h1 a")?.textContent?.trim();
  const deck = document.querySelector(".wiki-deck")?.textContent?.trim();
  const details = {};
  document.querySelectorAll(".wiki-details .table-grid__row").forEach(el => {
    const label = el.querySelector("dt, .table-grid__cell:first-child")?.textContent?.trim();
    const value = el.querySelector("dd, .table-grid__cell:last-child")?.textContent?.trim();
    if (label) details[label.toLowerCase().replace(/[^a-z]/g, "_")] = value;
  });
  return JSON.stringify({ title, deck, details });
})()`);

console.log(JSON.parse(data));
await spider.close();
