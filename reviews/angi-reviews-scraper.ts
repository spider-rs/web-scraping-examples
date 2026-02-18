/**
 * Angi Reviews Scraper
 *
 * Extract home service pro listings, verified reviews, pricing estimates, and avai
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx angi-reviews-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
});

await spider.init();
const page = spider.page!;
await page.goto("https://www.angi.com/companylist/plumbing.htm");

const data = await page.extractFields({
  businessName: ".provider-card__name",
  rating: ".provider-card__rating",
  reviews: ".provider-card__review-count",
  serviceType: ".provider-card__services",
  location: ".provider-card__location",
  verified: ".provider-card__badge",
});

console.log(data);
await spider.close();
