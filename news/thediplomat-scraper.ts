/**
 * The Diplomat Scraper
 *
 * Extract Asia-Pacific geopolitics reporting, international relations analysis, an
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx thediplomat-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
});

await spider.connect();
const page = spider.page!;
await page.goto("https://thediplomat.com/");
await page.content();

const data = await page.extractFields({
  headline: "h1.entry-title, h2.entry-title a",
  author: ".author-name a, .byline a",
  date: "time[datetime], .date",
  summary: ".entry-excerpt, .dek",
  body: ".entry-content, .article-body",
  region: ".region-tag, .category a",
  image: { selector: "figure img, .featured-image img", attribute: "src" },
});

console.log(data);
await spider.close();
