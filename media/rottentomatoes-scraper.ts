/**
 * Rotten Tomatoes Scraper
 *
 * Scrapes popular movies currently available for streaming.
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx media/rottentomatoes-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
});
await spider.connect();
const page = spider.page!;

await page.goto("https://www.rottentomatoes.com/browse/movies_at_home/sort:popular");
await page.content(10000);
const data = await page.evaluate(`
  () => {
    const movies = [];
    const items = document.querySelectorAll('[data-testid="cell-container"]');

    items.forEach((item) => {
      const titleEl = item.querySelector('[data-testid="cell-title"]');
      const linkEl = item.querySelector('a[href*="/m/"]');
      const scoreEl = item.querySelector('[data-testid="tomatometer"]');
      const audienceEl = item.querySelector('[data-testid="audience-score"]');
      const yearEl = item.querySelector('[data-testid="cell-year"]');

      if (titleEl && linkEl) {
        movies.push({
          title: titleEl.textContent?.trim(),
          url: linkEl.getAttribute('href'),
          criticScore: scoreEl?.textContent?.trim(),
          audienceScore: audienceEl?.textContent?.trim(),
          year: yearEl?.textContent?.trim(),
        });
      }
    });

    return JSON.stringify(movies);
  }
`);
console.log(JSON.parse(data));
await spider.close();
