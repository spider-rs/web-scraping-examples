/**
 * YouTube Music Scraper
 *
 * Extract music playlists, album data, artist channels, and chart rankings from Yo
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx youtube-music-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
});

await spider.init();
const page = spider.page!;
await page.goto("https://music.youtube.com/charts");
await page.content(12000);

const data = await page.evaluate(`(() => {
  const tracks = [];
  document.querySelectorAll("ytmusic-responsive-list-item-renderer").forEach(el => {
    const title = el.querySelector(".title-column yt-formatted-string a")?.textContent?.trim();
    const artist = el.querySelector(".secondary-flex-columns yt-formatted-string a")?.textContent?.trim();
    const views = el.querySelector(".secondary-flex-columns yt-formatted-string:last-child")?.textContent?.trim();
    if (title) tracks.push({ title, artist, views });
  });
  return JSON.stringify({ total: tracks.length, tracks: tracks.slice(0, 15) });
})()`);

console.log(JSON.parse(data));
await spider.close();
