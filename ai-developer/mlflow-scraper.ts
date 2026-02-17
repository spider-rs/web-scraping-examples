/**
 * MLflow Scraper
 *
 * Extract documentation guides, API references, plugin listings, and release notes
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx mlflow-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
});

await spider.connect();
const page = spider.page!;
await page.goto("https://mlflow.org/docs/latest/index.html");

const data = await page.extractFields({
  title: "h1",
  sections: ".section h2",
  content: ".section p",
  codeExamples: ".highlight pre",
  navItems: ".toctree-l1 a",
  version: ".version",
});

console.log(data);
await spider.close();
