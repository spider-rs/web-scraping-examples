/**
 * Reshot Scraper
 *
 * Extract curated free stock photos, icon packs, illustration sets, and tag metada
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx reshot-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
});

await spider.init();
const page = spider.page!;
await page.goto("https://www.reshot.com/free-stock-photos/food/");
await page.content();

const data = await page.extractFields({
  title: ".photo-card__title",
  tags: ".photo-card__tags",
  image: { selector: ".photo-card__image img", attribute: "src" },
  link: { selector: ".photo-card__link", attribute: "href" },
});

console.log(data);
await spider.close();
