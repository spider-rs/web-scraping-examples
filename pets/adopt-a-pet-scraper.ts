/**
 * Adopt-a-Pet Scraper
 *
 * Extract shelter animal profiles, adoption fee details, pet temperament info, and
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx adopt-a-pet-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
});

await spider.connect();
const page = spider.page!;
await page.goto("https://www.adoptapet.com/cat-adoption/search/25miles/90210");
await page.content(10000);

const data = await page.extractFields({
  name: ".pet-card__name",
  breed: ".pet-card__breed",
  age: ".pet-card__age",
  gender: ".pet-card__gender",
  shelter: ".pet-card__shelter",
  image: { selector: ".pet-card__photo img", attribute: "src" },
});

console.log(data);
await spider.close();
