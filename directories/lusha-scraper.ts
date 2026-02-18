/**
 * Lusha Scraper
 *
 * Extract B2B contact enrichment data, direct dial numbers, company profiles, and 
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx lusha-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
});

await spider.init();
const page = spider.page!;
await page.goto("https://www.lusha.com/company-search/");
await page.content(10000);

const data = await page.extractFields({
  title: "h1",
  description: ".hero-description p",
  features: ".feature-card h3",
  benefits: ".benefits-list li",
  integrations: ".integration-logo img[alt]",
  pricing: ".pricing-card .price",
  cta: ".cta-button",
});

console.log(data);
await spider.close();
