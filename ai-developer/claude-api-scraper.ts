/**
 * Claude API Scraper
 *
 * Extract model specifications, API references, prompt engineering guides, and saf
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx claude-api-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
});

await spider.init();
const page = spider.page!;
await page.goto("https://docs.anthropic.com/en/docs/about-claude/models");
await page.content(10000);

const data = await page.extractFields({
  title: "h1",
  sections: "article h2",
  content: "article p",
  tables: "article table",
  codeExamples: "article pre code",
  navItems: "nav a[href*='docs']",
});

console.log(data);
await spider.close();
