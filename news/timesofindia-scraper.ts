/**
 * Times of India Scraper
 *
 * Extract Indian news, cricket scores, and Bollywood coverage from Times of India 
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx timesofindia-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
});

await spider.connect();
const page = spider.page!;
await page.goto("https://timesofindia.indiatimes.com/india/budget-2024-highlights");

const data = await page.extractFields({
  headline: "h1.HNMDR, h1._23498",
  author: ".xf8Pm a, ._3Mkg- a",
  date: "time[datetime], .xf8Pm time, ._3Mkg- span",
  summary: "._2NFXP, .article-desc",
  body: "._s30J, .ga-articletext, [data-articlebody]",
  city: ".byline-city, ._3Mkg-",
  image: { selector: "._3sGpx img, .article-img img", attribute: "src" },
});

console.log(data);
await spider.close();
