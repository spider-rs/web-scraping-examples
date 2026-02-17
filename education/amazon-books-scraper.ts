/**
 * Amazon Books Scraper
 *
 * Scrapes best selling books from Amazon Books section.
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx education/amazon-books-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
});
await spider.connect();
const page = spider.page!;

await page.goto("https://www.amazon.com/best-sellers-books-Amazon/zgbs/books/");
await page.content();
const data = await page.evaluate(`(() => {
  const books = Array.from(document.querySelectorAll('[data-test="book-item"]')).map(el => ({
    title: el.querySelector('[data-test="book-title"]')?.textContent?.trim(),
    author: el.querySelector('[data-test="author"]')?.textContent?.trim(),
    rating: el.querySelector('[data-test="rating"]')?.textContent?.trim(),
    price: el.querySelector('[data-test="price"]')?.textContent?.trim(),
  }));
  return JSON.stringify({ books });
})()`);
console.log(JSON.parse(data));
await spider.close();
