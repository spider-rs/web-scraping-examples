/**
 * Trello Scraper
 *
 * Extract board templates, power-up listings, pricing plans, and feature compariso
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx trello-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
});

await spider.init();
const page = spider.page!;
await page.goto("https://trello.com/templates");
await page.content(10000);

const data = await page.extractFields({
  pageTitle: "h1",
  templateName: "[data-testid='template-card'] h3",
  category: "[data-testid='template-card'] .category",
  description: "[data-testid='template-card'] p",
  author: "[data-testid='template-card'] .author",
  uses: "[data-testid='template-card'] .use-count",
});

console.log(data);
await spider.close();
