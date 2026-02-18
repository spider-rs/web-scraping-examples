/**
 * Noom Scraper
 *
 * Extract weight management program details, food logging categories, coaching fea
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx noom-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
});

await spider.init();
const page = spider.page!;
await page.goto("https://www.noom.com/");

const data = await page.extractFields({
  title: "h1",
  description: ".hero-description, .hero-text p",
  features: ".feature-card h3",
  benefits: ".benefits-section li",
  pricing: ".pricing-section .price",
  testimonials: ".testimonial-text",
});

console.log(data);
await spider.close();
