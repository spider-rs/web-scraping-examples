/**
 * SoundCloud Scraper
 *
 * Scrapes top trending tracks from SoundCloud's charts.
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx media/soundcloud-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
});
await spider.connect();
const page = spider.page!;

await page.goto("https://soundcloud.com/charts/top");
await page.content(10000);
const data = await page.evaluate(`
  () => {
    const tracks = [];
    const items = document.querySelectorAll('[data-testid="track"]');

    items.forEach((item, index) => {
      const titleEl = item.querySelector('[data-testid="track-title"]');
      const artistEl = item.querySelector('[data-testid="creator-link"]');
      const linkEl = item.querySelector('a[href*="/"]');
      const durationEl = item.querySelector('[data-testid="duration"]');

      if (titleEl && linkEl) {
        tracks.push({
          position: index + 1,
          title: titleEl.textContent?.trim(),
          artist: artistEl?.textContent?.trim(),
          url: linkEl.getAttribute('href'),
          duration: durationEl?.textContent?.trim(),
        });
      }
    });

    return JSON.stringify(tracks);
  }
`);
console.log(JSON.parse(data));
await spider.close();
