/**
 * Substack Scraper
 *
 * Extract newsletter posts, subscriber metrics, author bios, and publication direc
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx substack-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
});

await spider.init();
const page = spider.page!;
await page.goto("https://substack.com/browse/technology");

const data = await page.extractFields({
  postTitle: ".post-preview h3 a",
  author: ".post-preview .pub-name",
  subtitle: ".post-preview .post-preview-description",
  date: ".post-preview .post-date",
  likes: ".post-preview .like-count",
  comments: ".post-preview .comment-count",
});

console.log(data);
await spider.close();
