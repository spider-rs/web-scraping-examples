/**
 * France24 Scraper
 *
 * Extract international news, live broadcasts, and French perspective reporting fr
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx france24-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
});

await spider.init();
const page = spider.page!;
await page.goto("https://www.france24.com/en/latest-news");

const data = await page.extractFields({
  headline: "h1.t-content__title, h2.article__title",
  author: ".t-content__author a, .m-from-author__name",
  date: "time[datetime]",
  summary: ".t-content__chapo, .article__summary",
  body: ".t-content__body, .article__text",
  image: { selector: ".t-content__inline-media img, .article__hero img", attribute: "src" },
});

console.log(data);
await spider.close();
