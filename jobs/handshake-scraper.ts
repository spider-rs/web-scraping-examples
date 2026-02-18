/**
 * Handshake Scraper
 *
 * Gather entry-level job postings, internship listings, and employer profiles from
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx handshake-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
  captcha: "solve",
});

await spider.init();
const page = spider.page!;
await page.goto("https://joinhandshake.com/employers/");
await page.content(10000);

const data = await page.extractFields({
  heading: "h1",
  description: ".hero-description",
  features: ".feature-card h3",
  employerBenefits: ".benefits-list li",
  ctaText: ".cta-button",
  testimonials: ".testimonial-quote",
});

console.log(data);
await spider.close();
