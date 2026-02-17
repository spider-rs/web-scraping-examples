/**
 * Mr. Handyman Scraper
 *
 * Extract handyman service offerings, franchise location details, and project gall
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx mr-handyman-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
});

await spider.connect();
const page = spider.page!;
await page.goto("https://www.mrhandyman.com/services/");
await page.content();

const data = await page.extractFields({
  service: ".service-card__title",
  description: ".service-card__description",
  link: { selector: ".service-card__link", attribute: "href" },
  image: { selector: ".service-card__image img", attribute: "src" },
});

console.log(data);
await spider.close();
