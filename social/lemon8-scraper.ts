/**
 * Lemon8 Scraper
 *
 * Extract lifestyle posts, product recommendations, and creator content from Lemon
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx lemon8-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
});

await spider.connect();
const page = spider.page!;
await page.goto("https://www.lemon8-app.com/explore");

const data = await page.extractFields({
  postTitle: "[data-testid='post-card'] h3",
  creator: "[data-testid='creator-name']",
  likes: "[data-testid='like-count']",
  category: "[data-testid='category-tag']",
  image: "[data-testid='post-card'] img[src]",
  description: "[data-testid='post-description']",
});

console.log(data);
await spider.close();
