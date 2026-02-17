/**
 * Apple Music Scraper
 *
 * Extract album tracklists, artist discographies, playlist contents, and editorial
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx apple-music-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
});

await spider.connect();
const page = spider.page!;
await page.goto("https://music.apple.com/us/album/midnights/1649434004");
await page.content(10000);

const data = await page.extractFields({
  album: ".headings__title",
  artist: ".headings__subtitles a",
  releaseDate: ".headings__metadata-bottom time",
  genre: ".headings__metadata-bottom a",
  trackCount: ".songs-list-length",
});

console.log(data);
await spider.close();
