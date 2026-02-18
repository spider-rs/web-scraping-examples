/**
 * Salesforce AppExchange Scraper
 *
 * Extract app listings, ratings, reviews, and pricing tiers from Salesforce AppExc
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx salesforce-appexchange-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
});

await spider.init();
const page = spider.page!;
await page.goto("https://appexchange.salesforce.com/appxListingDetail?listingId=a0N3u00000MBinOEAT");

const data = await page.extractFields({
  name: "h1.appx-page-header-2__title",
  rating: ".appx-rating-summary__average",
  reviews: ".appx-rating-summary__count",
  price: ".appx-pricing__price",
  description: ".appx-detail-section__description",
  publisher: ".appx-detail-section__provider-name",
});

console.log(data);
await spider.close();
