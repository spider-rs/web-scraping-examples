/**
 * Project Gutenberg Scraper
 *
 * Extract free ebook catalogs, author bibliographies, download formats, and popula
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx project-gutenberg-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
});

await spider.connect();
const page = spider.page!;
await page.goto("https://www.gutenberg.org/ebooks/search/?sort_order=downloads");

const data = await page.evaluate(`(() => {
  const books = [];
  document.querySelectorAll(".booklink").forEach(el => {
    const title = el.querySelector(".title")?.textContent?.trim();
    const author = el.querySelector(".subtitle")?.textContent?.trim();
    const downloads = el.querySelector(".extra")?.textContent?.trim();
    const link = el.querySelector("a.link")?.getAttribute("href");
    if (title) books.push({ title, author, downloads, link });
  });
  return JSON.stringify({ total: books.length, books: books.slice(0, 20) });
})()`);

console.log(JSON.parse(data));
await spider.close();
