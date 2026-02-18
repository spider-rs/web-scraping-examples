/**
 * Kick Social Scraper
 *
 * Extract live stream listings, channel data, viewer metrics, and category info fr
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx kick-social-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
});

await spider.init();
const page = spider.page!;
await page.goto("https://kick.com/categories");

const data = await page.extractFields({
  categoryName: ".category-card h3",
  viewerCount: ".category-card .viewer-count",
  thumbnail: ".category-card img[src]",
  tags: ".category-card .tag",
  streamCount: ".category-card .stream-count",
  topStreamer: ".category-card .top-streamer",
});

console.log(data);
await spider.close();
