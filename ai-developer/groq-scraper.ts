/**
 * Groq Scraper
 *
 * Extract supported model details, inference speed benchmarks, API docs, and prici
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx groq-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
});

await spider.connect();
const page = spider.page!;
await page.goto("https://console.groq.com/docs/models");
await page.content(10000);

const data = await page.extractFields({
  title: "h1",
  sections: "article h2",
  content: "article p",
  tables: "table",
  codeExamples: "pre code",
  navItems: "nav a",
});

console.log(data);
await spider.close();
