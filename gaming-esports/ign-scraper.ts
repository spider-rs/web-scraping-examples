/**
 * IGN Scraper
 *
 * Extract game reviews, scores, news articles, and video content metadata from IGN
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx ign-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
});

await spider.init();
const page = spider.page!;
await page.goto("https://www.ign.com/articles/elden-ring-review");

const data = await page.extractFields({
  title: "h1",
  score: ".review-score .score-text",
  author: ".author-name",
  date: "time",
  verdict: ".review-verdict",
  summary: ".article-summary",
});

console.log(data);
await spider.close();
