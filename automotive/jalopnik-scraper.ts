/**
 * Jalopnik Scraper
 *
 * Extract Jalopnik automotive news articles, car reviews, opinion pieces, and comm
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx jalopnik-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
});

await spider.init();
const page = spider.page!;
await page.goto("https://jalopnik.com/what-car-should-you-buy");

const data = await page.extractFields({
  title: "h1.sc-1efpnfq-0",
  author: ".sc-1pw4fyi-1 a",
  date: { selector: "time", attribute: "datetime" },
  body: ".js_post-content",
  comments: ".js_reply-count",
  image: { selector: ".js_lazy-image img", attribute: "data-src" },
});

console.log(data);
await spider.close();
