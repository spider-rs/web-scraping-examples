/**
 * The Nation Scraper
 *
 * Extract progressive political analysis, book reviews, cultural commentary, and c
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx thenation-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
});

await spider.init();
const page = spider.page!;
await page.goto("https://www.thenation.com/politics/");
await page.content();

const data = await page.extractFields({
  headline: "h1.article-title, h2.card-title a",
  author: ".byline a, .author-name a",
  date: "time[datetime], .date-published",
  summary: ".dek, .article-excerpt",
  body: ".article-body-inner, .post-content",
  tags: ".article-tags a, .topics a",
  image: { selector: "figure img, .featured-image img", attribute: "src" },
});

console.log(data);
await spider.close();
