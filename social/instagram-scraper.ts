/**
 * Instagram Scraper
 *
 * Scrapes posts from an Instagram profile.
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx social/instagram-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
});
await spider.connect();
const page = spider.page!;

await page.goto("https://www.instagram.com/nasa/");
await page.content(10000);
const data = await page.evaluate(`
  () => {
    const posts = [];
    const articles = document.querySelectorAll('article');

    articles.forEach((article, index) => {
      const linkEl = article.querySelector('a[href*="/p/"]');
      const imgEl = article.querySelector('img');
      const captionEl = article.querySelector('[data-caption="true"]');
      const likeEl = article.querySelector('[aria-label*="like"]');
      const commentEl = article.querySelector('[aria-label*="comment"]');

      if (linkEl && imgEl) {
        posts.push({
          position: index + 1,
          caption: captionEl?.textContent?.trim()?.slice(0, 200),
          url: linkEl.getAttribute('href'),
          postId: linkEl.getAttribute('href')?.split('/')[2],
          image: imgEl.getAttribute('src'),
          alt: imgEl.getAttribute('alt'),
          likes: likeEl?.getAttribute('aria-label'),
          comments: commentEl?.getAttribute('aria-label'),
        });
      }
    });

    return JSON.stringify(posts);
  }
`);
console.log(JSON.parse(data));
await spider.close();
