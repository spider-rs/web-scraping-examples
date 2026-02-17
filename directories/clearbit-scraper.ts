/**
 * Clearbit Scraper
 *
 * Extract company enrichment data, technology stack profiles, employee directories
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx clearbit-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
});

await spider.connect();
const page = spider.page!;
await page.goto("https://clearbit.com/resources/tools/technology-search");
await page.content(8000);

const data = await page.extractFields({
  title: "h1",
  description: ".hero-description p",
  features: ".feature-card h3",
  capabilities: ".capabilities-list li",
  integrations: ".integration-item .name",
  pricing: ".pricing-card .price",
  cta: ".cta-primary",
});

console.log(data);
await spider.close();
