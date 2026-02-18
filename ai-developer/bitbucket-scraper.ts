/**
 * Bitbucket Scraper
 *
 * Extract public repository details, pull requests, branch info, and commit histor
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx bitbucket-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
});

await spider.init();
const page = spider.page!;
await page.goto("https://bitbucket.org/repo/all");
await page.content();

const data = await page.evaluate(`(() => {
  const repos = [];
  document.querySelectorAll("[class*='repo-summary']").forEach(el => {
    const name = el.querySelector("a[class*='repo-link']")?.textContent?.trim();
    const desc = el.querySelector("[class*='description']")?.textContent?.trim();
    const lang = el.querySelector("[class*='language']")?.textContent?.trim();
    const updated = el.querySelector("time")?.getAttribute("datetime");
    if (name) repos.push({ name, desc, lang, updated });
  });
  return JSON.stringify({ total: repos.length, repos: repos.slice(0, 15) });
})()`);

console.log(JSON.parse(data));
await spider.close();
