/**
 * Semafor Scraper
 *
 * Extract structured news stories with transparent sourcing, global journalism, an
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx semafor-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
});

await spider.connect();
const page = spider.page!;
await page.goto("https://www.semafor.com/");
await page.content();

const data = await page.extractFields({
  headline: "h1, h2.story-title",
  author: ".byline a, .author-name",
  date: "time[datetime]",
  summary: ".story-dek, .article-summary",
  body: ".story-body, .article-content",
  signal: ".semafor-signal, .signal-section",
  image: { selector: "figure img, .hero-image img", attribute: "src" },
});

console.log(data);
await spider.close();
