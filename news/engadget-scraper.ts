/**
 * Engadget Scraper
 *
 * Extract gadget reviews, tech news, and buyer guides from Engadget including hand
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx engadget-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
});

await spider.init();
const page = spider.page!;
await page.goto("https://www.engadget.com/ai/");

const data = await page.extractFields({
  headline: "h1, h2.My\\(0\\)",
  author: ".caas-author-byline-collapse a",
  date: "time",
  summary: ".caas-subheadline",
  body: ".caas-body",
  image: { selector: "figure img, .caas-img img", attribute: "src" },
});

console.log(data);
await spider.close();
