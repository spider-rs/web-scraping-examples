/**
 * Pocket Casts Scraper
 *
 * Extract podcast discover pages, trending shows, episode data, and curator picks 
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx pocket-casts-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
});

await spider.init();
const page = spider.page!;
await page.goto("https://www.pocketcasts.com/discover/");
await page.content();

const data = await page.extractFields({
  title: ".podcast-card__title",
  author: ".podcast-card__author",
  category: ".podcast-card__category",
  image: { selector: ".podcast-card__artwork img", attribute: "src" },
});

console.log(data);
await spider.close();
