/**
 * SoundCloud Music Scraper
 *
 * Extract track listings, artist profiles, play counts, and comment threads from S
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx soundcloud-music-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
});

await spider.init();
const page = spider.page!;
await page.goto("https://soundcloud.com/charts/top");
await page.content(10000);

const data = await page.evaluate(`(() => {
  const tracks = [];
  document.querySelectorAll(".chartTrack__details").forEach(el => {
    const title = el.querySelector(".chartTrack__title a")?.textContent?.trim();
    const artist = el.querySelector(".chartTrack__username a")?.textContent?.trim();
    const plays = el.querySelector(".sc-ministats-plays")?.textContent?.trim();
    if (title) tracks.push({ title, artist, plays });
  });
  return JSON.stringify({ total: tracks.length, tracks: tracks.slice(0, 15) });
})()`);

console.log(JSON.parse(data));
await spider.close();
