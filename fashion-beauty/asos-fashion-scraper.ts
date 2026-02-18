/**
 * ASOS Fashion Scraper
 *
 * Extract fashion listings, brand names, pricing, and sale data from ASOS online s
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx asos-fashion-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
});

await spider.init();
const page = spider.page!;
await page.goto("https://www.asos.com/us/women/dresses/cat/?cid=8799");
await page.content(10000);

const data = await page.extractFields({
  title: "article h2",
  price: "article [data-auto-id='productTilePrice'] span",
  brand: "article [data-auto-id='productTileBrand']",
  link: { selector: "article a", attribute: "href" },
});

console.log(data);
await spider.close();
