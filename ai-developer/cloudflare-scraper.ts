/**
 * Cloudflare Scraper
 *
 * Extract developer documentation, Workers examples, product specs, and network st
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx cloudflare-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
});

await spider.connect();
const page = spider.page!;
await page.goto("https://developers.cloudflare.com/workers/");
await page.content(8000);

const data = await page.evaluate(`(() => {
  const title = document.querySelector("h1")?.textContent?.trim();
  const sections = [];
  document.querySelectorAll("article h2").forEach(h => {
    const heading = h.textContent?.trim();
    const content = h.nextElementSibling?.textContent?.trim();
    if (heading) sections.push({ heading, content: content?.slice(0, 300) });
  });
  const codeBlocks = [...document.querySelectorAll("pre code")].map(c => c.textContent?.trim().slice(0, 200));
  return JSON.stringify({ title, sections: sections.slice(0, 10), codeBlocks: codeBlocks.slice(0, 5) });
})()`);

console.log(JSON.parse(data));
await spider.close();
