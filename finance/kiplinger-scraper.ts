/**
 * Kiplinger Scraper
 *
 * Gather retirement planning guides, tax strategy articles, and investment recomme
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx kiplinger-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
});

await spider.init();
const page = spider.page!;
await page.goto("https://www.kiplinger.com/investing/stocks/best-stocks-to-buy");
await page.content();

const data = await page.extractFields({
  title: "h1.article-title",
  author: ".author-byline__author-name a",
  published: "time.published-date",
  summary: ".article-body-content p:first-of-type",
  reviewer: ".reviewer-name",
  updated: ".updated-date",
});

console.log(data);
await spider.close();
