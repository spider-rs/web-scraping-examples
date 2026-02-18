/**
 * Salon Scraper
 *
 * Extract progressive news commentary, cultural criticism, science reporting, and 
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx salon-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
});

await spider.init();
const page = spider.page!;
await page.goto("https://www.salon.com/topic/politics");
await page.content();

const data = await page.extractFields({
  headline: "h1.title, h2.story-title",
  author: ".byline a, .author-name a",
  date: "time[datetime], .date",
  summary: ".dek, .article-excerpt",
  body: ".article-body, .story-body",
  tags: ".tag-list a, .topic-tags a",
  image: { selector: "figure img, .featured-image img", attribute: "src" },
});

console.log(data);
await spider.close();
