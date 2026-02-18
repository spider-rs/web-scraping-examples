/**
 * Quora Scraper
 *
 * Scrapes questions from a Quora topic page.
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx social/quora-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
});
await spider.init();
const page = spider.page!;

await page.goto("https://www.quora.com/topic/Web-Scraping");
await page.content(10000);
const data = await page.evaluate(`
  () => {
    const questions = [];
    const items = document.querySelectorAll('[data-test="question_link"]');

    items.forEach((item, index) => {
      const titleEl = item.querySelector('[data-test="question_title"]');
      const linkEl = item.closest('a') || item;
      const viewsEl = item.querySelector('[data-test="question_view_count"]');
      const followersEl = item.querySelector('[data-test="topic_follower_count"]');

      if (titleEl && linkEl) {
        questions.push({
          position: index + 1,
          title: titleEl.textContent?.trim(),
          url: linkEl.getAttribute('href'),
          views: viewsEl?.textContent?.trim(),
          followers: followersEl?.textContent?.trim(),
        });
      }
    });

    return JSON.stringify(questions);
  }
`);
console.log(JSON.parse(data));
await spider.close();
