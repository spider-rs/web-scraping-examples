/**
 * Swimming World Scraper
 *
 * Extract swimming news, meet results, world records, and athlete profiles from Sw
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx swimming-world-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
});

await spider.init();
const page = spider.page!;
await page.goto("https://www.swimmingworldmagazine.com/news/");

const data = await page.extractFields({
  headline: "article h2 a, .entry-title a",
  author: ".entry-author, .author-name",
  date: ".entry-date, time",
  excerpt: ".entry-summary, .entry-content p",
  category: ".entry-category a, .cat-links a",
  image: { selector: "article img, .entry-image img", attribute: "src" },
});

console.log(data);
await spider.close();
