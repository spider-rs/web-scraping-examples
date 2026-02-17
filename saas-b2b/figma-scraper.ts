/**
 * Figma Scraper
 *
 * Extract community files, plugin listings, pricing plans, and design resource dat
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx figma-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
});

await spider.connect();
const page = spider.page!;
await page.goto("https://www.figma.com/community/plugins");
await page.content(10000);

const data = await page.extractFields({
  pageTitle: "h1",
  pluginName: "[data-testid='resource-card'] h3",
  creator: "[data-testid='resource-card'] [data-testid='creator-name']",
  installs: "[data-testid='resource-card'] [data-testid='install-count']",
  likes: "[data-testid='resource-card'] [data-testid='like-count']",
  description: "[data-testid='resource-card'] p",
});

console.log(data);
await spider.close();
