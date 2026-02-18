/**
 * NIH Scraper
 *
 * Extract research publications, health topics, clinical guidelines, and funding d
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx nih-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
});

await spider.init();
const page = spider.page!;
await page.goto("https://www.nih.gov/health-information");

const data = await page.evaluate(`(() => {
  const topics = [];
  document.querySelectorAll(".health-topic-card, .teaser").forEach(el => {
    const title = el.querySelector("h2, h3, a")?.textContent?.trim();
    const summary = el.querySelector("p")?.textContent?.trim();
    const link = el.querySelector("a")?.href;
    if (title) topics.push({ title, summary, link });
  });
  return JSON.stringify({ total: topics.length, topics: topics.slice(0, 15) });
})()`);

console.log(JSON.parse(data));
await spider.close();
