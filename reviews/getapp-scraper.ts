/**
 * GetApp Scraper
 *
 * Extract software listings, user reviews, pricing comparisons, and feature matric
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx getapp-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
});

await spider.init();
const page = spider.page!;
await page.goto("https://www.getapp.com/project-management-planning-software/");

const data = await page.extractFields({
  productName: ".listing-card__title",
  rating: ".listing-card__rating",
  reviews: ".listing-card__review-count",
  pricing: ".listing-card__pricing",
  description: ".listing-card__description",
  freeTrial: ".listing-card__free-trial",
});

console.log(data);
await spider.close();
