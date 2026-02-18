/**
 * Boohoo Scraper
 *
 * Extract fast fashion listings, flash sale data, discount codes, and trending ite
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx boohoo-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
});

await spider.init();
const page = spider.page!;
await page.goto("https://us.boohoo.com/womens/dresses");
await page.content(10000);

const data = await page.extractFields({
  name: ".b-product_tile-link",
  price: ".b-price-item",
  image: { selector: ".b-product_tile-image img", attribute: "src" },
  link: { selector: ".b-product_tile-link", attribute: "href" },
});

console.log(data);
await spider.close();
