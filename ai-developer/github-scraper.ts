/**
 * GitHub Trending Scraper
 *
 * Scrapes trending repositories from GitHub trending page.
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx ai-developer/github-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
});
await spider.init();
const page = spider.page!;

await page.goto("https://github.com/trending");
await page.content();
const data = await page.evaluate(`(() => {
  const repos = Array.from(document.querySelectorAll('article.Box-row')).map(el => ({
    name: el.querySelector('h2 a')?.textContent?.trim(),
    url: el.querySelector('h2 a')?.getAttribute('href'),
    description: el.querySelector('p')?.textContent?.trim(),
    language: el.querySelector('[itemprop="programmingLanguage"]')?.textContent?.trim(),
    stars: el.querySelector('[href*="stargazers"]')?.textContent?.trim(),
  }));
  return JSON.stringify({ repos });
})()`);
console.log(JSON.parse(data));
await spider.close();
