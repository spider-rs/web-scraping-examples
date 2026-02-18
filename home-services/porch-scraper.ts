/**
 * Porch Scraper
 *
 * Extract home improvement project data, contractor matching results, and cost est
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx porch-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
});

await spider.init();
const page = spider.page!;
await page.goto("https://porch.com/seattle-wa/electricians");
await page.content(10000);

const data = await page.extractFields({
  name: ".pro-card__name",
  rating: ".pro-card__rating",
  reviews: ".pro-card__review-count",
  license: ".pro-card__license-badge",
  specialties: ".pro-card__specialties",
  image: { selector: ".pro-card__photo img", attribute: "src" },
});

console.log(data);
await spider.close();
