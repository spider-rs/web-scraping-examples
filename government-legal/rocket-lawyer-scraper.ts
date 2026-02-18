/**
 * Rocket Lawyer Scraper
 *
 * Extract legal document templates, attorney consultations, pricing plans, and ser
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx rocket-lawyer-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
});

await spider.init();
const page = spider.page!;
await page.goto("https://www.rocketlawyer.com/business-and-contracts.rl");
await page.content(10000);

const data = await page.extractFields({
  title: ".document-card .title",
  category: ".document-card .category",
  description: ".document-card .description",
  link: { selector: ".document-card a", attribute: "href" },
});

console.log(data);
await spider.close();
