/**
 * Cycling News Scraper
 *
 * Extract cycling race results, stage breakdowns, rider profiles, and cycling news
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx cycling-news-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
});

await spider.init();
const page = spider.page!;
await page.goto("https://www.cyclingnews.com/");

const data = await page.extractFields({
  headline: "article h3 a, .article-name",
  category: ".category-link, .article-category",
  date: "article time",
  author: ".byline a, .author-name",
  summary: "article .synopsis, .article-excerpt",
  image: { selector: "article img, .listing-image img", attribute: "src" },
});

console.log(data);
await spider.close();
