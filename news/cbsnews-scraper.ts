/**
 * CBS News Scraper
 *
 * Extract news articles, 60 Minutes features, and investigative reports from CBS N
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx cbsnews-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
});

await spider.connect();
const page = spider.page!;
await page.goto("https://www.cbsnews.com/news/ai-regulation-congress-2024/");

const data = await page.extractFields({
  headline: "h1.content__title, h1.article-title",
  author: ".content__meta-byline a, .byline__author a",
  date: "time[datetime]",
  summary: ".content__meta-dek",
  body: ".content__body, .article-body",
  image: { selector: ".content__header-image img, figure img", attribute: "src" },
});

console.log(data);
await spider.close();
