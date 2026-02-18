/**
 * Lucid Motors Scraper
 *
 * Extract Lucid electric vehicle specs, range leadership data, pricing configurati
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx lucid-motors-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
});

await spider.init();
const page = spider.page!;
await page.goto("https://www.lucidmotors.com/air");
await page.content(12000);

const data = await page.extractFields({
  model: "h1[class*='model'], h1",
  price: "[class*='price'], [class*='starting']",
  range: "[class*='range'], [class*='epa']",
  horsepower: "[class*='horsepower'], [class*='hp']",
  acceleration: "[class*='acceleration'], [class*='0-60']",
  charging: "[class*='charging'], [class*='charge-speed']",
  image: { selector: "[class*='hero'] img, [class*='vehicle'] img", attribute: "src" },
});

console.log(data);
await spider.close();
