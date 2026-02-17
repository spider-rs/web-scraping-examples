/**
 * LangChain Scraper
 *
 * Extract integration docs, chain templates, API references, and component guides 
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx langchain-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
});

await spider.connect();
const page = spider.page!;
await page.goto("https://python.langchain.com/docs/integrations/llms/");
await page.content(10000);

const data = await page.extractFields({
  title: "h1",
  sections: "article h2",
  content: "article p",
  codeExamples: "article pre code",
  navItems: "nav a[href*='integrations']",
  breadcrumb: "nav[aria-label='breadcrumb'] a",
});

console.log(data);
await spider.close();
