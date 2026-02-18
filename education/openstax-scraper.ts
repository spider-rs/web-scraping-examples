/**
 * OpenStax Scraper
 *
 * Extract free peer-reviewed textbook catalogs, subject listings, adoption data, a
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx openstax-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
});

await spider.init();
const page = spider.page!;
await page.goto("https://openstax.org/subjects");

const data = await page.extractFields({
  title: ".book-card h3",
  subject: ".book-card .subject-label",
  description: ".book-card .book-description",
  authors: ".book-card .authors",
  adoptions: ".book-card .adoption-count",
  link: ".book-card a",
});

console.log(data);
await spider.close();
