/**
 * Confluence Scraper
 *
 * Extract wiki features, pricing plans, template libraries, and space management d
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx confluence-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
});

await spider.connect();
const page = spider.page!;
await page.goto("https://www.atlassian.com/software/confluence/pricing");

const data = await page.extractFields({
  pageTitle: "h1",
  planName: "[data-testid='edition-name']",
  price: "[data-testid='edition-price']",
  description: "[data-testid='edition-description']",
  features: "[data-testid='feature-list']",
  cta: "[data-testid='edition-cta']",
});

console.log(data);
await spider.close();
