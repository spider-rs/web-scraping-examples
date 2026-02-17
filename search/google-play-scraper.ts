/**
 * Google Play Store Scraper
 *
 * Extract app metadata from the Google Play Store — name, developer,
 * rating, genre, and description.
 *
 * Uses `extractFields()` for clean, single-call field extraction.
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx google-play-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
});
await spider.connect();
const page = spider.page!;

await page.goto(
  "https://play.google.com/store/apps/details?id=com.whatsapp",
);

const data = await page.extractFields({
  name: 'h1[itemprop="name"]',
  developer: 'a[href*="dev?id="]',
  rating: '[itemprop="starRating"] [aria-label]',
  genre: '[itemprop="genre"]',
  description: '[data-g-id="description"] div',
});

console.log(data);
await spider.close();
