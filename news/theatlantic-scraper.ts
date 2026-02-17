/**
 * The Atlantic Scraper
 *
 * Extract long-form essays, cultural criticism, and political commentary from The 
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx theatlantic-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
  captcha: "solve",
});

await spider.connect();
const page = spider.page!;
await page.goto("https://www.theatlantic.com/technology/");

const data = await page.extractFields({
  headline: "h1, h2.ArticleTitle",
  author: ".ArticleByline a, [data-testid='AuthorLink']",
  date: "time[datetime]",
  dek: ".ArticleDek, .article-dek",
  body: ".ArticleBody, [class*='article-body']",
  image: { selector: "[data-testid='LeadImage'] img, figure img", attribute: "src" },
});

console.log(data);
await spider.close();
