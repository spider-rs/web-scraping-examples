/**
 * Nolo Scraper
 *
 * Extract legal guides, DIY legal forms, attorney directories, and FAQ content fro
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx nolo-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
});

await spider.connect();
const page = spider.page!;
await page.goto("https://www.nolo.com/legal-encyclopedia");
await page.content();

const data = await page.extractFields({
  title: ".article-list h3 a",
  category: ".article-list .category",
  summary: ".article-list .summary",
  link: { selector: ".article-list h3 a", attribute: "href" },
});

console.log(data);
await spider.close();
