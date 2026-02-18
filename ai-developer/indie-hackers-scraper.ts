/**
 * Indie Hackers Scraper
 *
 * Extract founder interviews, revenue milestones, product launches, and community 
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx indie-hackers-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
});

await spider.init();
const page = spider.page!;
await page.goto("https://www.indiehackers.com/");
await page.content(10000);

const data = await page.evaluate(`(() => {
  const posts = [];
  document.querySelectorAll(".feed-item, [class*='post-card']").forEach(el => {
    const title = el.querySelector("a[class*='title'], h3")?.textContent?.trim();
    const author = el.querySelector("[class*='author']")?.textContent?.trim();
    const upvotes = el.querySelector("[class*='upvote'] span")?.textContent?.trim();
    const comments = el.querySelector("[class*='comment-count']")?.textContent?.trim();
    if (title) posts.push({ title, author, upvotes, comments });
  });
  return JSON.stringify({ total: posts.length, posts: posts.slice(0, 15) });
})()`);

console.log(JSON.parse(data));
await spider.close();
