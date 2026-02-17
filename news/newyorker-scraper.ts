/**
 * New Yorker Scraper
 *
 * Extract long-form features, fiction, poetry, and cultural criticism from The New
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx newyorker-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
  captcha: "solve",
});

await spider.connect();
const page = spider.page!;
await page.goto("https://www.newyorker.com/news");

const data = await page.extractFields({
  headline: "h1[class*='ContentHeaderHed'], h2.summary-item__hed",
  author: ".byline__name a, .summary-item__byline a",
  date: "time[datetime]",
  dek: "[class*='ContentHeaderDek'], .summary-item__dek",
  body: "[class*='ArticleBody'], .body__inner-container",
  image: { selector: "[class*='ResponsiveImage'] img, .summary-item__image img", attribute: "src" },
});

console.log(data);
await spider.close();
