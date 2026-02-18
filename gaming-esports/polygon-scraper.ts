/**
 * Polygon Scraper
 *
 * Extract gaming news, reviews, features, and editorial content from Polygon gamin
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx polygon-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
});

await spider.init();
const page = spider.page!;
await page.goto("https://www.polygon.com/reviews");

const data = await page.extractFields({
  title: "h1, h2.c-entry-box--compact__title a",
  author: ".c-byline__author-name",
  date: "time",
  summary: ".c-entry-summary p",
  category: ".c-entry-group-labels__item",
});

console.log(data);
await spider.close();
