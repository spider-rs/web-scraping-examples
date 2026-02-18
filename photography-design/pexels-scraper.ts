/**
 * Pexels Scraper
 *
 * Extract free stock photos, video thumbnails, photographer info, and resolution d
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx pexels-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
});

await spider.init();
const page = spider.page!;
await page.goto("https://www.pexels.com/search/landscape/");
await page.content();

const data = await page.extractFields({
  title: ".photo-item__title",
  photographer: ".photo-item__photographer",
  image: { selector: ".photo-item__img img", attribute: "src" },
  alt: { selector: ".photo-item__img img", attribute: "alt" },
});

console.log(data);
await spider.close();
