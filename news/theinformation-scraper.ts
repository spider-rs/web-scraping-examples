/**
 * The Information Scraper
 *
 * Extract premium tech industry reporting, startup scoops, and Silicon Valley insi
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx theinformation-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
  captcha: "solve",
});

await spider.init();
const page = spider.page!;
await page.goto("https://www.theinformation.com/");
await page.content(10000);

const data = await page.extractFields({
  headline: "h1, h2.article-title",
  author: ".byline a, .author-name",
  date: "time[datetime], .date",
  summary: ".article-dek, .summary",
  body: ".article-body, .story-body",
  tags: ".tag-list a, .article-tags a",
});

console.log(data);
await spider.close();
