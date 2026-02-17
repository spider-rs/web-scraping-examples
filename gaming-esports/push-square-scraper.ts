/**
 * Push Square Scraper
 *
 * Extract PlayStation game reviews, news, PSN deals, and trophy guides from Push S
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx push-square-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
});

await spider.connect();
const page = spider.page!;
await page.goto("https://www.pushsquare.com/reviews");

const data = await page.extractFields({
  title: "h3 a, .title a",
  score: ".score, .review-score",
  author: ".author a, .byline",
  date: "time",
  platform: ".platform, .system",
  excerpt: "p.excerpt, .synopsis",
});

console.log(data);
await spider.close();
