/**
 * Bershka Scraper
 *
 * Extract youth fashion listings, trending styles, pricing, and collection data fr
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx bershka-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
});

await spider.init();
const page = spider.page!;
await page.goto("https://www.bershka.com/us/en/woman/new-collection-c1010378020.html");
await page.content(10000);

const data = await page.extractFields({
  name: ".product-grid-product-info__name",
  price: ".money-amount__main",
  link: { selector: ".product-link", attribute: "href" },
  image: { selector: ".product-grid-image img", attribute: "src" },
});

console.log(data);
await spider.close();
