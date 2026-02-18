/**
 * Chrome Web Store Scraper
 *
 * Extract extension details, user ratings, install counts, and permission requirem
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx chrome-web-store-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
});

await spider.init();
const page = spider.page!;
await page.goto("https://chromewebstore.google.com/category/extensions");
await page.content(10000);

const data = await page.evaluate(`(() => {
  const extensions = [];
  document.querySelectorAll("[class*='extension-card'], [class*='ItemTile']").forEach(el => {
    const name = el.querySelector("h2, [class*='name']")?.textContent?.trim();
    const rating = el.querySelector("[class*='rating']")?.textContent?.trim();
    const users = el.querySelector("[class*='users']")?.textContent?.trim();
    const desc = el.querySelector("p, [class*='description']")?.textContent?.trim();
    if (name) extensions.push({ name, rating, users, desc });
  });
  return JSON.stringify({ total: extensions.length, extensions: extensions.slice(0, 15) });
})()`);

console.log(JSON.parse(data));
await spider.close();
