/**
 * Medical News Today Scraper
 *
 * Extract health news articles, expert reviews, condition overviews, and clinical 
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx medical-news-today-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
});

await spider.connect();
const page = spider.page!;
await page.goto("https://www.medicalnewstoday.com/articles/diabetes");

const data = await page.extractFields({
  title: "h1",
  author: "[class*='author-name']",
  reviewer: "[class*='reviewer']",
  summary: ".article-body > p:first-of-type",
  keyTakeaways: ".key-takeaways li",
  lastUpdated: "[class*='date']",
});

console.log(data);
await spider.close();
