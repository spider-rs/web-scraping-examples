/**
 * ArtStation Scraper
 *
 * Extract digital artwork, artist portfolios, like counts, and media assets from A
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx artstation-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
});

await spider.init();
const page = spider.page!;
await page.goto("https://www.artstation.com/search?sort_by=trending&query=concept+art");
await page.content();

const data = await page.extractFields({
  title: ".gallery-grid-card .gallery-grid-card__title",
  artist: ".gallery-grid-card .gallery-grid-card__artist",
  likes: ".gallery-grid-card .gallery-grid-card__likes",
  image: { selector: ".gallery-grid-card img", attribute: "src" },
});

console.log(data);
await spider.close();
