/**
 * Kidizen Scraper
 *
 * 
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx kidizen-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
});

await spider.init();
const page = spider.page!;
await page.goto("https://www.kidizen.com/shop?search=baby+clothes");
await page.content();

const data = await page.extractFields({
  title: ".listing-card__title",
  price: ".listing-card__price",
  brand: ".listing-card__brand",
  size: ".listing-card__size",
  image: { selector: ".listing-card__image img", attribute: "src" },
});

console.log(data);
await spider.close();
