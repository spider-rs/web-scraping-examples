/**
 * The Independent Scraper
 *
 * Extract UK and world news, analysis, and feature articles from The Independent d
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx independent-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
});

await spider.init();
const page = spider.page!;
await page.goto("https://www.independent.co.uk/news/world");

const data = await page.extractFields({
  headline: "h1#articleHeader, h2.sc-1kn4z2h-0",
  author: ".sc-da6dqp-0 a, .author-name a",
  date: "time[datetime], amp-timeago",
  summary: "#article-summary, .sc-1kn4z2h-1",
  body: "#main, .sc-aw3jgi-0",
  image: { selector: "#main-image img, .hero-image img", attribute: "src" },
});

console.log(data);
await spider.close();
