/**
 * Render Scraper
 *
 * Extract service templates, pricing details, documentation guides, and platform f
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx render-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
});

await spider.connect();
const page = spider.page!;
await page.goto("https://render.com/docs");
await page.content(8000);

const data = await page.extractFields({
  title: ".docs-nav a",
  heading: "article h1",
  sections: "article h2",
  content: "article p",
  codeExamples: "article pre code",
  links: "article a[href*='docs']",
});

console.log(data);
await spider.close();
