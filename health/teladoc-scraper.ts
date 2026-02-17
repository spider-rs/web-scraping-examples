/**
 * Teladoc Scraper
 *
 * Extract telehealth service offerings, provider specialties, pricing plans, and a
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx teladoc-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
});

await spider.connect();
const page = spider.page!;
await page.goto("https://www.teladoc.com/therapy/");

const data = await page.extractFields({
  title: "h1",
  description: ".hero-description, .hero-text p",
  services: ".service-card h3",
  pricing: ".pricing-section .price",
  features: ".feature-list li",
  cta: ".cta-button",
});

console.log(data);
await spider.close();
