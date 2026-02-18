/**
 * Westlaw Scraper
 *
 * Extract case law databases, legal headnotes, KeyCite references, and statute ann
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx westlaw-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
  captcha: "solve",
});

await spider.init();
const page = spider.page!;
await page.goto("https://www.westlaw.com/Browse/Home/AllResources");
await page.content(12000);

const data = await page.extractFields({
  title: ".resource-card .title",
  category: ".resource-card .category",
  description: ".resource-card .description",
  link: { selector: ".resource-card a", attribute: "href" },
});

console.log(data);
await spider.close();
