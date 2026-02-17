/**
 * Reddit Subreddit Scraper
 *
 * Extract posts from Reddit subreddits — title, score, comments,
 * author, and permalink. Handles authentication walls.
 *
 * Uses `evaluate()` to extract attributes from custom web components.
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx reddit-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
});
await spider.connect();
const page = spider.page!;

await page.goto("https://www.reddit.com/r/technology/");
await page.content(10000);

const data = await page.evaluate(`(() => {
  const posts = [];
  document.querySelectorAll("shreddit-post").forEach(el => {
    const title = el.getAttribute("post-title");
    const score = el.getAttribute("score");
    const comments = el.getAttribute("comment-count");
    const author = el.getAttribute("author");
    const permalink = el.getAttribute("permalink");
    if (title) posts.push({ title, score, comments, author, permalink });
  });
  return JSON.stringify({ total: posts.length, posts: posts.slice(0, 10) });
})()`);

console.log(JSON.parse(data as string));
await spider.close();
