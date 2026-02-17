/**
 * Chegg Scraper
 *
 * Extract textbook solutions, study guides, expert Q&A responses, and subject flas
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx chegg-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
});

await spider.connect();
const page = spider.page!;
await page.goto("https://www.chegg.com/textbooks/computer-science");

const data = await page.extractFields({
  title: ".book-title a",
  author: ".book-author",
  edition: ".book-edition",
  isbn: ".book-isbn",
  price: ".book-price",
  rating: ".star-rating",
});

console.log(data);
await spider.close();
