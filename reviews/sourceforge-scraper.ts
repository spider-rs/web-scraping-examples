/**
 * SourceForge Scraper
 *
 * Extract open-source project listings, download counts, user reviews, and compari
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx sourceforge-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
});

await spider.connect();
const page = spider.page!;
await page.goto("https://sourceforge.net/directory/");

const data = await page.extractFields({
  projectName: ".project-info h3 a",
  description: ".project-info .description",
  rating: ".project-info .star-rating",
  downloads: ".project-info .download-count",
  lastUpdated: ".project-info .updated",
  category: ".project-info .category",
});

console.log(data);
await spider.close();
