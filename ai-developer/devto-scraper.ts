/**
 * Dev.to Scraper
 *
 * Extract blog articles, reaction counts, reading times, and author profiles from 
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx devto-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
});

await spider.connect();
const page = spider.page!;
await page.goto("https://dev.to/top/week");

const data = await page.extractFields({
  title: ".crayons-story h2 a",
  author: ".crayons-story [class*='profile'] .crayons-story__secondary",
  reactions: ".crayons-story [class*='reactions'] .aggregate_reactions_counter",
  comments: ".crayons-story [class*='comments'] .comments-count",
  tags: ".crayons-story .crayons-tag",
  readingTime: ".crayons-story [class*='save'] small",
});

console.log(data);
await spider.close();
