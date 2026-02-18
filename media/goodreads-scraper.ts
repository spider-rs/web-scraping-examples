/**
 * Goodreads Scraper
 *
 * Scrapes the "Best Books Ever" list from Goodreads.
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx media/goodreads-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
});
await spider.init();
const page = spider.page!;

await page.goto("https://www.goodreads.com/list/show/1.Best_Books_Ever");
await page.content(10000);
const data = await page.evaluate(`
  () => {
    const books = [];
    const rows = document.querySelectorAll('tr[data-book-id]');

    rows.forEach((row, index) => {
      const titleEl = row.querySelector('.BookTitle');
      const authorEl = row.querySelector('.AuthorName');
      const ratingEl = row.querySelector('.BookRating');
      const bookIdAttr = row.getAttribute('data-book-id');

      if (titleEl && authorEl) {
        books.push({
          position: index + 1,
          title: titleEl.textContent?.trim(),
          author: authorEl.textContent?.trim(),
          rating: ratingEl?.textContent?.trim(),
          bookId: bookIdAttr,
          url: titleEl.querySelector('a')?.getAttribute('href'),
        });
      }
    });

    return JSON.stringify(books);
  }
`);
console.log(JSON.parse(data));
await spider.close();
