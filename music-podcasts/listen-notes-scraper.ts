/**
 * Listen Notes Scraper
 *
 * Extract podcast search results, episode transcripts, listen scores, and genre ra
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx listen-notes-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
});

await spider.init();
const page = spider.page!;
await page.goto("https://www.listennotes.com/best-podcasts/");
await page.content();

const data = await page.extractFields({
  title: ".podcast-title-wrapper a",
  publisher: ".podcast-publisher",
  score: ".ln-score",
  description: ".podcast-description",
  image: { selector: ".podcast-image img", attribute: "src" },
});

console.log(data);
await spider.close();
