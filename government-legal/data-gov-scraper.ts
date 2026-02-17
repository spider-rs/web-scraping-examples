/**
 * Data.gov Scraper
 *
 * Extract open government datasets, metadata, agency publishers, and download link
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx data-gov-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
});

await spider.connect();
const page = spider.page!;
await page.goto("https://catalog.data.gov/dataset?q=climate&sort=score+desc%2C+name+asc");
await page.content();

const data = await page.evaluate(`(() => {
  const datasets = [];
  document.querySelectorAll(".dataset-item").forEach(el => {
    const title = el.querySelector(".dataset-heading a")?.textContent?.trim();
    const org = el.querySelector(".dataset-organization")?.textContent?.trim();
    const description = el.querySelector(".dataset-notes")?.textContent?.trim();
    const formats = [];
    el.querySelectorAll(".dataset-resources .label").forEach(f => formats.push(f.textContent?.trim()));
    if (title) datasets.push({ title, org, description: description?.slice(0, 200), formats });
  });
  return JSON.stringify({ total: datasets.length, datasets: datasets.slice(0, 10) });
})()`);

console.log(JSON.parse(data));
await spider.close();
