/**
 * Canvas LMS Scraper
 *
 * Extract learning management system features, institutional adoption data, and in
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx canvas-lms-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
});

await spider.init();
const page = spider.page!;
await page.goto("https://www.instructure.com/canvas");

const data = await page.extractFields({
  productName: "h1.hero-title",
  description: ".hero-description p",
  features: ".feature-grid .feature-title",
  stats: ".stat-block .stat-number",
  integrations: ".integration-logo img[alt]",
  cta: ".hero-cta a",
});

console.log(data);
await spider.close();
