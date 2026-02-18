/**
 * CNET Scraper
 *
 * Extract product reviews, tech news, and comparison guides from CNET including ex
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx cnet-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
});

await spider.init();
const page = spider.page!;
await page.goto("https://www.cnet.com/tech/computing/best-laptops-2024/");

const data = await page.extractFields({
  headline: "h1.c-head_title, h1.article-headline",
  author: ".c-assetAuthor_name a, .c-shortByline a",
  date: "time[datetime]",
  summary: ".c-head_dek, .article-dek",
  body: ".c-pageArticle_content, .article-main-body",
  rating: ".c-reviewCard_rating",
  image: { selector: ".c-head_image img, figure img", attribute: "src" },
});

console.log(data);
await spider.close();
