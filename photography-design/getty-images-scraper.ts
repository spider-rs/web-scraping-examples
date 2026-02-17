/**
 * Getty Images Scraper
 *
 * Extract editorial and creative image metadata, photographer credits, and rights 
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx getty-images-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
});

await spider.connect();
const page = spider.page!;
await page.goto("https://www.gettyimages.com/photos/business");
await page.content(10000);

const data = await page.extractFields({
  title: "[data-testid='gallery-asset-title']",
  photographer: "[data-testid='gallery-asset-artist']",
  collection: "[data-testid='gallery-asset-collection']",
  image: { selector: "[data-testid='gallery-asset-image'] img", attribute: "src" },
});

console.log(data);
await spider.close();
