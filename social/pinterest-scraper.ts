/**
 * Pinterest Scraper
 *
 * Scrapes pins from search results on Pinterest.
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx social/pinterest-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
});
await spider.connect();
const page = spider.page!;

await page.goto("https://www.pinterest.com/search/pins/?q=web+design+inspiration");
await page.content(10000);
const data = await page.evaluate(`
  () => {
    const pins = [];
    const items = document.querySelectorAll('[data-test-id="pin"]');

    items.forEach((item, index) => {
      const linkEl = item.querySelector('a[href*="/pin/"]');
      const imgEl = item.querySelector('img');
      const titleEl = item.querySelector('[data-test-id="pin-title"]');

      if (linkEl && imgEl) {
        pins.push({
          position: index + 1,
          title: titleEl?.textContent?.trim() || imgEl.getAttribute('alt'),
          url: linkEl.getAttribute('href'),
          pinId: linkEl.getAttribute('href')?.split('/').pop(),
          image: imgEl.getAttribute('src'),
          alt: imgEl.getAttribute('alt'),
        });
      }
    });

    return JSON.stringify(pins);
  }
`);
console.log(JSON.parse(data));
await spider.close();
