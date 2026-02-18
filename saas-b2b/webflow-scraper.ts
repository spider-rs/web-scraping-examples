/**
 * Webflow Scraper
 *
 * Extract website templates, marketplace listings, pricing plans, and showcase sit
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx webflow-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
});

await spider.init();
const page = spider.page!;
await page.goto("https://webflow.com/templates");
await page.content(10000);

const data = await page.extractFields({
  pageTitle: "h1",
  templateName: "[data-testid='template-card'] h3",
  price: "[data-testid='template-card'] .price",
  category: "[data-testid='template-card'] .category",
  creator: "[data-testid='template-card'] .creator",
  description: "[data-testid='template-card'] p",
});

console.log(data);
await spider.close();
