/**
 * Netlify Scraper
 *
 * Extract plugin details, integration docs, starter templates, and platform featur
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx netlify-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
});

await spider.init();
const page = spider.page!;
await page.goto("https://www.netlify.com/integrations/");
await page.content(8000);

const data = await page.extractFields({
  name: ".integration-card h3",
  description: ".integration-card p",
  category: ".integration-card .tag",
  author: ".integration-card .author",
  link: ".integration-card a",
  icon: ".integration-card img",
});

console.log(data);
await spider.close();
