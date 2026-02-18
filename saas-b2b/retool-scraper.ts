/**
 * Retool Scraper
 *
 * Extract component library data, template listings, pricing plans, and integratio
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx retool-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
});

await spider.init();
const page = spider.page!;
await page.goto("https://retool.com/templates");
await page.content(10000);

const data = await page.extractFields({
  pageTitle: "h1",
  templateName: "[data-testid='template-card'] h3",
  category: "[data-testid='template-card'] .category",
  description: "[data-testid='template-card'] p",
  integrations: "[data-testid='template-card'] .integrations",
  preview: { selector: "[data-testid='template-card'] img", attribute: "src" },
});

console.log(data);
await spider.close();
