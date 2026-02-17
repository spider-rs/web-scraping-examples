/**
 * Audiomack Scraper
 *
 * Extract trending tracks, artist pages, playlist data, and streaming stats from A
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx audiomack-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
});

await spider.connect();
const page = spider.page!;
await page.goto("https://audiomack.com/trending-now");
await page.content();

const data = await page.extractFields({
  title: ".song-title a",
  artist: ".song-artist a",
  plays: ".song-plays",
  image: { selector: ".song-artwork img", attribute: "src" },
});

console.log(data);
await spider.close();
