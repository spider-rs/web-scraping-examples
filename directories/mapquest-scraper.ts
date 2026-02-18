/**
 * MapQuest Scraper
 *
 * Extract local business results, driving directions, distance calculations, and p
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx mapquest-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
});

await spider.init();
const page = spider.page!;
await page.goto("https://www.mapquest.com/search/results?query=dentist&boundingBox=40.917577,-73.700272,40.477399,-74.259090");
await page.content();

const data = await page.extractFields({
  name: ".SearchResult-name",
  address: ".SearchResult-address",
  phone: ".SearchResult-phone",
  rating: ".SearchResult-rating",
  category: ".SearchResult-category",
  distance: ".SearchResult-distance",
});

console.log(data);
await spider.close();
