/**
 * Sky News Scraper
 *
 * Extract breaking news, live video feeds, and UK-focused reporting from Sky News 
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx skynews-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
});

await spider.connect();
const page = spider.page!;
await page.goto("https://news.sky.com/story/uk-politics-latest-12345");

const data = await page.extractFields({
  headline: "h1.sdc-article-header__title, .sdc-site-tile__headline",
  author: ".sdc-article-author__name, .byline a",
  date: "time[datetime], .sdc-article-date__date",
  summary: ".sdc-article-header__intro",
  body: ".sdc-article-body, .article-body",
  video: { selector: ".sdc-article-video video, video source", attribute: "src" },
  image: { selector: ".sdc-article-image img, picture img", attribute: "src" },
});

console.log(data);
await spider.close();
