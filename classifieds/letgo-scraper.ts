/**
 * Letgo Scraper
 *
 * Extract local buy-and-sell listings, pricing, item conditions, and seller data f
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx letgo-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
});

await spider.init();
const page = spider.page!;
await page.goto("https://www.letgo.com/en-us");
await page.content();

const data = await page.extractFields({
  title: ".product-card__title",
  price: ".product-card__price",
  location: ".product-card__location",
  image: { selector: ".product-card__image img", attribute: "src" },
});

console.log(data);
await spider.close();
