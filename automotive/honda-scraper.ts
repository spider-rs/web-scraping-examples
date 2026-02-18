/**
 * Honda Scraper
 *
 * Extract Honda vehicle models, trim pricing, feature packages, dealer search resu
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx honda-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
});

await spider.init();
const page = spider.page!;
await page.goto("https://www.honda.com/cars/civic");
await page.content(12000);

const data = await page.extractFields({
  model: "h1[class*='model-name'], h1",
  price: "[class*='starting-msrp'], [class*='price']",
  trims: "[class*='trim-name']",
  mpg: "[class*='mpg'], [class*='fuel-economy']",
  engine: "[class*='engine-spec']",
  image: { selector: "[class*='hero-image'] img, [class*='model-image'] img", attribute: "src" },
});

console.log(data);
await spider.close();
