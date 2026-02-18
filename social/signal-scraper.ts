/**
 * Signal Scraper
 *
 * Extract public documentation, blog posts, release notes, and community updates f
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx signal-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
});

await spider.init();
const page = spider.page!;
await page.goto("https://signal.org/blog/");
await page.content();

const data = await page.evaluate(`(() => {
  const posts = [];
  document.querySelectorAll(".blog-post-preview").forEach(el => {
    const title = el.querySelector("h3 a")?.textContent?.trim();
    const date = el.querySelector(".blog-date")?.textContent?.trim();
    const excerpt = el.querySelector(".blog-excerpt")?.textContent?.trim();
    const link = el.querySelector("h3 a")?.getAttribute("href");
    if (title) posts.push({ title, date, excerpt: excerpt?.slice(0, 200), link });
  });
  return JSON.stringify({ total: posts.length, posts: posts.slice(0, 10) });
})()`);

console.log(JSON.parse(data));
await spider.close();
