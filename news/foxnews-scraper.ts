/**
 * Fox News Scraper
 *
 * Extract news articles, opinion columns, and video segments from Fox News across 
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx foxnews-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
});

await spider.connect();
const page = spider.page!;
await page.goto("https://www.foxnews.com/politics/biden-congress-spending-2024");

const data = await page.extractFields({
  headline: "h1.headline, h1.article-header__headline",
  author: ".author-byline a, .article-meta .author a",
  date: "time[datetime], .article-date",
  summary: ".article-header__sub-headline",
  body: ".article-body, .article-content",
  image: { selector: ".article-header__hero img, .featured-image img", attribute: "src" },
});

console.log(data);
await spider.close();
