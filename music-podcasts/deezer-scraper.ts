/**
 * Deezer Scraper
 *
 * Extract music catalogs, playlist data, artist bios, and chart rankings from Deez
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx deezer-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
});

await spider.init();
const page = spider.page!;
await page.goto("https://www.deezer.com/en/charts");
await page.content(10000);

const data = await page.evaluate(`(() => {
  const tracks = [];
  document.querySelectorAll("[data-testid='song-row']").forEach(el => {
    const title = el.querySelector("[data-testid='song-row-title']")?.textContent?.trim();
    const artist = el.querySelector("[data-testid='song-row-artist']")?.textContent?.trim();
    const rank = el.querySelector("[data-testid='song-row-rank']")?.textContent?.trim();
    if (title) tracks.push({ title, artist, rank });
  });
  return JSON.stringify({ total: tracks.length, tracks: tracks.slice(0, 15) });
})()`);

console.log(JSON.parse(data));
await spider.close();
