/**
 * Marriott Scraper
 *
 * Extract hotel details, room rates, loyalty rewards, and property amenities from 
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx marriott-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
});

await spider.connect();
const page = spider.page!;
await page.goto("https://www.marriott.com/search/default.mi?roomCount=1&numAdultsPerRoom=2&destination=New+York+City");
await page.content(12000);

const data = await page.extractFields({
  name: "h2.hotel-name",
  rate: ".rate-value .t-price",
  address: ".hotel-address .l-address",
  rating: ".m-rating .rating-number",
  image: { selector: ".hero-image img", attribute: "src" },
  rewards: ".bonvoy-points",
});

console.log(data);
await spider.close();
