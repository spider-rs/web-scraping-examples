/**
 * Lyst Scraper
 *
 * Extract fashion search results, trending items, price comparisons, and brand dat
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx lyst-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
});

await spider.init();
const page = spider.page!;
await page.goto("https://www.lyst.com/shop/womens-dresses/");
await page.content(10000);

const data = await page.extractFields({
  brand: ".product-card__designer",
  name: ".product-card__name",
  price: ".product-card__price",
  link: { selector: ".product-card a", attribute: "href" },
});

console.log(data);
await spider.close();
