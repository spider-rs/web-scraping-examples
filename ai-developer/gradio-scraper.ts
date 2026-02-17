/**
 * Gradio Scraper
 *
 * Extract component documentation, demo galleries, API references, and tutorial co
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx gradio-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
});

await spider.connect();
const page = spider.page!;
await page.goto("https://www.gradio.app/docs/gradio/interface");
await page.content(8000);

const data = await page.evaluate(`(() => {
  const title = document.querySelector("h1")?.textContent?.trim();
  const params = [];
  document.querySelectorAll("[class*='param-row'], table tr").forEach(el => {
    const name = el.querySelector("td:first-child, [class*='param-name']")?.textContent?.trim();
    const type = el.querySelector("td:nth-child(2), [class*='param-type']")?.textContent?.trim();
    const desc = el.querySelector("td:nth-child(3), [class*='param-desc']")?.textContent?.trim();
    if (name) params.push({ name, type, desc });
  });
  const codeBlocks = [...document.querySelectorAll("pre code")].map(c => c.textContent?.trim().slice(0, 200));
  return JSON.stringify({ title, params: params.slice(0, 15), codeBlocks: codeBlocks.slice(0, 3) });
})()`);

console.log(JSON.parse(data));
await spider.close();
