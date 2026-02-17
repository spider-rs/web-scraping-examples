/**
 * Seat Guru Scraper
 *
 * Extract aircraft seat maps, seat reviews, legroom data, and airline cabin config
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx seat-guru-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
});

await spider.connect();
const page = spider.page!;
await page.goto("https://www.seatguru.com/airlines/United_Airlines/United_Airlines_Boeing_787-9_V2.php");
await page.content(10000);

const data = await page.extractFields({
  aircraft: ".aircraft-title",
  seatClass: ".cabin-class-name",
  pitch: ".seat-pitch",
  width: ".seat-width",
  recline: ".seat-recline",
  comments: ".seat-review-summary",
  image: { selector: ".seat-map-image img", attribute: "src" },
});

console.log(data);
await spider.close();
