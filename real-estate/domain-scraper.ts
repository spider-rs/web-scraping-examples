/**
 * Domain Scraper
 *
 * Extract Australian property listings, auction results, and suburb profiles from 
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx domain-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
});

await spider.init();
const page = spider.page!;
await page.goto("https://www.domain.com.au/sale/sydney-nsw-2000/");

const data = await page.extractFields({
  address: "[data-testid='listing-card-address']",
  price: "[data-testid='listing-card-price']",
  beds: "[data-testid='property-features-beds']",
  baths: "[data-testid='property-features-baths']",
  parking: "[data-testid='property-features-parking']",
  agent: "[data-testid='listing-card-agent']",
  image: { selector: "[data-testid='listing-card-image'] img", attribute: "src" },
});

console.log(data);
await spider.close();
