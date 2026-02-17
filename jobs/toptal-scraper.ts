/**
 * Toptal Scraper
 *
 * Extract freelancer profiles, skill sets, hourly rates, and availability from Top
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx toptal-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
});

await spider.connect();
const page = spider.page!;
await page.goto("https://www.toptal.com/developers");
await page.content(10000);

const data = await page.extractFields({
  heading: "h1",
  description: ".hero-description",
  skills: ".skill-tags li",
  processSteps: ".process-steps .step-title",
  talentCategories: ".talent-categories a",
  ctaText: ".cta-section .btn",
});

console.log(data);
await spider.close();
