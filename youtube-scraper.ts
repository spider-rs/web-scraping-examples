/**
 * YouTube Video Scraper
 *
 * Extract video metadata from YouTube — title, channel, views, date,
 * and description. Handles dynamic content loading.
 *
 * Uses `extractFields()` for clean, single-call field extraction.
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx youtube-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
});
await spider.connect();
const page = spider.page!;

await page.goto("https://www.youtube.com/watch?v=XqZsoesa55w");
await page.content(10000);

const data = await page.extractFields({
  title: "yt-formatted-string.ytd-watch-metadata",
  channel: "#channel-name yt-formatted-string a",
  views: ".ytd-watch-info-text .bold",
  date: "#info-strings yt-formatted-string",
  description: "#description-inline-expander yt-attributed-string",
});

console.log(data);
await spider.close();
