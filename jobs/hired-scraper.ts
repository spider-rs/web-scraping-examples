/**
 * Hired Scraper
 *
 * Extract curated tech job matches, salary offers, and company profiles from Hired
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx hired-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
});

await spider.connect();
const page = spider.page!;
await page.goto("https://hired.com/talent");
await page.content(10000);

const data = await page.extractFields({
  heading: "h1",
  subheading: ".hero-subtitle",
  salaryRange: ".salary-data",
  topCompanies: ".company-logos img[alt]",
  benefits: ".benefits-list li",
  ctaText: ".cta-primary",
  stats: ".stats-section .stat-value",
});

console.log(data);
await spider.close();
