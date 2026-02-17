/**
 * NPR Scraper
 *
 * Extract news articles, podcast transcripts, and audio story metadata from NPR ac
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx npr-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
});

await spider.connect();
const page = spider.page!;
await page.goto("https://www.npr.org/2024/01/12/ai-music-copyright");

const data = await page.extractFields({
  headline: "h1.storytitle, .story-text h1",
  author: ".byline__name a, .byline a",
  date: "time[datetime], .dateblock time",
  summary: ".storytext p:first-of-type",
  body: ".storytext, #storytext",
  audio: { selector: ".audio-module-listen a, .listen-button", attribute: "href" },
});

console.log(data);
await spider.close();
