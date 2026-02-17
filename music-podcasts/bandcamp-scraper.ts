/**
 * Bandcamp Scraper
 *
 * Extract independent music releases, artist pages, album pricing, and fan purchas
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx bandcamp-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
});

await spider.connect();
const page = spider.page!;
await page.goto("https://bandcamp.com/tag/electronic");
await page.content();

const data = await page.extractFields({
  title: ".item_list .item a .title",
  artist: ".item_list .item a .itemsubtext",
  genre: ".item_list .item .genre",
  image: { selector: ".item_list .item img", attribute: "src" },
});

console.log(data);
await spider.close();
