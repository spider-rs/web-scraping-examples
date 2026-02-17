/**
 * Rolling Stone Scraper
 *
 * Extract music reviews, cultural commentary, and political journalism from Rollin
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx rollingstone-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
});

await spider.connect();
const page = spider.page!;
await page.goto("https://www.rollingstone.com/music/music-news/");

const data = await page.extractFields({
  headline: "h1.c-title, h2.c-card__headline",
  author: ".c-byline__link, .c-card__byline a",
  date: "time[datetime]",
  summary: ".c-dek, .c-card__dek",
  body: ".c-content, .article-content",
  image: { selector: ".c-figure__image, .c-card__image img", attribute: "src" },
});

console.log(data);
await spider.close();
