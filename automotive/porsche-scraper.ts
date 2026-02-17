/**
 * Porsche Scraper
 *
 * Extract Porsche model specifications, configurator pricing, performance data, an
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx porsche-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
});

await spider.connect();
const page = spider.page!;
await page.goto("https://www.porsche.com/usa/models/");
await page.content(12000);

const data = await page.extractFields({
  model: "[class*='model-name'], h2",
  price: "[class*='price'], [class*='msrp']",
  engine: "[class*='engine']",
  horsepower: "[class*='horsepower'], [class*='kw']",
  acceleration: "[class*='acceleration'], [class*='0-60']",
  topSpeed: "[class*='top-speed']",
  image: { selector: "[class*='model-image'] img", attribute: "src" },
});

console.log(data);
await spider.close();
