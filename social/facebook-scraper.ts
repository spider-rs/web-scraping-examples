/**
 * Facebook Scraper
 *
 * Scrapes posts from a Facebook page.
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx social/facebook-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
});
await spider.init();
const page = spider.page!;

await page.goto("https://www.facebook.com/NASA/");
await page.content(10000);
const data = await page.evaluate(`
  () => {
    const posts = [];
    const articles = document.querySelectorAll('[role="article"]');

    articles.forEach((article, index) => {
      const textEl = article.querySelector('[data-ad-preview="message"]') ||
                     article.querySelector('div[lang]');
      const timeEl = article.querySelector('abbr[data-utime]');
      const likeEl = article.querySelector('[aria-label*="like"]');
      const commentEl = article.querySelector('[aria-label*="comment"]');
      const shareEl = article.querySelector('[aria-label*="share"]');
      const linkEl = article.querySelector('a[href*="/posts/"]') ||
                     article.querySelector('a[href*="/photos/"]');

      if (article) {
        posts.push({
          position: index + 1,
          text: textEl?.textContent?.trim()?.slice(0, 200),
          timestamp: timeEl?.getAttribute('data-utime'),
          likes: likeEl?.getAttribute('aria-label'),
          comments: commentEl?.getAttribute('aria-label'),
          shares: shareEl?.getAttribute('aria-label'),
          url: linkEl?.getAttribute('href'),
        });
      }
    });

    return JSON.stringify(posts);
  }
`);
console.log(JSON.parse(data));
await spider.close();
