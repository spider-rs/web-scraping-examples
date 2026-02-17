/**
 * South China Morning Post Scraper
 *
 * Extract Asia-Pacific news, China coverage, and business reporting from South Chi
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx scmp-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
});

await spider.connect();
const page = spider.page!;
await page.goto("https://www.scmp.com/news/china/diplomacy/article/3250000/china-us-relations");

const data = await page.extractFields({
  headline: "h1.headline, h1[class*='ArticleHeader']",
  author: ".author__name a, [class*='AuthorName'] a",
  date: "time[datetime], .article-header__publish-date",
  summary: ".article__summary, .article-header__subheadline",
  body: ".article__body, [class*='ArticleBody']",
  topics: ".article__topics a, .topic-tag a",
  image: { selector: ".article__header-image img, figure img", attribute: "src" },
});

console.log(data);
await spider.close();
