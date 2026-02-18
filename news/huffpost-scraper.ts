/**
 * HuffPost Scraper
 *
 * Extract news stories, opinion essays, and lifestyle content from HuffPost includ
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx huffpost-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
});

await spider.init();
const page = spider.page!;
await page.goto("https://www.huffpost.com/news/politics");

const data = await page.extractFields({
  headline: "h1.headline, h2.card__headline",
  author: ".author-list__author a, .entry-wirepartner__byline",
  date: "time[datetime]",
  summary: ".dek, .card__description",
  body: ".entry__text, .primary-cli",
  image: { selector: ".headline-image img, .card__image img", attribute: "src" },
});

console.log(data);
await spider.close();
