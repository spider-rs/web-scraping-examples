/**
 * NBC News Scraper
 *
 * Extract breaking news stories, video reports, and investigative journalism from 
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx nbcnews-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
});

await spider.init();
const page = spider.page!;
await page.goto("https://www.nbcnews.com/tech/tech-news/ai-jobs-impact-2024");

const data = await page.extractFields({
  headline: "h1.article-hero-headline__htag, h1[data-testid='article-hero-headline']",
  author: ".article-hero-byline__author a, [data-testid='byline'] a",
  date: "time[datetime]",
  summary: ".article-dek",
  body: ".article-body__content, [data-testid='article-body']",
  image: { selector: ".article-hero-image img, picture img", attribute: "src" },
});

console.log(data);
await spider.close();
