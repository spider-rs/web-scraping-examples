/**
 * Twitter/X Scraper
 *
 * Scrapes tweets from an account's feed on Twitter/X.
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx social/twitter-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
});
await spider.connect();
const page = spider.page!;

await page.goto("https://x.com/OpenAI");
await page.content(10000);
const data = await page.evaluate(`
  () => {
    const tweets = [];
    const articles = document.querySelectorAll('article[data-testid="tweet"]');

    articles.forEach((article, index) => {
      const textEl = article.querySelector('[data-testid="tweetText"]');
      const timeEl = article.querySelector('time');
      const replyCountEl = article.querySelector('[data-testid="reply"]');
      const retweetCountEl = article.querySelector('[data-testid="retweet"]');
      const likeCountEl = article.querySelector('[data-testid="like"]');
      const linkEl = article.querySelector('a[href*="/status/"]');

      if (textEl && linkEl) {
        tweets.push({
          position: index + 1,
          text: textEl.textContent?.trim(),
          timestamp: timeEl?.getAttribute('datetime'),
          replies: replyCountEl?.getAttribute('data-testid-label'),
          retweets: retweetCountEl?.getAttribute('data-testid-label'),
          likes: likeCountEl?.getAttribute('data-testid-label'),
          url: linkEl.getAttribute('href'),
          tweetId: linkEl.getAttribute('href')?.split('/').pop(),
        });
      }
    });

    return JSON.stringify(tweets);
  }
`);
console.log(JSON.parse(data));
await spider.close();
