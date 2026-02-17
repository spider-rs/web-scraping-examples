/**
 * Flickr Scraper
 *
 * Extract photo streams, album data, EXIF metadata, and Creative Commons licensing
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx flickr-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
});

await spider.connect();
const page = spider.page!;
await page.goto("https://www.flickr.com/search/?text=street+photography");
await page.content();

const data = await page.extractFields({
  title: ".photo-list-photo-title",
  photographer: ".photo-list-photo-owner",
  image: { selector: ".photo-list-photo-view img", attribute: "src" },
  link: { selector: ".photo-list-photo-view a", attribute: "href" },
});

console.log(data);
await spider.close();
