/**
 * Daily Mail Scraper
 *
 * Extract tabloid news, celebrity stories, and photo galleries from the Daily Mail
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx dailymail-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
});

await spider.init();
const page = spider.page!;
await page.goto("https://www.dailymail.co.uk/news/article-12345/celebrity-story.html");

const data = await page.extractFields({
  headline: "h2#js-article-text, h1.article-text",
  author: ".author-section a, [itemprop='author'] a",
  date: "time[datetime], .article-timestamp",
  body: "[itemprop='articleBody'], .article-text",
  comments: ".article-reader-comments .comment-count",
  shares: ".share-count",
  image: { selector: ".mol-img img, [itemprop='image']", attribute: "src" },
});

console.log(data);
await spider.close();
