/**
 * TikTok Scraper
 *
 * Scrapes trending content from TikTok's Explore page.
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx media/tiktok-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
});
await spider.init();
const page = spider.page!;

await page.goto("https://www.tiktok.com/explore");
await page.content(10000);
const data = await page.evaluate(`
  () => {
    const items = [];
    const elements = document.querySelectorAll('[data-e2e="explore-item"]');

    elements.forEach((elem, index) => {
      const titleEl = elem.querySelector('[data-e2e="explore-item-title"]');
      const descEl = elem.querySelector('[data-e2e="explore-item-desc"]');
      const countEl = elem.querySelector('[data-e2e="explore-item-count"]');
      const linkEl = elem.querySelector('a');

      if (linkEl) {
        items.push({
          position: index + 1,
          title: titleEl?.textContent?.trim(),
          description: descEl?.textContent?.trim(),
          count: countEl?.textContent?.trim(),
          url: linkEl.getAttribute('href'),
          hashtag: linkEl.getAttribute('href')?.split('/').pop(),
        });
      }
    });

    return JSON.stringify(items);
  }
`);
console.log(JSON.parse(data));
await spider.close();
