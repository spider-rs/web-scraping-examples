/**
 * MedlinePlus Scraper
 *
 * Extract consumer health information, drug summaries, medical encyclopedia entrie
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx medlineplus-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
});

await spider.connect();
const page = spider.page!;
await page.goto("https://medlineplus.gov/diabetes.html");

const data = await page.extractFields({
  title: "h1.with-also",
  summary: "#topic-summary",
  alsoKnownAs: ".defined-term",
  relatedTopics: ".defined-list li",
  resources: "#start-here .section-body a",
  lastUpdated: ".page-date",
});

console.log(data);
await spider.close();
