/**
 * Pixabay Scraper
 *
 * Extract royalty-free images, vectors, video clips, and contributor data from Pix
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx pixabay-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
});

await spider.init();
const page = spider.page!;
await page.goto("https://pixabay.com/images/search/mountains/");
await page.content();

const data = await page.extractFields({
  title: ".item .item__title",
  contributor: ".item .item__user",
  likes: ".item .item__likes",
  image: { selector: ".item img", attribute: "src" },
});

console.log(data);
await spider.close();
