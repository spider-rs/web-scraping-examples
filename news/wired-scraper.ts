/**
 * Wired Scraper
 *
 * Extract technology features, gear reviews, and science reporting from Wired maga
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx wired-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
});

await spider.connect();
const page = spider.page!;
await page.goto("https://www.wired.com/tag/artificial-intelligence/");

const data = await page.extractFields({
  headline: "h1, h2.summary-item__hed",
  author: ".byline__name a, .summary-item__byline-link",
  date: "time[datetime]",
  summary: ".summary-item__dek",
  body: ".body__inner-container",
  image: { selector: ".summary-item__image img, picture img", attribute: "src" },
});

console.log(data);
await spider.close();
