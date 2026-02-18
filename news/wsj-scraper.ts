/**
 * Wall Street Journal Scraper
 *
 * Extract financial news, market analysis, and exclusive business reporting from T
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx wsj-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
  captcha: "solve",
});

await spider.init();
const page = spider.page!;
await page.goto("https://www.wsj.com/economy");

const data = await page.extractFields({
  headline: "h1, h2.WSJTheme--headline",
  author: ".byline a, .WSJTheme--byline",
  date: "time[datetime]",
  summary: ".article-header .summary, .WSJTheme--description",
  body: ".article-body, .WSJTheme--story-body",
  image: { selector: ".article-header img, figure img", attribute: "src" },
});

console.log(data);
await spider.close();
