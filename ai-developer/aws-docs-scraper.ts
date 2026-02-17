/**
 * AWS Documentation Scraper
 *
 * Extract service documentation, API references, CLI commands, and code examples f
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx aws-docs-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
});

await spider.connect();
const page = spider.page!;
await page.goto("https://docs.aws.amazon.com/lambda/latest/dg/welcome.html");

const data = await page.extractFields({
  title: "#main-col-body h1",
  breadcrumb: "#breadcrumbs li",
  content: "#main-col-body p",
  codeBlocks: "pre code",
  relatedTopics: ".relatedresources a",
  lastUpdated: "#main-col-body .doc-last-updated",
});

console.log(data);
await spider.close();
