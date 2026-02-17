/**
 * crates.io Scraper
 *
 * Extract Rust crate metadata, download counts, version info, and dependency graph
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx crates-io-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
});

await spider.connect();
const page = spider.page!;
await page.goto("https://crates.io/crates/serde");
await page.content(8000);

const data = await page.evaluate(`(() => {
  const name = document.querySelector("h1")?.textContent?.trim();
  const version = document.querySelector("[class*='version'] [class*='num']")?.textContent?.trim();
  const downloads = document.querySelector("[class*='downloads'] [class*='num']")?.textContent?.trim();
  const desc = document.querySelector("[class*='description']")?.textContent?.trim();
  const deps = [...document.querySelectorAll("[class*='dependency'] a")].map(a => a.textContent?.trim());
  return JSON.stringify({ name, version, downloads, desc, deps: deps.slice(0, 10) });
})()`);

console.log(JSON.parse(data));
await spider.close();
