/**
 * Twitch Scraper
 *
 * Scrapes top streaming channels from Twitch's "Just Chatting" category.
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx media/twitch-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
});
await spider.connect();
const page = spider.page!;

await page.goto("https://twitch.tv/directory/category/just-chatting");
await page.content(10000);
const data = await page.evaluate(`
  () => {
    const channels = [];
    const items = document.querySelectorAll('[data-target="preview-card-channel-link"]');

    items.forEach((item) => {
      const titleEl = item.querySelector('h3, [data-test-selector="preview-card-channel-title"]');
      const viewsEl = item.querySelector('[data-test-selector="preview-card-channel-viewers"]');
      const imgEl = item.querySelector('img');

      if (titleEl) {
        channels.push({
          title: titleEl.textContent?.trim(),
          url: item.getAttribute('href'),
          viewers: viewsEl?.textContent?.trim(),
          thumbnail: imgEl?.getAttribute('src'),
        });
      }
    });

    return JSON.stringify(channels);
  }
`);
console.log(JSON.parse(data));
await spider.close();
