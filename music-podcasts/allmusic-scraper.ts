/**
 * AllMusic Scraper
 *
 * Extract album reviews, artist discographies, genre classifications, and editoria
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx allmusic-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
});

await spider.init();
const page = spider.page!;
await page.goto("https://www.allmusic.com/newreleases");
await page.content();

const data = await page.extractFields({
  title: ".album-title a",
  artist: ".artist-name a",
  rating: ".allmusic-rating",
  genre: ".genre a",
  image: { selector: ".album-cover img", attribute: "src" },
});

console.log(data);
await spider.close();
