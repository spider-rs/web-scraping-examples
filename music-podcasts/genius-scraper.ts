/**
 * Genius Scraper
 *
 * Extract song lyrics, annotations, artist metadata, and contributor insights from
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx genius-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
});

await spider.connect();
const page = spider.page!;
await page.goto("https://genius.com/charts");
await page.content(10000);

const data = await page.evaluate(`(() => {
  const songs = [];
  document.querySelectorAll(".chart_row").forEach(el => {
    const title = el.querySelector(".chart_row-content-title")?.textContent?.trim();
    const artist = el.querySelector(".chart_row-content-title .chart_row-content-title-artist")?.textContent?.trim();
    const rank = el.querySelector(".chart_row-number")?.textContent?.trim();
    if (title) songs.push({ rank, title, artist });
  });
  return JSON.stringify({ total: songs.length, songs: songs.slice(0, 15) });
})()`);

console.log(JSON.parse(data));
await spider.close();
