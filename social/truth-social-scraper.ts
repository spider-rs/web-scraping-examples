/**
 * Truth Social Scraper
 *
 * Extract public posts, user profiles, trending topics, and engagement data from T
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx truth-social-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
});

await spider.connect();
const page = spider.page!;
await page.goto("https://truthsocial.com/explore");
await page.content(10000);

const data = await page.evaluate(`(() => {
  const posts = [];
  document.querySelectorAll(".status__wrapper").forEach(el => {
    const author = el.querySelector(".display-name__account")?.textContent?.trim();
    const text = el.querySelector(".status__content")?.textContent?.trim();
    const time = el.querySelector("time")?.getAttribute("datetime");
    if (text) posts.push({ author, text: text.slice(0, 500), time });
  });
  return JSON.stringify({ total: posts.length, posts: posts.slice(0, 10) });
})()`);

console.log(JSON.parse(data));
await spider.close();
