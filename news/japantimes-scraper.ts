/**
 * Japan Times Scraper
 *
 * Extract Japanese news in English, opinion columns, and cultural reporting from T
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx japantimes-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
});

await spider.init();
const page = spider.page!;
await page.goto("https://www.japantimes.co.jp/news/");

const data = await page.extractFields({
  headline: "h1.single-title, h2.article-title",
  author: ".single-author a, .article-byline a",
  date: "time[datetime]",
  summary: ".single-excerpt, .article-dek",
  body: ".jtarticle, .single-content",
  image: { selector: ".single-featured-image img, figure img", attribute: "src" },
});

console.log(data);
await spider.close();
