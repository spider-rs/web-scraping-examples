/**
 * BeReal Scraper
 *
 * Extract public discovery posts, user profiles, and real-moment photo content fro
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx bereal-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
});

await spider.init();
const page = spider.page!;
await page.goto("https://bereal.com/en/discover");
await page.content(10000);

const data = await page.evaluate(`(() => {
  const posts = [];
  document.querySelectorAll("[data-testid='discovery-post']").forEach(el => {
    const username = el.querySelector("[data-testid='username']")?.textContent?.trim();
    const caption = el.querySelector("[data-testid='caption']")?.textContent?.trim();
    const location = el.querySelector("[data-testid='location']")?.textContent?.trim();
    const reactions = el.querySelector("[data-testid='reaction-count']")?.textContent?.trim();
    if (username) posts.push({ username, caption, location, reactions });
  });
  return JSON.stringify({ total: posts.length, posts: posts.slice(0, 10) });
})()`);

console.log(JSON.parse(data));
await spider.close();
