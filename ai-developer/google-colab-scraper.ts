/**
 * Google Colab Scraper
 *
 * Extract shared notebook content, code cells, execution outputs, and collaboratio
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx google-colab-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
});

await spider.init();
const page = spider.page!;
await page.goto("https://colab.research.google.com/notebooks/intro.ipynb");
await page.content(12000);

const data = await page.evaluate(`(() => {
  const title = document.querySelector("[class*='notebook-name'], .editable-title input")?.value
    || document.querySelector("title")?.textContent?.trim();
  const cells = [];
  document.querySelectorAll(".cell").forEach(el => {
    const type = el.classList.contains("code") ? "code" : "text";
    const content = el.querySelector(".editor, .text-cell-render")?.textContent?.trim();
    const output = el.querySelector(".output_area")?.textContent?.trim();
    if (content) cells.push({ type, content: content.slice(0, 300), output: output?.slice(0, 200) });
  });
  return JSON.stringify({ title, cells: cells.slice(0, 20) });
})()`);

console.log(JSON.parse(data));
await spider.close();
