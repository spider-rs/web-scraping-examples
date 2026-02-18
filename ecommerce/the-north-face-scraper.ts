/**
 * The North Face Scraper
 *
 * Extract outdoor apparel, FUTURELIGHT technology specs, pricing, and seasonal col
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx the-north-face-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
});

await spider.init();
const page = spider.page!;
await page.goto("https://www.thenorthface.com/en-us/mens/mens-jackets-and-vests");

const data = await page.extractFields({
  heading: "h1",
  products: { selector: ".product-card__title", all: true },
  prices: { selector: ".product-card__price", all: true },
  badges: { selector: ".product-card__badge", all: true },
  colors: { selector: ".product-card__swatches-count", all: true },
});

console.log(data);
await spider.close();
