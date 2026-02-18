/**
 * The Verge News Scraper
 *
 * Extract tech news headlines, product launches, and review scores from The Verge 
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx theverge-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
});

await spider.init();
const page = spider.page!;
await page.goto("https://www.theverge.com/reviews");
await page.content();

const data = await page.extractFields({
  headline: "h2.duet--article--headline",
  author: "span.duet--article--byline a",
  date: "time[datetime]",
  summary: ".duet--article--dek",
  score: ".c-entry-score__number",
  image: { selector: "figure img, picture source", attribute: "srcset" },
});

console.log(data);
await spider.close();
