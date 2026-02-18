/**
 * Sitejabber Scraper
 *
 * Extract website reviews, trust ratings, and consumer feedback from Sitejabber re
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx sitejabber-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
});

await spider.init();
const page = spider.page!;
await page.goto("https://www.sitejabber.com/reviews/amazon.com");

const data = await page.extractFields({
  companyName: "h1.company-name",
  overallRating: ".overall-rating__score",
  totalReviews: ".overall-rating__count",
  reviewTitle: ".review__title",
  reviewText: ".review__text",
  reviewRating: ".review__rating",
});

console.log(data);
await spider.close();
