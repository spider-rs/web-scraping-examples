/**
 * Net-a-Porter Scraper
 *
 * Extract designer fashion listings, editorial content, pricing, and styling detai
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx net-a-porter-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
});

await spider.init();
const page = spider.page!;
await page.goto("https://www.net-a-porter.com/en-us/shop/clothing/dresses");
await page.content(10000);

const data = await page.extractFields({
  designer: ".ProductItem81__designer",
  name: ".ProductItem81__name",
  price: ".PriceWithSchema9__value",
  link: { selector: ".ProductItem81__link", attribute: "href" },
});

console.log(data);
await spider.close();
