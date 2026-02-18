/**
 * Shippo Scraper
 *
 * Extract multi-carrier rate comparisons, label generation options, carrier perfor
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx shippo-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
});

await spider.init();
const page = spider.page!;
await page.goto("https://goshippo.com/carriers/");
await page.content();

const data = await page.extractFields({
  title: "h1",
  carriers: ".carrier-card h3",
  descriptions: ".carrier-card p",
  features: ".carrier-card .features li",
  links: ".carrier-card a",
  pricing: ".pricing-section .price",
});

console.log(data);
await spider.close();
