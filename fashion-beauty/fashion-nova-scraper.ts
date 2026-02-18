/**
 * Fashion Nova Scraper
 *
 * Extract trendy fashion listings, influencer picks, pricing, and flash sales from
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx fashion-nova-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
});

await spider.init();
const page = spider.page!;
await page.goto("https://www.fashionnova.com/collections/dresses");
await page.content(10000);

const data = await page.extractFields({
  name: ".product-card__title",
  price: ".product-card__price .money",
  image: { selector: ".product-card__image img", attribute: "src" },
  link: { selector: ".product-card__link", attribute: "href" },
});

console.log(data);
await spider.close();
