/**
 * Spotify Music Scraper
 *
 * Extract playlist tracks, artist profiles, album metadata, and popularity scores 
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx spotify-music-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
});

await spider.connect();
const page = spider.page!;
await page.goto("https://open.spotify.com/playlist/37i9dQZF1DXcBWIGoYBM5M");
await page.content(12000);

const data = await page.evaluate(`(() => {
  const tracks = [];
  document.querySelectorAll("[data-testid='tracklist-row']").forEach(el => {
    const title = el.querySelector("[data-testid='internal-track-link'] div")?.textContent?.trim();
    const artist = el.querySelector("[data-testid='tracklist-row__artist-name-link']")?.textContent?.trim();
    const duration = el.querySelector("[data-testid='tracklist-row__duration']")?.textContent?.trim();
    if (title) tracks.push({ title, artist, duration });
  });
  return JSON.stringify({ total: tracks.length, tracks: tracks.slice(0, 15) });
})()`);

console.log(JSON.parse(data));
await spider.close();
