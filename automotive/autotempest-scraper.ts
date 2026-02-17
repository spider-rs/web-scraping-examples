/**
 * AutoTempest Scraper
 *
 * Extract aggregated vehicle listings from AutoTempest, pulling results across mul
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx autotempest-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
});

await spider.connect();
const page = spider.page!;
await page.goto("https://www.autotempest.com/results?make=toyota&model=camry&zip=90001");
await page.content();

const data = await page.extractFields({
  title: ".result-row .title-and-subtitle a",
  price: ".result-row .result-price",
  mileage: ".result-row .result-mileage",
  source: { selector: ".source-icon", attribute: "title" },
  location: ".result-row .result-location",
  image: { selector: ".result-row img", attribute: "src" },
});

console.log(data);
await spider.close();
