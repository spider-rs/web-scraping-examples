/**
 * Tennis Channel Scraper
 *
 * Extract tennis news, match results, tournament draws, and player rankings from T
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx tennis-channel-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
});

await spider.init();
const page = spider.page!;
await page.goto("https://www.tennischannel.com/news");

const data = await page.extractFields({
  headline: "article h2 a, h3 a, [class*='title'] a",
  date: "time[datetime]",
  category: "[class*='category'], [class*='tag']",
  author: "[class*='byline'], [class*='author']",
  summary: "article p, [class*='excerpt']",
  image: { selector: "article img, [class*='story-card'] img", attribute: "src" },
});

console.log(data);
await spider.close();
