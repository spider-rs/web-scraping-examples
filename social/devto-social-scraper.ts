/**
 * Dev.to Social Scraper
 *
 * Extract developer articles, community discussions, tags, and engagement metrics 
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx devto-social-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
});

await spider.init();
const page = spider.page!;
await page.goto("https://dev.to/top/week");
await page.content();

const data = await page.evaluate(`(() => {
  const articles = [];
  document.querySelectorAll(".crayons-story").forEach(el => {
    const title = el.querySelector(".crayons-story__title a")?.textContent?.trim();
    const author = el.querySelector(".crayons-story__secondary a")?.textContent?.trim();
    const reactions = el.querySelector(".crayons-story__details .aggregate_reactions_counter")?.textContent?.trim();
    const comments = el.querySelector(".crayons-story__details .comments-count")?.textContent?.trim();
    const tags = [];
    el.querySelectorAll(".crayons-tag").forEach(tag => tags.push(tag.textContent?.trim()));
    if (title) articles.push({ title, author, reactions, comments, tags });
  });
  return JSON.stringify({ total: articles.length, articles: articles.slice(0, 10) });
})()`);

console.log(JSON.parse(data));
await spider.close();
