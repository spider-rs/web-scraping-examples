/**
 * USA Today Scraper
 *
 * Extract national news, sports scores, and lifestyle content from USA Today inclu
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx usatoday-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
});

await spider.connect();
const page = spider.page!;
await page.goto("https://www.usatoday.com/story/news/nation/2024/01/15/national-weather");

const data = await page.extractFields({
  headline: "h1.gnt_ar_hl, h1[data-ss-t]",
  author: "a.gnt_ar_by_a, .gnt_ar_by a",
  date: "time[datetime]",
  summary: ".gnt_ar_sbl",
  body: ".gnt_ar_b, article .article-body",
  image: { selector: ".gnt_ar_lg img, picture img", attribute: "src" },
});

console.log(data);
await spider.close();
