/**
 * Blackboard Scraper
 *
 * Extract learning management platform features, product comparisons, institutiona
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx blackboard-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
});

await spider.init();
const page = spider.page!;
await page.goto("https://www.blackboard.com/teaching-learning/learning-management");

const data = await page.extractFields({
  title: "h1.page-title",
  subtitle: ".page-subtitle",
  features: ".feature-card h3",
  descriptions: ".feature-card p",
  stats: ".stat-value",
  links: ".resource-link a",
});

console.log(data);
await spider.close();
