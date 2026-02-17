/**
 * IMDb Scraper
 *
 * Scrapes top 250 movies from IMDb's ranking chart.
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx media/imdb-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
});
await spider.connect();
const page = spider.page!;

await page.goto("https://imdb.com/chart/top/");
await page.content(10000);
const data = await page.evaluate(`
  () => {
    const movies = [];
    const items = document.querySelectorAll('.ipc-metadata-list-summary-item');

    items.forEach((item, index) => {
      const titleEl = item.querySelector('.ipc-title__text');
      const ratingEl = item.querySelector('[data-testid="ratingGroup--imdb-rating"]');
      const linkEl = item.querySelector('a[href*="/title/"]');
      const yearEl = item.querySelector('span[data-testid="year"]');

      if (titleEl && linkEl) {
        movies.push({
          rank: index + 1,
          title: titleEl.textContent?.trim(),
          rating: ratingEl?.textContent?.trim(),
          year: yearEl?.textContent?.trim(),
          url: linkEl.getAttribute('href'),
          id: linkEl.getAttribute('href')?.split('/')[2],
        });
      }
    });

    return JSON.stringify(movies);
  }
`);
console.log(JSON.parse(data));
await spider.close();
