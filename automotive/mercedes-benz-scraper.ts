/**
 * Mercedes-Benz Scraper
 *
 * Extract Mercedes-Benz model details, configuration options, MSRP pricing, and ce
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx mercedes-benz-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
});

await spider.init();
const page = spider.page!;
await page.goto("https://www.mbusa.com/en/vehicles/class/c-class/sedan");
await page.content(12000);

const data = await page.extractFields({
  model: "h1[class*='model'], h1",
  price: "[class*='price'], [class*='msrp']",
  engine: "[class*='engine'], [class*='powertrain']",
  horsepower: "[class*='horsepower'], [class*='hp']",
  bodyStyle: "[class*='body-style']",
  image: { selector: "[class*='hero'] img, [class*='vehicle'] img", attribute: "src" },
});

console.log(data);
await spider.close();
