/**
 * Ford Scraper
 *
 * Extract Ford vehicle models, MSRP pricing, trim configurations, dealer inventory
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx ford-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
});

await spider.init();
const page = spider.page!;
await page.goto("https://www.ford.com/cars/mustang/");
await page.content(12000);

const data = await page.extractFields({
  model: "h1[class*='title']",
  price: "[class*='starting-price'], [class*='msrp']",
  trims: "[class*='trim-name'], [class*='nameplate']",
  mpg: "[class*='mpg'], [class*='fuel-economy']",
  engine: "[class*='engine'], [class*='powertrain']",
  image: { selector: "[class*='hero'] img, [class*='vehicle-image'] img", attribute: "src" },
});

console.log(data);
await spider.close();
