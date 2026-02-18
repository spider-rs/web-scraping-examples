/**
 * Podcast Index Scraper
 *
 * Extract open podcast directory data, feed URLs, value tags, and chapter metadata
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx podcast-index-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
});

await spider.init();
const page = spider.page!;
await page.goto("https://podcastindex.org/podcast/920666");
await page.content();

const data = await page.extractFields({
  title: ".podcast-title",
  author: ".podcast-author",
  description: ".podcast-description",
  categories: ".podcast-categories",
  episodeCount: ".podcast-episode-count",
  image: { selector: ".podcast-artwork img", attribute: "src" },
});

console.log(data);
await spider.close();
