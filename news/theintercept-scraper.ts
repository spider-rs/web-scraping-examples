/**
 * The Intercept Scraper
 *
 * Extract investigative journalism, national security reporting, and whistleblower
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx theintercept-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
});

await spider.init();
const page = spider.page!;
await page.goto("https://theintercept.com/");

const data = await page.extractFields({
  headline: "h1.post-heading, h2.CardHeadline",
  author: ".post-byline a, .CardByline a",
  date: "time[datetime]",
  summary: ".post-dek, .CardDek",
  body: ".post-content, .PostContent",
  image: { selector: ".post-featured-image img, figure img", attribute: "src" },
});

console.log(data);
await spider.close();
