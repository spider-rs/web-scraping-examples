/**
 * Kotaku Scraper
 *
 * Extract gaming news, reviews, opinion pieces, and culture coverage from Kotaku g
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx kotaku-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
});

await spider.init();
const page = spider.page!;
await page.goto("https://kotaku.com/culture/reviews");

const data = await page.extractFields({
  title: "h1, h2.sc-1qoge05-0 a",
  author: "[data-ga*='Byline'] a",
  date: "time",
  excerpt: ".js_entry-content p:first-child",
  category: "[data-ga*='Label']",
  tags: ".js_tags a",
});

console.log(data);
await spider.close();
