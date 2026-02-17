/**
 * Hashnode Scraper
 *
 * Extract developer blog posts, series content, newsletter data, and community dis
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx hashnode-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
});

await spider.connect();
const page = spider.page!;
await page.goto("https://hashnode.com/explore");
await page.content(10000);

const data = await page.evaluate(`(() => {
  const posts = [];
  document.querySelectorAll("[class*='FeedPostCard']").forEach(el => {
    const title = el.querySelector("h1 a, h2 a, h3 a")?.textContent?.trim();
    const author = el.querySelector("[class*='author'] span")?.textContent?.trim();
    const likes = el.querySelector("[class*='like'] span")?.textContent?.trim();
    const readTime = el.querySelector("[class*='read-time']")?.textContent?.trim();
    const link = el.querySelector("h1 a, h2 a, h3 a")?.getAttribute("href");
    if (title) posts.push({ title, author, likes, readTime, link });
  });
  return JSON.stringify({ total: posts.length, posts: posts.slice(0, 15) });
})()`);

console.log(JSON.parse(data));
await spider.close();
