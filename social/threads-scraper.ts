/**
 * Threads Scraper
 *
 * Scrapes posts from a Threads profile.
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx social/threads-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
});
await spider.connect();
const page = spider.page!;

await page.goto("https://www.threads.net/@zaborsky");
await page.content(10000);
const data = await page.evaluate(`
  () => {
    const posts = [];
    const articles = document.querySelectorAll('article');

    articles.forEach((article, index) => {
      const textEl = article.querySelector('[data-testid="post_text"]') ||
                     article.querySelector('div[dir="auto"]');
      const linkEl = article.querySelector('a[href*="/post/"]');
      const timeEl = article.querySelector('time');
      const likeEl = article.querySelector('[aria-label*="like"]');
      const replyEl = article.querySelector('[aria-label*="reply"]');
      const imgEl = article.querySelector('img[alt*="post"]');

      if (article && linkEl) {
        posts.push({
          position: index + 1,
          text: textEl?.textContent?.trim()?.slice(0, 300),
          url: linkEl.getAttribute('href'),
          postId: linkEl.getAttribute('href')?.split('/').pop(),
          timestamp: timeEl?.getAttribute('datetime'),
          likes: likeEl?.getAttribute('aria-label'),
          replies: replyEl?.getAttribute('aria-label'),
          image: imgEl?.getAttribute('src'),
        });
      }
    });

    return JSON.stringify(posts);
  }
`);
console.log(JSON.parse(data));
await spider.close();
