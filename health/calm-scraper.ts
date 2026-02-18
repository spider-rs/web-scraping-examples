/**
 * Calm Scraper
 *
 * Extract meditation session catalogs, sleep story listings, mindfulness program c
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx calm-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
});

await spider.init();
const page = spider.page!;
await page.goto("https://www.calm.com/blog/mindfulness-meditation");

const data = await page.extractFields({
  title: "h1",
  author: "[class*='author']",
  content: ".article-body p",
  relatedArticles: ".related-articles a",
  categories: ".article-tags a",
  publishDate: "[class*='date']",
});

console.log(data);
await spider.close();
