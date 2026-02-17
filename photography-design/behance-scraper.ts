/**
 * Behance Scraper
 *
 * Extract creative projects, designer portfolios, appreciation counts, and tool ta
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx behance-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
});

await spider.connect();
const page = spider.page!;
await page.goto("https://www.behance.net/search/projects?field=ui%2Fux");
await page.content();

const data = await page.extractFields({
  title: ".ProjectCoverNeue-title-Q1t",
  creator: ".ProjectCoverNeue-ownerName-vEk",
  appreciations: ".ProjectCoverNeue-stats-ABf span",
  image: { selector: ".ProjectCoverNeue-image-SQH img", attribute: "src" },
});

console.log(data);
await spider.close();
