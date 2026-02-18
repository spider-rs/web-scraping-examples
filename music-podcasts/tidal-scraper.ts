/**
 * Tidal Scraper
 *
 * Extract hi-fi music catalog data, artist credits, album tracklists, and audio qu
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx tidal-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
});

await spider.init();
const page = spider.page!;
await page.goto("https://tidal.com/browse/playlist/2650ac82-e1bc-4c0a-a0cc-8b08e7174e40");
await page.content(10000);

const data = await page.evaluate(`(() => {
  const tracks = [];
  document.querySelectorAll("[data-testid='tracklist-row']").forEach(el => {
    const title = el.querySelector("[data-testid='tracklist-row-title']")?.textContent?.trim();
    const artist = el.querySelector("[data-testid='tracklist-row-artist']")?.textContent?.trim();
    const duration = el.querySelector("[data-testid='tracklist-row-duration']")?.textContent?.trim();
    if (title) tracks.push({ title, artist, duration });
  });
  return JSON.stringify({ total: tracks.length, tracks: tracks.slice(0, 15) });
})()`);

console.log(JSON.parse(data));
await spider.close();
