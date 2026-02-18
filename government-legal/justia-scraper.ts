/**
 * Justia Scraper
 *
 * Extract case law opinions, legal annotations, attorney profiles, and statute ref
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx justia-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
});

await spider.init();
const page = spider.page!;
await page.goto("https://law.justia.com/cases/federal/appellate-courts/");
await page.content();

const data = await page.extractFields({
  court: ".court-name",
  title: ".case-listing a",
  date: ".case-listing .date",
  link: { selector: ".case-listing a", attribute: "href" },
});

console.log(data);
await spider.close();
