/**
 * TechCrunch AI Scraper
 *
 * Extract AI and startup funding articles, founder interviews, and deal analysis f
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx techcrunch-ai-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
});

await spider.connect();
const page = spider.page!;
await page.goto("https://techcrunch.com/2024/12/10/openai-announces-new-o1-model/");

const data = await page.extractFields({
  headline: "h1.article-hero__title, h1.wp-block-post-title",
  author: ".article-hero__author-link, .wp-block-tc23-author-card-name a",
  date: "time[datetime]",
  summary: ".article-hero__subtitle",
  body: ".article-content, .wp-block-post-content",
  image: { selector: ".article-hero__image img, figure img", attribute: "src" },
});

console.log(data);
await spider.close();
