/**
 * Scholastic Scraper
 *
 * Extract children book catalogs, reading level guides, teacher resource libraries
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx scholastic-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
});

await spider.connect();
const page = spider.page!;
await page.goto("https://www.scholastic.com/teachers/books-and-collections/");

const data = await page.evaluate(`(() => {
  const books = [];
  document.querySelectorAll(".book-card").forEach(el => {
    const title = el.querySelector(".book-title")?.textContent?.trim();
    const author = el.querySelector(".book-author")?.textContent?.trim();
    const grade = el.querySelector(".grade-level")?.textContent?.trim();
    const price = el.querySelector(".book-price")?.textContent?.trim();
    const format = el.querySelector(".book-format")?.textContent?.trim();
    if (title) books.push({ title, author, grade, price, format });
  });
  return JSON.stringify({ total: books.length, books: books.slice(0, 15) });
})()`);

console.log(JSON.parse(data));
await spider.close();
