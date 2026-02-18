/**
 * Spotify Scraper
 *
 * Scrapes top 50 tracks from a Spotify playlist.
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx media/spotify-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
});
await spider.init();
const page = spider.page!;

await page.goto("https://open.spotify.com/playlist/37i9dQZF1DXcBWIGoYBM5M");
await page.content(10000);
const data = await page.evaluate(`
  () => {
    const tracks = [];
    const rows = document.querySelectorAll('[data-testid="tracklist-row"]');

    rows.forEach((row, index) => {
      const titleEl = row.querySelector('[data-testid="internal_track_link"]');
      const artistEl = row.querySelector('[data-testid*="artist"]');
      const durationEl = row.querySelector('[data-testid="duration"]');

      if (titleEl) {
        tracks.push({
          position: index + 1,
          title: titleEl.textContent?.trim(),
          artist: artistEl?.textContent?.trim(),
          duration: durationEl?.textContent?.trim(),
          url: titleEl.getAttribute('href'),
        });
      }
    });

    return JSON.stringify(tracks);
  }
`);
console.log(JSON.parse(data));
await spider.close();
