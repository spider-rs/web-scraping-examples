/**
 * MusicBrainz Scraper
 *
 * Extract open music database records, release groups, artist relationships, and r
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx musicbrainz-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
});

await spider.connect();
const page = spider.page!;
await page.goto("https://musicbrainz.org/search?query=radiohead&type=release_group");
await page.content();

const data = await page.extractFields({
  title: ".tbl td a bdi",
  artist: ".tbl td:nth-child(2) a bdi",
  type: ".tbl td:nth-child(3)",
  year: ".tbl td:nth-child(4)",
});

console.log(data);
await spider.close();
