/**
 * Tumblr Scraper
 *
 * Extract blog posts, reblogs, tags, and multimedia content from Tumblr microblogg
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx tumblr-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
});

await spider.connect();
const page = spider.page!;
await page.goto("https://www.tumblr.com/tagged/photography");
await page.content(10000);

const data = await page.evaluate(`(() => {
  const posts = [];
  document.querySelectorAll("[data-cell-id]").forEach(el => {
    const author = el.querySelector(".post-info-tumblelog a")?.textContent?.trim();
    const text = el.querySelector(".post-body")?.textContent?.trim();
    const notes = el.querySelector(".note-count")?.textContent?.trim();
    if (author) posts.push({ author, text: text?.slice(0, 300), notes });
  });
  return JSON.stringify({ total: posts.length, posts: posts.slice(0, 10) });
})()`);

console.log(JSON.parse(data));
await spider.close();
