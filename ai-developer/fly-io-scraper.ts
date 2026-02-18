/**
 * Fly.io Scraper
 *
 * Extract deployment docs, region availability, pricing tiers, and machine configu
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx fly-io-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
});

await spider.init();
const page = spider.page!;
await page.goto("https://fly.io/docs/");

const data = await page.extractFields({
  title: "h1",
  navItems: "nav a",
  sections: "article h2",
  content: "article p",
  codeBlocks: "article pre code",
  links: "article a",
});

console.log(data);
await spider.close();
