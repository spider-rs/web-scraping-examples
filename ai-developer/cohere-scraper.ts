/**
 * Cohere Scraper
 *
 * Extract model documentation, API endpoint specs, embed and rerank guides, and pr
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx cohere-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
});

await spider.connect();
const page = spider.page!;
await page.goto("https://docs.cohere.com/docs/models");
await page.content(10000);

const data = await page.extractFields({
  title: "h1",
  sections: "article h2",
  content: "article p",
  codeExamples: "article pre code",
  parameters: "table tr",
  navItems: "nav a",
});

console.log(data);
await spider.close();
