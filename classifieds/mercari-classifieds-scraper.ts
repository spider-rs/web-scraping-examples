/**
 * Mercari Classifieds Scraper
 *
 * Extract secondhand item listings, seller profiles, pricing, and shipping details
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx mercari-classifieds-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
});

await spider.init();
const page = spider.page!;
await page.goto("https://www.mercari.com/search/?keyword=nintendo+switch");
await page.content(10000);

const data = await page.extractFields({
  name: "[data-testid='ItemName']",
  price: "[data-testid='ItemPrice']",
  shipping: "[data-testid='ItemShipping']",
  image: { selector: "[data-testid='ItemThumbnail'] img", attribute: "src" },
});

console.log(data);
await spider.close();
