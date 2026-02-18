/**
 * Last.fm Scraper
 *
 * Extract scrobble charts, listening history, artist bios, and music recommendatio
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx lastfm-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
});

await spider.init();
const page = spider.page!;
await page.goto("https://www.last.fm/charts");
await page.content();

const data = await page.extractFields({
  title: ".chartlist-name a",
  artist: ".chartlist-artist a",
  playCount: ".chartlist-count-bar-value",
  image: { selector: ".chartlist-image img", attribute: "src" },
});

console.log(data);
await spider.close();
